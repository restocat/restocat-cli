#!/usr/bin/env node

const program = require('commander');
const templateManager = require('../lib/templateManager');
const packageInfo = require('../package.json');
const version = packageInfo.version;

program.version(version);

program
    .command('init')
    .description('Initialize Restocat project template')
    .option('-D, --dest <path>', 'change destination directory')
    .action((options) => templateManager.initTemplate(options));

program.parse(process.argv);