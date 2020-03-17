import path from 'path';
import fs from 'fs';
import genDiff from '..';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('json gendiff', () => {
  const expectedDiff = readFile('jsonDiff');
  const before = getFixturePath('before.json');
  const after = getFixturePath('after.json');

  expect(genDiff(before, after)).toEqual(expectedDiff);
  expect(() => genDiff('', '')).toThrow();
  expect(() => genDiff('nonexistentFile', '')).toThrow();
  expect(() => genDiff(before)).toThrow();
});
