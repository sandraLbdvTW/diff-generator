import fs from 'fs';
import path from 'path';
import { has } from 'lodash';
import parse from './parsers';

const readFile = (filePath) => {
  const fullFilePath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(fullFilePath, 'utf-8');
  return data;
};

export default (filePath1, filePath2) => {
  const data1 = readFile(filePath1);
  const data2 = readFile(filePath2);

  const parsedData1 = parse(filePath1, data1);
  const parsedData2 = parse(filePath2, data2);

  const keys = [...Object.keys(parsedData1), ...Object.keys(parsedData2)];
  const uniqueKeys = [...new Set(keys)];
  const func = (acc, key) => {
    if (parsedData1[key] === parsedData2[key]) {
      return `${acc}  ${key}: ${parsedData1[key]}\n`;
    }
    if (!has(parsedData2, key)) {
      return `${acc}- ${key}: ${parsedData1[key]}\n`;
    }
    if (!has(parsedData1, key)) {
      return `${acc}+ ${key}: ${parsedData2[key]}\n`;
    }
    return `${acc}- ${key}: ${parsedData1[key]}\n+ ${key}: ${parsedData2[key]}\n`;
  };

  const result = `{${uniqueKeys.reduce(func, '\n')}}`;
  console.log(result);
  return result;
};
