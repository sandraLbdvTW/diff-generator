import path from 'path';
import fs from 'fs';
import genDiff from '..';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let expectedDiff;

beforeEach(() => {
  expectedDiff = readFile('result');
});

test('json gendiff', () => {
  const before = getFixturePath('before.json');
  const after = getFixturePath('after.json');

  expect(genDiff(before, after)).toEqual(expectedDiff);
  expect(() => genDiff('', '')).toThrow();
  expect(() => genDiff('nonexistentFile', '')).toThrow();
  expect(() => genDiff(before)).toThrow();
});

test('yml gendiff', () => {
  const before = getFixturePath('before.yml');
  const after = getFixturePath('after.yml');

  expect(genDiff(before, after)).toEqual(expectedDiff);
  expect(() => genDiff('', '')).toThrow();
  expect(() => genDiff('nonexistentFile', '')).toThrow();
  expect(() => genDiff(before)).toThrow();
});

test('ini gendiff', () => {
  const before = getFixturePath('before.ini');
  const after = getFixturePath('after.ini');

  expect(genDiff(before, after)).toEqual(expectedDiff);
  expect(() => genDiff('', '')).toThrow();
  expect(() => genDiff('nonexistentFile', '')).toThrow();
  expect(() => genDiff(before)).toThrow();
});
