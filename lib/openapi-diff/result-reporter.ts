
import {ConsoleLogger} from './result-reporter/console-logger';

export class ResultReporter {



    public constructor(private readonly consoleLogger: ConsoleLogger) {}

    public reportError(error: Error): void {
        this.consoleLogger.error(error);
    }

    public reportOutcome(outcome: any): void {
        console.log(JSON.stringify(outcome, null, 2));
    }
}
