import {BTDDataType} from '../../types';

export const schema = {
  the: [{nuts: 'string', qwer: 'varuint', bork: 'int16'}],
} as const;

export const items: BTDDataType<typeof schema>[] = [
  {
    the: [
      {nuts: 'xcvxcvxcvxcvxc', qwer: 15, bork: 55},
      {nuts: 'cvxcvxcv', qwer: 23, bork: 355},
      {nuts: 'asdf', qwer: 423, bork: 523},
    ],
  },
];
