import YAML from 'yaml';
import outdent from 'outdent';
import { Raw, Parsed } from './types';
import { ParsingException } from './errors';


/**
 *
 * @param yaml - the yaml to parse.
 */
export function parse(yaml: string): Parsed {
  const output = YAML.parse(yaml) as Raw;

  if (!output || typeof(output) !== 'object' || Array.isArray(output) || typeof(output.image) !== 'string' || !Array.isArray(output.steps) || output.steps.length === 0) {
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

  return {
    image: output.image,
    steps: output.steps,
  };
}
