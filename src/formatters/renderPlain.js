const stringify = (value) => {
  switch (typeof value) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const statusActions = {
  deleted: (node, fullName) => `Property '${fullName.join('.')}' was deleted`,
  added: (node, fullName) => `Property '${fullName.join('.')}' was added with value: ${stringify(node.valueNew)}`,
  unmodified: () => null,
  modified: (node, fullName) => `Property '${fullName.join('.')}' was changed from ${stringify(node.valueOld)} to ${stringify(node.valueNew)}`,
  hasChildren: (node, fullName, fn) => fn(node.children, fullName),
};

const renderPlain = (ast, acc = []) => {
  const iter = (node, fullName) => {
    const { name, status } = node;
    const newFullName = [...fullName, name];

    return statusActions[status](node, newFullName, renderPlain);
  };

  return ast.map((element) => iter(element, acc)).filter((v) => v).join('\n');
};

export default renderPlain;
