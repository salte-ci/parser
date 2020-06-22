function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var YAML = _interopDefault(require('yaml'));
var outdent = _interopDefault(require('outdent'));

const GLOBALS = {
  FILENAME: '.salte-ci.yml'
};
class ParsingException extends Error {
  constructor({
    message,
    code
  }) {
    super(message.replace(/{{(\w+)}}/g, (match, name) => {
      return GLOBALS[name.toUpperCase()] || match;
    }));
    this.code = code;
  }

}

/**
 *
 * @param yaml - the yaml to parse.
 */

function parse(yaml) {
  const output = YAML.parse(yaml);

  if (!output || typeof output !== 'object' || Array.isArray(output)) {
    throw new ParsingException({
      message: outdent`
        Expected "{{filename}}" match the following format.

        image: node:alpine
        steps:
          - npm i
      `,
      code: 'malformed_yaml'
    });
  }

  const {
    image,
    steps
  } = output;

  if (typeof image !== 'string') {
    throw new ParsingException({
      message: 'The "image" property must be a string.',
      code: 'invalid_property_type'
    });
  }

  if (!Array.isArray(steps)) {
    throw new ParsingException({
      message: 'The "steps" property must be a list.',
      code: 'invalid_property_type'
    });
  }

  if (steps.length === 0) {
    throw new ParsingException({
      message: `The "steps" property can't be empty.`,
      code: 'invalid_property_type'
    });
  }

  return {
    image,
    steps
  };
}

exports.ParsingException = ParsingException;
exports.parse = parse;
//# sourceMappingURL=parser.js.map
