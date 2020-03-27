import _ from 'lodash';

const getStatus = (data1, data2, key) => {
  if (!_.has(data1, key)) {
    return 'added';
  }
  if (!_.has(data2, key)) {
    return 'deleted';
  }
  if (data1[key] === data2[key]) {
    return 'unmodified';
  }
  return 'modified';
};

const buildAst = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();

  const ast = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    const newNode = {
      name: key,
      status: getStatus(data1, data2, key),
      valueOld: value1,
      valueNew: value2,
      children: [],
    };

    if ((typeof value1 === 'object') && (typeof value2 === 'object')) {
      return { ...newNode, children: buildAst(value1, value2) };
    }
    return newNode;
  });
  return ast;
};

export default buildAst;
