const readJsonSync = require('read-json-sync');
const args = require('args');
// const log = require('./log');

args.option('message', 'enter a custom tag message, if not set it will be "Release [newVersion]"');
args.option('dry-run', 'only log commands without executing them', false);
args.option('no-publish', 'don\'t prompt for npm publish', false);
args.option('skip-build', `skip build before finishing release`);

const flags = args.parse(process.argv);
const pkgConfig = readJsonSync('./package.json').releaseConfig || {};
const configDefault = {
    versionFiles: ['package.json'],
    productionBranchName: 'master',
    developBranchName: 'develop',
    buildCommand: false,
    historyFile: false,
    commitMessagesExclude: ['Merge tag'],
    commitMessagesInclude: [],
    commitBaseUrl: null
};
const config = Object.assign({}, configDefault, pkgConfig);

if (flags.s) {
    /** @type {boolean|null|string} */
    config.buildCommand = false;
}

module.exports.config = config;
module.exports.flags = flags;
