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
