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

  if (!output || typeof output !== 'object' || Array.isArray(output) || typeof output.image !== 'string' || !Array.isArray(output.steps) || output.steps.length === 0) {
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

  return {
    image: output.image,
    steps: output.steps
  };
}

exports.parse = parse;
//# sourceMappingURL=parser.js.map
