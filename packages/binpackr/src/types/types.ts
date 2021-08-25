import {Buffer} from 'buffer';

export interface Codec {
  encode(json: any): Buffer;
  decode(buffer: Buffer | Uint8Array | ReadonlyArray<number>): any;
}
