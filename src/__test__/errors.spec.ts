import { expect } from 'chai';

import { ParsingException, GLOBALS } from '../errors';
import { Chance } from 'chance';

const chance = new Chance();

describe('Error(ParsingException)', () => {
  it('should format the message', () => {
    const message = `${chance.word()} {{filename}} ${chance.word()}`;

    const error = new ParsingException({ message, code: 'malformed_yaml' });

    expect(error.message).equals(message.replace('{{filename}}', GLOBALS.FILENAME));
  });

  it('should ignore unknown bindings', () => {
    const message = `${chance.word()} {{${chance.word()}}} ${chance.word()}`;

    const error = new ParsingException({ message, code: 'malformed_yaml' });

    expect(error.message).equals(message);
  });

  it('should store the code', () => {
    const error = new ParsingException({ message: chance.word(), code: 'malformed_yaml' });

    expect(error.code).equals('malformed_yaml');
  });
});
