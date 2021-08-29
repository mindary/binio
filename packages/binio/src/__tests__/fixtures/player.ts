import {BTDDataType} from '../../types';

export const schema = {
  health: 'varuint',
  jumping: 'boolean',
  position: ['int16'],
  attributes: {str: 'uint8', agi: 'uint8', int: 'uint8'},
} as const;

export const items: BTDDataType<typeof schema>[] = [
  {
    health: 4000,
    jumping: false,
    position: [-540, 343, 1201],
    attributes: {str: 87, agi: 42, int: 22},
  },
];
