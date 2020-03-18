import path from 'path';
import yaml from 'js-yaml';

const mapping = {
  '.json': (data) => JSON.parse(data),
  '.yml': (data) => yaml.safeLoad(data),
};

export default (filePath, data) => mapping[path.extname(filePath)](data);
