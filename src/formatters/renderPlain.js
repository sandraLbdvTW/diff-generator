const stringify = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  return JSON.stringify(value).replace(/"/g, "'");
};

const statusActions = {
  deleted: (node, fullName) => `Property ${fullName} was deleted`,
  added: (node, fullName) => `Property ${fullName} was added with value: ${stringify(node.valueNew)}`,
  unmodified: () => '',
  modified: (node, fullName) => `Property ${fullName} was changed from ${stringify(node.valueOld)} to ${stringify(node.valueNew)}`,
};

const renderPlain = (ast, acc = []) => {
  const iter = (node, fullName) => {
    const { name, children, status } = node;
    const newFullName = [...fullName, name];

    if (children.length === 0) {
      return statusActions[status](node, newFullName.join('.'));
    }
    return renderPlain(children, newFullName);
  };

  return ast.map((element) => iter(element, acc)).filter((v) => v).join('\n');
};

export default renderPlain;
