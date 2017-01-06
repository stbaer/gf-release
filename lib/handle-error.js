const log = require('./log');

/**
 * {String} @param msg
 */
const error = msg => log(msg, 'red');

/**
 *
 * @param {String} e - error message
 * @param {Boolean} [doExit=true]
 */
module.exports = (e, doExit = true) => {
    if (!e) {
        return;
    }
    error(e);
    doExit && process.exit();
};
