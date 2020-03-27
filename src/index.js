import fs from 'fs';
import path from 'path';
import parse from './parsers';
import buildAst from './buildAst';
import render from './formatters';

const readFile = (filePath) => {
  const fullFilePath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(fullFilePath, 'utf-8');
  return data;
};


export default (filePath1, filePath2, format) => {
  const data1 = readFile(filePath1);
  const data2 = readFile(filePath2);

  const parsedData1 = parse(path.extname(filePath1), data1);
  const parsedData2 = parse(path.extname(filePath2), data2);

  const ast = buildAst(parsedData1, parsedData2);

  const result = render(format, ast);
  return result;
};
