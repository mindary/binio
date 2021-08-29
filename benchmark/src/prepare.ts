import ora from 'ora';
import {expect} from '@loopback/testlab';
import {Entry} from './types';

export async function prepare(fixture: {name: string; data: any}, entries: Entry[]) {
  const answer: Entry[] = [];
  for (const entry of entries) {
    const spinner = ora();
    spinner.start(`[Checking] ${entry.name}`);

    if (entry.skip) {
      spinner.warn(`Skip ${entry.name}. ${entry.skip}`);
      continue;
    }


    const encoded = entry.encoded ?? entry.encode?.(fixture.data);
    if (!encoded) {
      spinner.warn(`Skip ${entry.name}. encoded data is required`);
      continue;
    }

    entry.encoded = encoded;
    if (entry.decode) {
      const decoded = entry.decode?.(encoded);
      const real = JSON.parse(JSON.stringify(decoded));
      expect(real).containDeep(fixture.data);
    }
    spinner.succeed(`[Passed] ${entry.name}`)
    answer.push(entry);
    await new Promise(setImmediate);
  }
  return answer;
}
