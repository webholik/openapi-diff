import * as _ from 'lodash';
import {ValidationOutcome} from '../api-types';
import {toDiffEntry} from './common/validation-result-to-diff-entry';
import {DiffEntry, ResultObject} from './types';

const buildChangeSentence = (targetChange: DiffEntry): string => {
    const changeDescription: any = {
        'add': ((change: DiffEntry): string => {
            return `${_.capitalize(change.severity)}: the path [${change.printablePath.join('/')}] `
                   + `was added with value \'${change.destinationValue}\'`;
        }),
        'arrayContent.add': ((change: DiffEntry): string => {
            return `${_.capitalize(change.severity)}: the value \'${change.destinationValue}\' was added to the`
                    + ` array in the path [${change.printablePath.join('/')}]`;
        }),
        'arrayContent.delete': ((change: DiffEntry): string => {
            return `${_.capitalize(change.severity)}: the value \'${change.sourceValue}\' was removed from the`
                   + ` array in the path [${change.printablePath.join('/')}]`;
        }),
        'delete': ((change: DiffEntry): string => {
            return `${_.capitalize(change.severity)}: the path [${change.printablePath.join('/')}] `
                   + `with value \'${change.sourceValue}\' was removed`;
        }),
        'edit': ((change: DiffEntry): string => {
            return `${_.capitalize(change.severity)}: the path [${change.printablePath.join('/')}] `
            + `was modified from \'${change.sourceValue}\' to \'${change.destinationValue}\'`;
        })
    };

    return changeDescription[targetChange.type](targetChange);
};

export const resultReporter = {
    build: (validationOutcome: ValidationOutcome): ResultObject => {
        const changeList: string[] = [];
        const summary: string[] = [];

        summary.push(`${validationOutcome.errors.length} breaking changes found.`);
        summary.push(`${validationOutcome.info.length} non-breaking changes found.`);
        summary.push(`${validationOutcome.warnings.length} unclassified changes found.`);

        const allOutcomes = validationOutcome.errors.concat(validationOutcome.warnings).concat(validationOutcome.info);

        for (const outcome of allOutcomes) {
            changeList.push(buildChangeSentence(toDiffEntry(outcome)));
        }

        return {
            changeList: _.sortBy(changeList),
            hasBreakingChanges: validationOutcome.errors.length > 0,
            summary
        };
    }
};
