export interface Definition {
  schema?: any;
  // Main object name for protobuf
  root?: string;
  encoded?: Buffer;
}

export interface Fixture {
  name: string;
  data: any;
}

export interface Entry {
  name: string;
  skip?: string | boolean;
  encoded?: Buffer;

  encode?(json: any): Buffer;

  decode?(data: Buffer): any;
}

export type Prepare = (fixture: Fixture, definition?: Definition) => Promise<Entry | Entry[]>;

export const noop = (...args: any[]): any => {};

export function skip(name: string, reason?: string): Entry {
  return {
    name,
    skip: reason ?? 'Module not found or missing schema definition',
  };
}
