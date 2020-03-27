#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format', 'tree')
  .action((firstConfig, secondConfig, options) => {
    const result = genDiff(firstConfig, secondConfig, options.format);
    console.log(result);
  })
  .program.parse(process.argv);
