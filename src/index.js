import fs from 'fs';
import path from 'path';
import parse from './parsers';
import makeAst from './makeAst';
import render from './render';

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

  const ast = makeAst(parsedData1, parsedData2);

  const result = render(ast);
  console.log(result);
  return result;
};
