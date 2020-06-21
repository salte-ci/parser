export const GLOBALS: {
  [key: string]: string;
} = {
  FILENAME: '.salte-ci.yml',
};

export class ParsingException extends Error {
  public code: ParsingException.Codes;

  constructor({ message, code }: ParsingException.Options) {
    super(message.replace(/{{(\w+)}}/g, (match: string, name: string) => {
      return GLOBALS[name.toUpperCase()] || match;
    }));

    this.code = code;
  }
}

export declare namespace ParsingException {
  type Codes = ('malformed_yaml');
  type Options = {
    message: string;
    code: Codes;
  };
}
