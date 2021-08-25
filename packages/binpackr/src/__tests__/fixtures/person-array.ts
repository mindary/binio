import {BTDDataType} from '../../types';

export const schema = [{name: 'string', numbers: ['varint'], age: 'uint8'}] as const;

export const items: BTDDataType<typeof schema>[] = [
  [
    {name: 'joe', numbers: [-3, 2, 5], age: 42},
    {name: 'john smith iv', numbers: [], age: 27},
    {name: 'bobby', numbers: [-22, 1], age: 6},
  ],
];
