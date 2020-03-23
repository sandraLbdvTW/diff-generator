import fs from 'fs';
import path from 'path';
import parse from './parsers';
import buildAst from './buildAst';
import { renderTree, renderPlain, renderJson } from './formatters';

const readFile = (filePath) => {
  const fullFilePath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(fullFilePath, 'utf-8');
  return data;
};

const formatAst = (format, ast) => {
  switch (format) {
    case 'plain':
      return renderPlain(ast);
    case 'json':
      return renderJson(ast);
    default:
      return renderTree(ast);
  }
};

export default (filePath1, filePath2, format) => {
  const data1 = readFile(filePath1);
  const data2 = readFile(filePath2);

  const parsedData1 = parse(filePath1, data1);
  const parsedData2 = parse(filePath2, data2);

  const ast = buildAst(parsedData1, parsedData2);

  const result = formatAst(format, ast);
  console.log(result);
  return result;
};
