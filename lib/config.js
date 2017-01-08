const readJsonSync = require('read-json-sync');
const args = require('args');
const log = require('./log');

args.option('message', 'enter a custom tag message');
args.option('dry-run', 'only show the commands that would be executed without changing anything', false);
args.option('bump-files', 'a list of .json files where the version field should be bumped', ['package.json']);
args.option('skip-build', `skip build before finishing release`);

const flags = args.parse(process.argv);
const pkgConfig = readJsonSync('./package.json').releaseConfig || {};
const configDefault = {
    versionFiles: ['package.json'],
    productionBranchName: 'master',
    developBranchName: 'develop',
    buildCommand: false,
    historyFile: false
};
const config = Object.assign({}, configDefault, pkgConfig);

flags.d && console.log('\nflags:', flags, '\n\nConfig: \n', config, '\n');

module.exports.config = config;

module.exports.flags = flags;
