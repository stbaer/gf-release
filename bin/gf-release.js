#! /usr/bin/env node

const semver = require('semver');
const taggedVersions = require('tagged-versions');
const inquirer = require('inquirer');
const loudRejection = require('loud-rejection');
const dateFormat = require('dateformat');
const releaseHistory = require('release-history');
const remoteUrl = require('remote-origin-url');

const shellEx = require('../lib/helpers/ex').shellEx;
const execSh = require('../lib/helpers/ex').execSh;
const handleError = require('../lib/helpers/handle-error');
const branchesUpToDate = require('../lib/branches-up-to-date');
const bumpVersions = require('../lib/bump-versions');
const spinner = require('../lib/helpers/spinner');
const prompts = require('../lib/prompts');

const config = require('../lib/config').config;
const flags = require('../lib/config').flags;

const getCommits = releaseHistory.getCommits;
const commitsToMd = releaseHistory.commitsToMd;
let currentVersion;
let currentHash;
let newVersion;

loudRejection();

const prependToHistoryFile = (currentHash, newVersion, file) => new Promise(resolve => {

    const date = dateFormat(new Date(), 'longDate');

    getCommits(null, currentHash)
        .then((commits) => {
            remoteUrl((err, url) => {
                const historyString = commitsToMd(commits, {
                    includeStrings: config.commitMessagesInclude,
                    excludeStrings: config.commitMessagesExclude,
                    version: newVersion, date, url
                });
                shellEx(`echo "${historyString}\n\n$(cat ${file})" > ${file}`);
                resolve();
            });
        });
});


const build = () => {
    if (config.buildCommand) {
        spinner.create('Building.');
        shellEx(config.buildCommand);
        spinner.succeed();
    }
};

const pushAll = () => {
    spinner.create('Pushing branches and tags');
    shellEx(`git push origin --all && git push origin --tags`, {silent: false});
    spinner.succeed();
};

const finishRelease = () => {
    let tagMessage = `-m "Release ${newVersion}"`;
    if (flags.m) {
        tagMessage = `-m "${flags.m}" `;
    }

    execSh(`git flow release finish ${tagMessage} ${newVersion}`)
        .then(onGitFlowReleaseFinished);
};

const onHistoryDone = (commitCommand) => {
    if (config.buildCommand) {
        build();
        commitCommand += 'updated build;';
    }
    shellEx(`${commitCommand}"`);
    finishRelease();
};

const onEverythingPushed = () => {
    !flags.n && inquirer
        .prompt(prompts.npmPublish)
        .then(answer => {
            if (answer.npmPublish) {
                spinner.create('Publishing to npm');
                shellEx('npm publish', {silent: false});
                spinner.succeed();
            }
        });
};

const onGitFlowReleaseFinished = () => {
    inquirer.prompt(prompts.pushThemAll)
        .then(answer => {
            if (answer.pushThemAll) {
                pushAll();
                onEverythingPushed();
            }
        });
};


const onVersionsBumped = () => {
    let commitCommand = 'git commit -am "bumped versions;';

    if (config.historyFile) {
        prependToHistoryFile(currentHash, newVersion, config.historyFile)
            .then(() => {
                onHistoryDone(`${commitCommand} updated History.md`);
            })
    } else {
        onHistoryDone(commitCommand);
    }
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
    currentHash = res.hash;
    inquirer.prompt(prompts.releaseTypes)
        .then(onRealeaseTypeChosen);
};

// Start
branchesUpToDate([config.productionBranchName, config.developBranchName]);

taggedVersions
    .getLastVersion()
    .then(onLastVersionResult)
    .catch(handleError);
