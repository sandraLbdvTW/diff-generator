import path from 'path';
import fs from 'fs';
import genDiff from '..';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const resultTree = readFile('resultTree').trim();
const resultPlain = readFile('resultPlain').trim();
const resultJson = readFile('resultJson').trim();

const files = [['before.json', 'after.json'], ['before.yml', 'after.yml'], ['before.ini', 'after.ini']];

test.each(files)('%s, %s', (first, second) => {
  const firstFilePath = getFixturePath(first);
  const secondFilePath = getFixturePath(second);

  expect(genDiff(firstFilePath, secondFilePath)).toEqual(resultTree);
  expect(genDiff(firstFilePath, secondFilePath, 'plain')).toEqual(resultPlain);
  expect(genDiff(firstFilePath, secondFilePath, 'json')).toEqual(resultJson);
});

test('errors', () => {
  expect(() => genDiff('', '')).toThrow();
  expect(() => genDiff(getFixturePath('before.ini'), '')).toThrow();
  expect(() => genDiff(getFixturePath('before.ini'))).toThrow();
  expect(() => genDiff('nonexistentFile', '')).toThrow();
});
