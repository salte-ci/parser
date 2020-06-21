export declare const GLOBALS: {
    [key: string]: string;
};
export declare class ParsingException extends Error {
    code: ParsingException.Codes;
    constructor({ message, code }: ParsingException.Options);
}
export declare namespace ParsingException {
    type Codes = ('malformed_yaml');
    type Options = {
        message: string;
        code: Codes;
    };
}
