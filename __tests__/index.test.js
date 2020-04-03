import path from 'path';
import fs from 'fs';
import genDiff from '..';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let resultTree;
let resultPlain;
let resultJson;

beforeAll(() => {
  resultTree = readFile('resultTree').trim();
  resultPlain = readFile('resultPlain').trim();
  resultJson = readFile('resultJson').trim();
});

const fixturesNames = [['before.json', 'after.json'], ['before.yml', 'after.yml'], ['before.ini', 'after.ini']];

test.each(fixturesNames)('%s, %s', (first, second) => {
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
