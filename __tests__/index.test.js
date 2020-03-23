import path from 'path';
import fs from 'fs';
import genDiff from '..';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let result;
let resultPlain;

beforeEach(() => {
  result = readFile('result').trim();
  resultPlain = readFile('resultPlain').trim();
});

test('json gendiff', () => {
  const before = getFixturePath('before.json');
  const after = getFixturePath('after.json');

  expect(genDiff(before, after)).toEqual(result);
  expect(genDiff(before, after, 'plain')).toEqual(resultPlain);
});

test('yml gendiff', () => {
  const before = getFixturePath('before.yml');
  const after = getFixturePath('after.yml');

  expect(genDiff(before, after)).toEqual(result);
  expect(genDiff(before, after, 'plain')).toEqual(resultPlain);
});

test('ini gendiff', () => {
  const before = getFixturePath('before.ini');
  const after = getFixturePath('after.ini');

  expect(genDiff(before, after)).toEqual(result);
  expect(genDiff(before, after, 'plain')).toEqual(resultPlain);
});

test('errors', () => {
  expect(() => genDiff('', '')).toThrow();
  expect(() => genDiff(getFixturePath('before.ini'), '')).toThrow();
  expect(() => genDiff('nonexistentFile', '')).toThrow();
});
