import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const mapping = {
  '.json': (data) => JSON.parse(data),
  '.yml': (data) => yaml.safeLoad(data),
  '.ini': (data) => ini.parse(data),
};

export default (filePath, data) => mapping[path.extname(filePath)](data);
