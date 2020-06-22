import YAML from 'yaml';
import outdent from 'outdent';
import { ParsingException } from './errors';

/**
 *
 * @param yaml - the yaml to parse.
 */
export function parse(yaml: string): Parsed {
  const output = YAML.parse(yaml) as Raw;

  if (!output || typeof(output) !== 'object' || Array.isArray(output)) {
    throw new ParsingException({
      message: outdent`
        Expected "{{filename}}" match the following format.

        image: node:alpine
        steps:
          - npm i
      `,
      code: 'malformed_yaml',
    });
  }

  const { image, steps } = output;

  if (typeof(image) !== 'string') {
    throw new ParsingException({
      message: 'The "image" property must be a string.',
      code: 'invalid_property_type',
    });
  }

  if (!Array.isArray(steps)) {
    throw new ParsingException({
      message: 'The "steps" property must be a list.',
      code: 'invalid_property_type',
    });
  }

  if (steps.length === 0) {
    throw new ParsingException({
      message: `The "steps" property can't be empty.`,
      code: 'invalid_property_type',
    });
  }

  return {
    image,
    steps,
  };
}

export { ParsingException } from './errors';

export interface Raw {
  /**
   * The Docker image.
   */
  image?: string;

  /**
   * The steps to execute.
   */
  steps?: string[];
}

export interface Parsed {
  /**
   * The Docker image.
   */
  image: string;

  /**
   * The steps to execute.
   */
  steps: string[];
}
