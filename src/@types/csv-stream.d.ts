declare module "csv-stream" {
  export interface ParserOptions {
    delimiter?: string;
    endLine?: string;
    enclosedChar?: string;
    escapeChar?: string;
    columnOffset?: string;
    columns?: string[];
  }

  const Parser: {
    createStream(options?: ParserOptions): NodeJS.WritableStream;
  };

  export default Parser;
}
