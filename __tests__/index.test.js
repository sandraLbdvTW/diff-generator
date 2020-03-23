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
  const configBefore = getFixturePath('before.json');
  const configAfter = getFixturePath('after.json');

  expect(genDiff(configBefore, configAfter)).toEqual(result);
  expect(genDiff(configBefore, configAfter, 'plain')).toEqual(resultPlain);
  expect(genDiff(configBefore, configAfter, 'json')).toEqual(resultJson);
});

test('yml gendiff', () => {
  const configBefore = getFixturePath('before.yml');
  const configAfter = getFixturePath('after.yml');

  expect(genDiff(configBefore, configAfter)).toEqual(result);
  expect(genDiff(configBefore, configAfter, 'plain')).toEqual(resultPlain);
  expect(genDiff(configBefore, configAfter, 'json')).toEqual(resultJson);
});

test('ini gendiff', () => {
  const configBefore = getFixturePath('before.ini');
  const configAfter = getFixturePath('after.ini');
  const resultJsonForIni = readFile('resultJsonForIni');

  expect(genDiff(configBefore, configAfter)).toEqual(result);
  expect(genDiff(configBefore, configAfter, 'plain')).toEqual(resultPlain);
  expect(genDiff(configBefore, configAfter, 'json')).toEqual(resultJsonForIni);
});

test('errors', () => {
  expect(() => genDiff('', '')).toThrow();
  expect(() => genDiff(getFixturePath('before.ini'), '')).toThrow();
  expect(() => genDiff(getFixturePath('before.ini'))).toThrow();
  expect(() => genDiff('nonexistentFile', '')).toThrow();
});
