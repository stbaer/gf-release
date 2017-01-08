const util = require('util');
const dateFormat = require('dateformat');
const shellEx = require('./ex').shellEx;
const handleError = require('./handle-error');
const config = require('./config').config;

const getCommitLogMessageFilter = () => {
    const excludes = config.commitMessagesExclude;
    const includes = config.commitMessagesInclude;
    let filterStrings = [];
    let invertGrep = false;

    if (util.isArray(includes) && includes.length) {
        filterStrings = includes;
    } else if (util.isArray(excludes) && excludes.length) {
        filterStrings = excludes;
        invertGrep = true;
    }

    let filterExpr = '';

    if (filterStrings.length) {
        filterExpr += invertGrep ? '--invert-grep' : '--grep';
        filterStrings.forEach((str) => {
            filterExpr += ` --grep="${str}" `
        });
    }

    return filterExpr;

};

const getHistoryString = (currentVersion, newVersion) => {

    const filterExpr = getCommitLogMessageFilter();
    const logCommand = shellEx(`git log ${filterExpr} ${currentVersion}..HEAD --pretty=format:"  * %s"`);
    const date = dateFormat(new Date(), 'longDate');

    if (logCommand.code !== 0) {
        handleError(logCommand.stderr);
    }

    console.log('______________', logCommand);

    return `###${newVersion} — *${date}*\n\n${logCommand.stdout}\n`;
};

const writeHistoryFile = (currentVersion, newVersion, file) => {
    const historyText = getHistoryString(currentVersion, newVersion);
    shellEx(`echo "${historyText}\n$(cat ${file})" > ${file}`);
};

module.exports.writeHistoryFile = writeHistoryFile;
