#! /usr/bin/env node

const semver = require('semver');
const taggedVersions = require('tagged-versions');
const inquirer = require('inquirer');
const args = require('args');
require('pkginfo')(module);

const shellEx = require('../lib/ex').shellEx;
const execSh = require('../lib/ex').execSh;
const branchesUpToDate = require('../lib/check-branches-up-to-date');
const bumpVersions = require('../lib/bump-versions');
const handleError = require('../lib/handle-error');
const spinner = require('../lib/spinner');
const prompts = require('../lib/prompts');
const getTagNotes = require('../lib/history');

args.option('message', 'enter a custom tag message');
args.option('skip-build', `skip build before release`);

const flags = args.parse(process.argv);
const config = module.exports.releaseConfig || {};

config.versionFiles = config.versionFiles || ['package.json'];
config.buildCommand = (config.buildCommand === 'undefined') ? 'npm run build' : config.buildCommand;
config.productionBranchName = config.productionBranchName || 'master';
config.developBranchName = config.developBranchName || 'develop';
config.historyFile = config.historyFile || false;
let currentVersion;
let newVersion;

const onGitFlowReleaseFinished = () => {
    inquirer.prompt(prompts.pushThemAll)
        .then(answer => {
            if (answer.pushThemAll) {
                spinner.create('Pushing branches and tags');
                shellEx(`git push origin --all && git push origin --tags`, {silent: false});
                spinner.succeed();
            }
        });
};

const onVersionsBumped = () => {
    let commitCommand = 'git commit -am "bumped versions;';
    let tagMessage = `-m "Release ${newVersion}"`;
    if (flags.m) {
        tagMessage = `-m "${flags.m}" `;
    }
    if (config.historyFile) {
        const historyText = getTagNotes(currentVersion, newVersion);
        shellEx(`echo "${historyText}\n$(cat ${config.historyFile})" > ${config.historyFile}`);
        commitCommand += 'updated History.md;'
    }

    if (config.buildCommand) {
        spinner.create('Building.');
        shellEx(config.buildCommand);
        spinner.succeed();
        commitCommand += 'updated build;';
    }
    shellEx(commitCommand);

    execSh(`git flow release finish "${tagMessage}" ${newVersion}`)
        .then(onGitFlowReleaseFinished)
        .catch(handleError);
};

const onRealeaseTypeChosen = choice => {
    const releaseType = choice[Object.keys(choice)[0]];
    newVersion = semver.inc(currentVersion, releaseType);

    shellEx(`git flow release start ${newVersion}`);
    bumpVersions(config.versionFiles, newVersion)
        .then(onVersionsBumped)
        .catch(handleError);
};

const onLastVersionResult = res => {
    currentVersion = res.version;
    inquirer.prompt(prompts.releaseTypes)
        .then(onRealeaseTypeChosen);
};

// Start
branchesUpToDate([config.productionBranchName, config.developBranchName]);

taggedVersions
    .getLastVersion()
    .then(onLastVersionResult)
    .catch(handleError);
