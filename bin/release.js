#! /usr/bin/env node

const semver = require('semver');
const taggedVersions = require('tagged-versions');
const inquirer = require('inquirer');
const loudRejection = require('loud-rejection');

const shellEx = require('../lib/ex').shellEx;
const execSh = require('../lib/ex').execSh;
const branchesUpToDate = require('../lib/branches-up-to-date');
const bumpVersions = require('../lib/bump-versions');
const handleError = require('../lib/handle-error');
const spinner = require('../lib/spinner');
const prompts = require('../lib/prompts');
const writeHistoryFile = require('../lib/history').writeHistoryFile;

const config = require('../lib/config').config;
const flags = require('../lib/config').flags;

let currentVersion;
let newVersion;

loudRejection();

const onGitFlowReleaseFinished = () => {
    inquirer.prompt(prompts.pushThemAll)
        .then(answer => {
            if (answer.pushThemAll) {
                spinner.create('Pushing branches and tags');
                shellEx(`git push origin --all && git push origin --tags`, {silent: false});
                spinner.succeed();

                if (!flags.n) {
                    inquirer.prompt(prompts.npmPublish)
                        .then(answer => {
                            if (answer.npmPublish) {
                                spinner.create('Publishing to npm');
                                shellEx('npm run publish', {silent: false});
                                spinner.succeed();
                            }
                        });
                }
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
        writeHistoryFile(currentVersion, newVersion, config.historyFile);
        commitCommand += 'updated History.md;';
    }

    if (config.buildCommand) {
        spinner.create('Building.');
        shellEx(config.buildCommand);
        spinner.succeed();
        commitCommand += 'updated build;';
    }
    shellEx(`${commitCommand}"`);

    execSh(`git flow release finish ${tagMessage} ${newVersion}`)
        .then(onGitFlowReleaseFinished);
};

const onRealeaseTypeChosen = choice => {
    const releaseType = choice[Object.keys(choice)[0]];
    newVersion = semver.inc(currentVersion, releaseType);

    shellEx(`git flow release start ${newVersion}`);
    bumpVersions(config.versionFiles, newVersion)
        .then(onVersionsBumped);
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
