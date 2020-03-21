const getStatus = (value1, value2) => {
  if (value1 === value2) {
    return 'unmodified';
  }
  if (!value1) {
    return 'added';
  }
  if (!value2) {
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

const makeAst = (data1, data2) => {
  const keys1 = typeof data1 === 'object' ? Object.keys(data1) : [];
  const keys2 = typeof data2 === 'object' ? Object.keys(data2) : [];
  const keys = [...keys1, ...keys2];
  const uniqueKeys = [...new Set(keys)].sort();

  const ast = uniqueKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    const newNode = {
      name: key,
      status: getStatus(value1, value2),
      oldValue: value1,
      newValue: value2,
      children: getChildren(value1, value2, makeAst),
    };
    return newNode;
  });
  return ast;
};

export default makeAst;
