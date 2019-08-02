import {OpenApi3ResponseHeader} from '../../../lib/openapi-diff/openapi3';
import {setPropertyIfDefined} from './builder-utils';

interface OpenApi3ResponseHeaderBuilderState {
    ref?: string;
    required?: boolean;
    schema?: object;
}

export class OpenApi3ResponseHeaderBuilder {
    public static defaultOpenApi3ResponseHeaderBuilder(): OpenApi3ResponseHeaderBuilder {
        return new OpenApi3ResponseHeaderBuilder({});
    }

    public constructor(private readonly state: OpenApi3ResponseHeaderBuilderState) {
    }

    public withRef(ref: string): OpenApi3ResponseHeaderBuilder {
        return new OpenApi3ResponseHeaderBuilder({...this.state, ref});
    }

    public withNoRequiredValue(): OpenApi3ResponseHeaderBuilder {
        return new OpenApi3ResponseHeaderBuilder({...this.state, required: undefined});
    }

    public withRequiredValue(required: boolean): OpenApi3ResponseHeaderBuilder {
        return new OpenApi3ResponseHeaderBuilder({...this.state, required});
    }

    public withEmptySchema(): OpenApi3ResponseHeaderBuilder {
        return new OpenApi3ResponseHeaderBuilder({...this.state, schema: {}});
    }

    public build(): OpenApi3ResponseHeader {
        const header: OpenApi3ResponseHeader = {};

        setPropertyIfDefined(header, '$ref', this.state.ref);
        setPropertyIfDefined(header, 'required', this.state.required);
        setPropertyIfDefined(header, 'schema', this.state.schema);

        return header;
    }
}

export const openApi3ResponseHeaderBuilder = OpenApi3ResponseHeaderBuilder.defaultOpenApi3ResponseHeaderBuilder();
