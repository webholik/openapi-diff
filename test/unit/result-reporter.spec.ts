import {OpenApiDiffErrorImpl} from '../../lib/common/open-api-diff-error-impl';
import {ResultReporter} from '../../lib/openapi-diff/result-reporter';
import {diffOutcomeFailureBuilder} from '../support/builders/diff-outcome-failure-builder';
import {diffOutcomeSuccessBuilder} from '../support/builders/diff-outcome-success-builder';
import {
    breakingDiffResultBuilder,
    nonBreakingDiffResultBuilder,
    unclassifiedDiffResultBuilder
} from '../support/builders/diff-result-builder';
import {createMockConsoleLogger, MockConsoleLogger} from './support/mocks/mock-console-logger';

describe('openapi-diff/result-reporter', () => {
    let reporter: ResultReporter;
    let mockWrappedConsole: MockConsoleLogger;

    beforeEach(() => {
        mockWrappedConsole = createMockConsoleLogger();
        reporter = new ResultReporter(mockWrappedConsole);
    });

    it('should report a success message when only non-breaking changes are found', async () => {
        const outcome = diffOutcomeSuccessBuilder
            .withUnclassifiedDifferences([])
            .withNonBreakingDifferences([nonBreakingDiffResultBuilder.withEntity('path')])
            .build();

        reporter.reportOutcome(outcome);

        expect(mockWrappedConsole.info).toHaveBeenCalledWith(
            jasmine.stringMatching('Non breaking changes found between the two specifications')
        );
        expect(mockWrappedConsole.info).toHaveBeenCalledWith(jasmine.stringMatching('path'));
    });

    it('should report a success message when only unclassified changes are found', async () => {
        const outcome = diffOutcomeSuccessBuilder
            .withUnclassifiedDifferences([unclassifiedDiffResultBuilder.withEntity('path')])
            .withNonBreakingDifferences([])
            .build();

        reporter.reportOutcome(outcome);

        expect(mockWrappedConsole.info).toHaveBeenCalledWith(
            jasmine.stringMatching('Non breaking changes found between the two specifications')
        );
        expect(mockWrappedConsole.info).toHaveBeenCalledWith(jasmine.stringMatching('path'));
    });

    it('should report a success message when diff is successful with no differences', async () => {
        const outcome = diffOutcomeSuccessBuilder
            .withUnclassifiedDifferences([])
            .withNonBreakingDifferences([])
            .build();
        reporter.reportOutcome(outcome);

        expect(mockWrappedConsole.info).toHaveBeenCalledWith('No changes found between the two specifications');
    });

    it('should report errors', async () => {
        reporter.reportError(new OpenApiDiffErrorImpl('OPENAPI_DIFF_READ_ERROR', 'file system error'));

        expect(mockWrappedConsole.error).toHaveBeenCalledWith(
            new OpenApiDiffErrorImpl('OPENAPI_DIFF_READ_ERROR', 'file system error')
        );
    });

    it('should report a failure when breaking differences were found', async () => {
        const outcome = diffOutcomeFailureBuilder
            .withBreakingDifferences([breakingDiffResultBuilder.withEntity('path')])
            .build();

        reporter.reportOutcome(outcome);

        expect(mockWrappedConsole.info).toHaveBeenCalledWith(
            jasmine.stringMatching('Breaking changes found between the two specifications')
        );
        expect(mockWrappedConsole.info).toHaveBeenCalledWith(jasmine.stringMatching('path'));
    });
});
