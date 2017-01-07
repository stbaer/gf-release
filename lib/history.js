const shellEx = require('../lib/ex').shellEx;
const handleError = require('./handle-error');

const getDate = () => {
    const d = new Date();

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

module.exports = (currentVersion, newVersion) => {
    const logCommand = shellEx(`git log ${currentVersion}..HEAD --pretty=format:"  * %s"`);
    const date = getDate();

    if (logCommand.code !== 0) {
        handleError(logCommand.stderr);
    }

    return `###${newVersion} — *${date}*\n\n${logCommand.stdout}\n`;
};
