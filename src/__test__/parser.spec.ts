import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

import { expect } from 'chai';

import { parse } from '../parser';
import { ParsingException } from '../errors';

describe('Parser', () => {
  describe('func(parse)', () => {
    it('should parse the yaml successfully', () => {
      const expectedOutput = {
        image: 'node:alpine',
        steps: [
          'npm ci',
        ],
      };

      const yaml = YAML.stringify(expectedOutput);

      expect(parse(yaml)).deep.equals(expectedOutput)
    });

    it('should ignore unknown properties', () => {
      const expectedOutput = {
        image: 'node:alpine',
        steps: [
          'npm ci',
        ],
      };

      const yaml = YAML.stringify({
        ...expectedOutput,
        hello: 'world',
      });

      expect(parse(yaml)).deep.equals(expectedOutput)
    });

    it('should parse the yaml file successfully', () => {
      expect(parse(fs.readFileSync(path.join(__dirname, './examples/.salte-ci.yml'), 'UTF8'))).deep.equals({
        image: 'node:alpine',
        steps: [
          'npm ci',
        ],
      })
    });

    it('should throw an error if the input is missing', () => {
      expect(() => parse('')).to.throw(ParsingException);
    });

    it('should throw an error if we pass a list', () => {
      expect(() => parse(YAML.stringify([]))).to.throw(ParsingException);
    });

    it('should throw an error if the image is missing', () => {
      const yaml = YAML.stringify({
        steps: [
          'npm ci',
        ],
      });

      expect(() => parse(yaml)).to.throw(ParsingException);
    });

    it('should throw an error if the steps are missing', () => {
      const yaml = YAML.stringify({
        image: 'node:alpine',
      });

      expect(() => parse(yaml)).to.throw(ParsingException);
    });

    it('should throw an error if the steps are empty', () => {
      const yaml = YAML.stringify({
        image: 'node:alpine',
        steps: [],
      });

      expect(() => parse(yaml)).to.throw(ParsingException);
    });
  });
});
