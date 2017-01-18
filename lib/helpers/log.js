const chalk = require('chalk');
/**
 *
 * {String} @param message
 * {String} @param color
 */
module.exports = (message, color) => {
    let msg;
    if (color) {
        msg = chalk[color](message);
    }
    console.log(msg || message);
};
