const indent = '    ';

const stringify = (value, nestingLevel) => {
  if (typeof value !== 'object') {
    return JSON.stringify(value).replace(/"/g, '');
  }
  const result = JSON.stringify(value, null, '\t')
    .replace(/"/g, '')
    .replace(/\t/g, `${indent.repeat(nestingLevel + 2)}`)
    .replace(/}/g, `${indent.repeat(nestingLevel + 1)}}`);
  return result;
};

const statusActions = {
  deleted: (node, nestingLevel) => `  - ${node.name}: ${stringify(node.valueOld, nestingLevel)}`,
  added: (node, nestingLevel) => `  + ${node.name}: ${stringify(node.valueNew, nestingLevel)}`,
  unmodified: (node, nestingLevel) => `    ${node.name}: ${stringify(node.valueOld, nestingLevel)}`,
  modified: (node, nestingLevel) => [`  - ${node.name}: ${stringify(node.valueOld, nestingLevel)}`,
    `  + ${node.name}: ${stringify(node.valueNew, nestingLevel)}`],
  hasChildren: (node, nestingLevel, renderFunction) => `    ${node.name}: ${renderFunction(node.children, nestingLevel + 1)}`,
};


const renderTree = (data, nestingLevel = 0) => {
  const indents = indent.repeat(nestingLevel);

  const formatData = (node) => statusActions[node.status](node, nestingLevel, renderTree);
  const formattedData = data.map(formatData).flat().map((element) => `${indents}${element}`);

  return `{\n${formattedData.join('\n')}\n${indents}}`;
};

export default renderTree;
