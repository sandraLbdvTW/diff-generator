import { has } from 'lodash';

const getStatus = (data1, data2, key) => {
  if (data1[key] === data2[key]) {
    return 'unmodified';
  }
  if (!has(data1, key)) {
    return 'added';
  }
  if (!has(data2, key)) {
    return 'deleted';
  }
  return 'modified';
};

const getChildren = (value1, value2, fn) => {
  if ((typeof value1 === 'object') && (typeof value2 === 'object')) {
    return fn(value1, value2);
  }
  return [];
};

const buildAst = (data1, data2) => {
  const keys1 = typeof data1 === 'object' ? Object.keys(data1) : [];
  const keys2 = typeof data2 === 'object' ? Object.keys(data2) : [];
  const keys = [...keys1, ...keys2];
  const uniqueKeys = [...new Set(keys)].sort();

  const ast = uniqueKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    const newNode = {
      name: key,
      status: getStatus(data1, data2, key),
      valueOld: value1,
      valueNew: value2,
      children: getChildren(value1, value2, buildAst),
    };
    return newNode;
  });
  return ast;
};

export default buildAst;
