import path from 'path';
import fs from 'fs';
import genDiff from '..';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let result;
let resultPlain;
let resultJson;

beforeEach(() => {
  result = readFile('result').trim();
  resultPlain = readFile('resultPlain').trim();
  resultJson = readFile('resultJson').trim();
});

test('json gendiff', () => {
  const firstFilePath = getFixturePath('before.json');
  const secondFilePath = getFixturePath('after.json');

  expect(genDiff(firstFilePath, secondFilePath)).toEqual(result);
  expect(genDiff(firstFilePath, secondFilePath, 'plain')).toEqual(resultPlain);
  expect(genDiff(firstFilePath, secondFilePath, 'json')).toEqual(resultJson);
});

test('yml gendiff', () => {
  const firstFilePath = getFixturePath('before.yml');
  const secondFilePath = getFixturePath('after.yml');

  expect(genDiff(firstFilePath, secondFilePath)).toEqual(result);
  expect(genDiff(firstFilePath, secondFilePath, 'plain')).toEqual(resultPlain);
  expect(genDiff(firstFilePath, secondFilePath, 'json')).toEqual(resultJson);
});

test('ini gendiff', () => {
  const firstFilePath = getFixturePath('before.ini');
  const secondFilePath = getFixturePath('after.ini');
  const resultJsonForIni = readFile('resultJsonForIni');

  expect(genDiff(firstFilePath, secondFilePath)).toEqual(result);
  expect(genDiff(firstFilePath, secondFilePath, 'plain')).toEqual(resultPlain);
  expect(genDiff(firstFilePath, secondFilePath, 'json')).toEqual(resultJsonForIni);
});

test('errors', () => {
  expect(() => genDiff('', '')).toThrow();
  expect(() => genDiff(getFixturePath('before.ini'), '')).toThrow();
  expect(() => genDiff(getFixturePath('before.ini'))).toThrow();
  expect(() => genDiff('nonexistentFile', '')).toThrow();
});
