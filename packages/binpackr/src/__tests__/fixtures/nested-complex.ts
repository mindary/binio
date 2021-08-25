import {BTDDataType} from '../../types';

export const schema = {
  asdf: ['string', 'varuint', {nesty: {deep: 'varuint'}}],
} as const;

export const items: BTDDataType<typeof schema>[] = [
  {
    asdf: ['hello', 5000, {nesty: {deep: 55}}, {nesty: {deep: 4}}],
  },
];
