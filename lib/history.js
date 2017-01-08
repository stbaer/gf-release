const dateFormat = require('dateformat');
const shellEx = require('./ex').shellEx;
const handleError = require('./handle-error');

const getHistoryString = (currentVersion, newVersion) => {
        const logCommand = shellEx(`git log ${currentVersion}..HEAD --pretty=format:"  * %s"`);
        const date = dateFormat(new Date(), 'longDate');

        if (logCommand.code !== 0) {
            handleError(logCommand.stderr);
        }

        return `###${newVersion} — *${date}*\n\n${logCommand.stdout}\n`;
    };

const writeHistoryFile = (currentVersion, newVersion, file) => {
    const historyText = getHistoryString(currentVersion, newVersion);
    shellEx(`echo "${historyText}\n$(cat ${file})" > ${file}`);
};

module.exports.writeHistoryFile = writeHistoryFile;
