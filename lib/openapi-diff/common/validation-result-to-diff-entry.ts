import _ = require('lodash');
import {ValidationResult, ValidationResultAction, ValidationResultEntity, ValidationResultType} from '../../api-types';
import {DiffEntry, DiffEntrySeverity, DiffEntryTaxonomy, DiffEntryType} from '../types';

export const toDiffEntry = (validationResult: ValidationResult): DiffEntry => {
    const scope = entityToScope(validationResult.entity);
    const type = actionToTypeMap[validationResult.action];
    return {
        destinationValue: validationResult.destinationSpecEntityDetails.value,
        printablePath: getPrintablePath(
            validationResult.sourceSpecEntityDetails.location,
            validationResult.destinationSpecEntityDetails.location),
        scope,
        severity: typeToSeverityMap[validationResult.type],
        sourceValue: validationResult.sourceSpecEntityDetails.value,
        taxonomy: `${scope}.${type}` as DiffEntryTaxonomy,
        type
    };
};

const getPrintablePath = (sourceLocation: string, destinationLocation: string): string [] => {
    const isNotEmpty = (value: any) => !_.isEmpty(value);
    const printableSourcePath = sourceLocation.split('.').filter(isNotEmpty);
    const printableDestinationPath = destinationLocation.split('.').filter(isNotEmpty);
    return printableSourcePath.length >= printableDestinationPath.length
        ? printableSourcePath
        : printableDestinationPath;
};

const actionToTypeMap: {[action in ValidationResultAction]: DiffEntryType} = {
    'add': 'add',
    'delete': 'delete',
    'edit': 'edit',
    'item.add': 'arrayContent.add',
    'item.delete': 'arrayContent.delete'
};

const typeToSeverityMap: {[type in ValidationResultType]: DiffEntrySeverity} = {
    error: 'breaking',
    info: 'non-breaking',
    warning: 'unclassified'
};

const entityToScope = (entity: ValidationResultEntity): string =>
    entity.replace(/^(oad\.)/, '');
