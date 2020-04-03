const indent = '    ';

const stringify = (nodeValue, depth) => {
  if (typeof nodeValue !== 'object') {
    return nodeValue;
  }

  const formattedValue = Object.entries(nodeValue)
    .map(([key, value]) => `${indent.repeat(depth + 2)}${key}: ${value}`);

  const result = `{\n${formattedValue.join('\n')}\n${indent.repeat(depth + 1)}}`;
  return result;
};

const statusActions = {
  deleted: (node, depth) => `  - ${node.name}: ${stringify(node.valueOld, depth)}`,
  added: (node, depth) => `  + ${node.name}: ${stringify(node.valueNew, depth)}`,
  unmodified: (node, depth) => `    ${node.name}: ${stringify(node.valueOld, depth)}`,
  modified: (node, depth) => [`  - ${node.name}: ${stringify(node.valueOld, depth)}`,
    `  + ${node.name}: ${stringify(node.valueNew, depth)}`],
  hasChildren: (node, depth, renderFunction) => `    ${node.name}: ${renderFunction(node.children, depth + 1)}`,
};


const renderTree = (data, depth = 0) => {
  const indents = indent.repeat(depth);

  const formatData = (node) => statusActions[node.status](node, depth, renderTree);
  const formattedData = data.map(formatData).flat().map((element) => `${indents}${element}`);

  return `{\n${formattedData.join('\n')}\n${indents}}`;
};

export default renderTree;
