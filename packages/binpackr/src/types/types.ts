import {Buffer} from 'buffer';

export interface Codec<T = any> {
  encode(json: T): Buffer;
  decode(buffer: Buffer | Uint8Array | ReadonlyArray<number>): T;
}
