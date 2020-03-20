import path from 'path';
import fs from 'fs';
import genDiff from '..';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let expectedDiff;

beforeEach(() => {
  expectedDiff = [ { name: 'common',
    status: 'modified',
    children:
   [ { name: 'follow',
     status: 'added',
     children: [],
     oldValue: '',
     newValue: 'false' },
   { name: 'setting1',
     status: 'unmodified',
     children: [],
     oldValue: 'Value 1',
     newValue: 'Value 1' },
   { name: 'setting2',
     status: 'deleted',
     children: [],
     oldValue: '200',
     newValue: '' },
   { name: 'setting3',
     status: 'modified',
     children: [],
     oldValue: 'true',
     newValue: '{key:value}' },
   { name: 'setting5',
     status: 'added',
     children: [],
     oldValue: '',
     newValue: '{key5:value5}' },
   { name: 'setting6',
     status: 'modified',
     children:
        [ { name: 'key',
          status: 'unmodified',
          children: [],
          oldValue: 'value',
          newValue: 'value' },
        { name: 'ops',
          status: 'added',
          children: [],
          oldValue: '',
          newValue: 'vops' } ],
     oldValue: '{key:value}',
     newValue: '{key:value,ops:vops}' } ],
    oldValue:
   '{setting1:Value 1,setting2:200,setting3:true,setting6:{key:value}}',
    newValue:
   '{follow:false,setting1:Value 1,setting3:{key:value},setting5:{key5:value5},setting6:{key:value,ops:vops}}' },
  { name: 'group1',
    status: 'modified',
    children:
   [ { name: 'baz',
     status: 'modified',
     children: [],
     oldValue: 'bas',
     newValue: 'bars' },
   { name: 'foo',
     status: 'unmodified',
     children: [],
     oldValue: 'bar',
     newValue: 'bar' },
   { name: 'nest',
     status: 'modified',
     children: [],
     oldValue: '{key:value}',
     newValue: 'str' } ],
    oldValue: '{baz:bas,foo:bar,nest:{key:value}}',
    newValue: '{foo:bar,baz:bars,nest:str}' },
  { name: 'group2',
    status: 'deleted',
    children: [],
    oldValue: '{abc:12345}',
    newValue: '' },
  { name: 'group3',
    status: 'added',
    children: [],
    oldValue: '',
    newValue: '{fee:100500}' } ];
});
// let expectedDiff;

// beforeEach(() => {
//   expectedDiff = readFile('result');
// });
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
