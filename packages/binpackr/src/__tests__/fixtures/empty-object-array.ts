import {BTDDataType} from '../../types';

export const schema = [
  {
    username: 'string',
    points: 'varuint',
  },
] as const;

export const items: BTDDataType<typeof schema>[] = [[]];
