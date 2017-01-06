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

// args.option('dry', 'Dry run for testing'); // @TODO
// const flags = args.parse(process.argv);
args.parse(process.argv);

const config = module.exports.releaseConfig || {};

config.versionFiles = config.versionFiles || ['package.json'];
config.buildCommand = config.buildCommand || 'npm run build';
config.productionBranchName = config.productionBranchName || 'master';
config.developBranchName = config.developBranchName || 'develop';

let currentVersion;
let newVersion;

const onGitFlowReleaseFinished = () => {
    inquirer.prompt(prompts.pushThemAll)
        .then(answer => {
            if (answer.pushThemAll) {
                spinner.create('Pushing branges and tags');
                shellEx(`git push origin --all && git push origin --tags`, {silent: false});
                spinner.succeed();
            }
        });
};

const onVersionsBumped = () => {
    inquirer.prompt(prompts.doRunBuild).then(answer => {
        const appendToCommitMessage = answer.doRunBuild ? 'updated build;' : '';

        if (answer.doRunBuild) {
            spinner.create('Building.');
            shellEx(config.buildCommand);
            spinner.succeed();
        }
        shellEx(`git commit -am "bumped versions;${appendToCommitMessage}"`);
        execSh(`git flow release finish ${newVersion}`)
            .then(onGitFlowReleaseFinished)
            .catch(handleError);
    });
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

