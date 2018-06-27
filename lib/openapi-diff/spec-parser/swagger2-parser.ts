import * as SwaggerParser from 'swagger-parser';
import {OpenApiDiffErrorImpl} from '../../common/open-api-diff-error-impl';
import {ParsedPathItem, ParsedProperty, ParsedSpec} from '../spec-parser-types';
import {Swagger2, Swagger2Paths} from '../swagger2';
import {parseXPropertiesInObject} from './common/parse-x-properties';

const parseTopLevelArrayProperties = (arrayName: string,
                                      inputArray: string[]): Array<ParsedProperty<string>> => {
    const parsedSchemesArray: Array<ParsedProperty<string>> = [];

    if (inputArray.length) {
        inputArray.forEach((value, index) => {
            parsedSchemesArray.push({
                originalPath: [arrayName, index.toString()],
                value
            });
        });
    }

    return parsedSchemesArray;
};

const parsePaths = (paths: Swagger2Paths): ParsedPathItem[] =>
    Object.keys(paths).map((pathName) => ({
        originalValue: {
            originalPath: ['paths', pathName],
            value: paths[pathName]
        },
        pathName
    }));

const parseSwagger2Spec = (swagger2Spec: Swagger2): ParsedSpec => {
    return {
        basePath: {
            originalPath: ['basePath'],
            value: swagger2Spec.basePath
        },
        format: 'swagger2',
        paths: parsePaths(swagger2Spec.paths),
        schemes: {
            originalPath: ['schemes'],
            value: swagger2Spec.schemes ? parseTopLevelArrayProperties('schemes', swagger2Spec.schemes) : undefined
        },
        xProperties: parseXPropertiesInObject(swagger2Spec)
    };
};

const validateSwagger2 = async (document: object, location: string): Promise<Swagger2> => {
    try {
        return await SwaggerParser.validate(document as any);
    } catch (error) {
        throw new OpenApiDiffErrorImpl(
            'OPENAPI_DIFF_VALIDATE_SWAGGER_2_ERROR',
            `Validation errors in ${location}`,
            error
        );
    }
};

export const validateAndParseSwagger2Spec = async (swagger2Spec: object, location: string): Promise<ParsedSpec> => {
    const validatedSpec = await validateSwagger2(swagger2Spec, location);
    return parseSwagger2Spec(validatedSpec);
};
