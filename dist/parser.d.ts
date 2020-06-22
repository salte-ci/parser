/**
 *
 * @param yaml - the yaml to parse.
 */
export declare function parse(yaml: string): Parsed;
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
