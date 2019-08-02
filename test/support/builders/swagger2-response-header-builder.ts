import {Swagger2ParameterType, Swagger2ResponseHeader} from '../../../lib/openapi-diff/swagger2';

interface Swagger2ResponseHeaderBuilderState {
    type: Swagger2ParameterType;
}

export class Swagger2ResponseHeaderBuilder {
    public static defaultSwagger2ResponseHeaderBuilder(): Swagger2ResponseHeaderBuilder {
        return new Swagger2ResponseHeaderBuilder({
            type: 'string'
        });
    }

    public constructor(private readonly state: Swagger2ResponseHeaderBuilderState) {
    }

    public build(): Swagger2ResponseHeader {
        return {
            type: this.state.type
        };
    }
}

export const swagger2ResponseHeaderBuilder = Swagger2ResponseHeaderBuilder.defaultSwagger2ResponseHeaderBuilder();
