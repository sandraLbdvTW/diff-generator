import _ from 'lodash';

const buildAst = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();

  const ast = keys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        name: key,
        status: 'added',
        valueOld: null,
        valueNew: data2[key],
        children: null,
      };
    }

    if (!_.has(data2, key)) {
      return {
        name: key,
        status: 'deleted',
        valueOld: data1[key],
        valueNew: null,
        children: null,
      };
    }

    if (data1[key] === data2[key]) {
      return {
        name: key,
        status: 'unmodified',
        valueOld: data1[key],
        valueNew: data2[key],
        children: null,
      };
    }

    if ((typeof data1[key] !== 'object') || (typeof data2[key] !== 'object')) {
      return {
        name: key,
        status: 'modified',
        valueOld: data1[key],
        valueNew: data2[key],
        children: null,
      };
    }

    return {
      name: key,
      status: 'hasChildren',
      valueOld: null,
      valueNew: null,
      children: buildAst(data1[key], data2[key]),
    };
  });

  return ast;
};

export default buildAst;
