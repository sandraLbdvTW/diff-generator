import genDiff from '..';

test('json gendiff', () => {
  expect(genDiff('before.json', 'after.json')).toEqual(`{
  host: hexlet.io
- timeout: 50
+ timeout: 20
- proxy: 123.234.53.22
- follow: false
+ verbose: true
}`);
  expect(() => genDiff('', '')).toThrow();
  expect(() => genDiff('nonexistentFile', '')).toThrow();
  expect(() => genDiff('before.json')).toThrow();
});
