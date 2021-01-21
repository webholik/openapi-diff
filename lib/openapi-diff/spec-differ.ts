import {DiffSpecsOptions, SerialisedSpec} from '../openapi-diff';
import {DiffFinder, ParsedSpecs} from './spec-differ/diff-finder';
import {Difference} from './spec-differ/diff-finder/difference';
import {SpecDeserialiser} from './spec-differ/spec-deserialiser';
import {SpecParser} from './spec-parser';
import {ParsedSpec} from './spec-parser-types';

export class SpecDiffer {
    public static async diffSpecs(options: DiffSpecsOptions): Promise<Difference[]> {
        const parsedSpecs = await this.toParsedSpecs(options);
        const differences = await DiffFinder.findDifferences(parsedSpecs);
        return differences;
    }

    private static async toParsedSpecs(options: DiffSpecsOptions): Promise<ParsedSpecs> {
        const [sourceSpec, destinationSpec] = await Promise.all([
            this.toParsedSpec(options.sourceSpec),
            this.toParsedSpec(options.destinationSpec)
        ]);
        return {sourceSpec, destinationSpec};
    }

    private static toParsedSpec(serialisedSpec: SerialisedSpec): Promise<ParsedSpec> {
        const deserialisedContent = SpecDeserialiser.load(serialisedSpec);
        return SpecParser.parse({
            content: deserialisedContent,
            location: serialisedSpec.location,
            unverifiedFormat: serialisedSpec.format
        });
    }
}
