import {OpenApi3, OpenApi3PathItem, OpenApi3Paths} from '../../openapi3';
import {ParsedPathItem, ParsedPathItems} from '../../spec-parser-types';
import {PathBuilder} from '../common/path-builder';
import {parseOpenApi3Operations} from './parse-openapi3-operations';

const parsePath = (path: OpenApi3PathItem, pathBuilder: PathBuilder, spec: OpenApi3): ParsedPathItem => {
    return {
        operations: parseOpenApi3Operations(path, pathBuilder, spec),
        originalValue: {
            originalPath: pathBuilder.build(),
            value: path
        }
    };
};

export const parseOpenApi3Paths = (paths: OpenApi3Paths, pathBuilder: PathBuilder, spec: OpenApi3): ParsedPathItems =>
    Object.keys(paths).reduce<ParsedPathItems>((accumulator, pathName) => {
        const pathItemObject = paths[pathName];
        const originalPath = pathBuilder.withChild(pathName);

        accumulator[pathName] = parsePath(pathItemObject, originalPath, spec);

        return accumulator;
    }, {});
