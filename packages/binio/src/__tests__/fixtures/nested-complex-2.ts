import {BTDDataType} from '../../types';

export const schema = {
  asdf: [{nested: {further: ['string', ['int8'], 'varuint']}}],
} as const;

export const items: BTDDataType<typeof schema>[] = [
  {
    asdf: [{nested: {further: ['asdf', [1, 2, 3], 33]}}, {nested: {further: ['zxcv', [22, 1], 4]}}],
  },
];
