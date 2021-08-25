import {BTDDataType} from '../../types';

export const schema = 'buffer';

export const items: BTDDataType<typeof schema>[] = [Buffer.from([0x05])];
