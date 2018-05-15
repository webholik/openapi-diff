import {OpenApiDiff} from './openapi-diff';
import {FileSystem} from './openapi-diff/resource-loader/file-system';
import {HttpClient} from './openapi-diff/resource-loader/http-client';
import {SpecLoader} from './openapi-diff/spec-loader';
import {OpenApiDiffInternal} from './openapi-diff/types';

export class CliFactory {
    public static createOpenApiDiff(): OpenApiDiffInternal {
        const httpClient = new HttpClient();
        const fileSystem = new FileSystem();
        const specLoader = new SpecLoader(httpClient, fileSystem);
        return new OpenApiDiff(specLoader);
    }
}
