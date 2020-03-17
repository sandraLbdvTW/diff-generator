import fs from 'fs';
import path from 'path';
import { has } from 'lodash';

const readFile = (filePath) => {
  const fullFilePath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(fullFilePath);

  return JSON.parse(data);
};

export default (filePath1, filePath2) => {
  const data1 = readFile(filePath1);
  const data2 = readFile(filePath2);

  const keys = [...Object.keys(data1), ...Object.keys(data2)];
  const uniqueKeys = [...new Set(keys)];
  const func = (acc, key) => {
    if (data1[key] === data2[key]) {
      return `${acc}  ${key}: ${data1[key]}\n`;
    }
    if (!has(data2, key)) {
      return `${acc}- ${key}: ${data1[key]}\n`;
    }
    if (!has(data1, key)) {
      return `${acc}+ ${key}: ${data2[key]}\n`;
    }
    return `${acc}- ${key}: ${data1[key]}\n+ ${key}: ${data2[key]}\n`;
  };

  const result = `{${uniqueKeys.reduce(func, '\n')}}`;
  console.log(result);
  return result;
};
