import * as fs from 'fs';
import path from 'path';
import flatten from 'tily/array/flatten';
import {Entry, Fixture, Prepare} from './types';
import {tryImport} from './utils';

export class Providers {
  protected providers: Record<string, Prepare>;

  load() {
    const files = fs.readdirSync(path.resolve(__dirname, 'providers'));
    this.providers = files
      .filter(file => file.endsWith('.js'))
      .reduce((result, file) => {
        const name = file.split('.').slice(0, -1).join('.');
        result[name] = require(`./providers/${file}`) as Prepare;
        return result;
      }, {} as Record<string, Prepare>);
    return this;
  }

  async prepare(fixture: Fixture): Promise<Entry[]> {
    return flatten(
      await Promise.all(
        Object.keys(this.providers).map(async name => {
          const definition = await tryImport(`./fixtures/${fixture.name}.${name}`);
          return this.providers[name](fixture, definition);
        }),
      ),
    );
  }

  async loadAndPrepare(fixture: Fixture) {
    return this.load().prepare(fixture);
  }
}
