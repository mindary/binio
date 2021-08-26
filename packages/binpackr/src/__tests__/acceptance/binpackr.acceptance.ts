import {expect} from '@loopback/testlab';
import {build} from '../../binpackr';
import {BTDSchema} from '../../types';

const fixtures = [
  loadFixture('buffer'),
  loadFixture('complex-array'),
  loadFixture('empty-object-array'),
  loadFixture('large-object'),
  loadFixture('nested-complex'),
  loadFixture('nested-complex-2'),
  loadFixture('nested-complex-3'),
  loadFixture('nested-repeat'),
  loadFixture('person-array'),
  loadFixture('player'),
  loadFixture('player-array'),
  loadFixture('single-buffer'),
  loadFixture('single-cons'),
  loadFixture('single-var'),
];

function loadFixture(name: string): {name: string; schema: BTDSchema; items: any[]} {
  return {name, ...require(`../fixtures/${name}`)};
}

describe('Binpack Acceptance Test', function () {
  for (const fixture of fixtures) {
    it(`test ${fixture.name}`, function () {
      const {schema, items} = fixture;
      const built = build(schema);

      items.forEach(item => {
        const processed = built.decode(built.encode(item));
        expect(processed).eql(item);
      });
    });
  }
});
