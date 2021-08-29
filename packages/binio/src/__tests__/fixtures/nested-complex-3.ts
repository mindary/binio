import {BTDDataType} from '../../types';

export const schema = [{nesty: {deep: ['string', ['int8'], 'varuint']}}] as const;

export const items: BTDDataType<typeof schema>[] = [
  [{nesty: {deep: ['asdf', [1, 2, 3], 33]}}, {nesty: {deep: ['qwer', [22, 1], 4]}}],
];
