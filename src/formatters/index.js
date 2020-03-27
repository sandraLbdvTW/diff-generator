import renderTree from './renderTree.js';
import renderPlain from './renderPlain.js';
import renderJson from './renderJson.js';


const render = (format, ast) => {
  switch (format) {
    case 'plain':
      return renderPlain(ast);
    case 'json':
      return renderJson(ast);
    default:
      return renderTree(ast);
  }
};

export default render;
