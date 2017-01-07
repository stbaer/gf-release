const shell = require('shelljs');
const exec = require('exec-sh');
const handleError = require('./handle-error');
const log = require('./log');

/**
 *
 * @param {String} cmd
 */
const logCommand = cmd => log(`\nExecuting command: ${cmd}`, 'yellow');

/**
 *
 * @param {String} command - the shell command to execute
 * @param [sjsOpts] - shelljs options
 * @param [showCommand=true] - print the command
 * @returns {Object}
 */
const shellEx = (command, sjsOpts = {silent: true}, showCommand = true) => {
    showCommand && logCommand(command);

    const runCommand = shell.exec(command, sjsOpts);
    runCommand.code !== 0 && handleError(runCommand.stderr);

    return runCommand;
};

/**
 *
 * @param {String} command - the shell command to execute
 * @param [opts] - [options={silent: true}]
 * @param [showCommand=true] - print the command
 * @returns {Object}
 */
const execSh = (command, opts = {silent: true}, showCommand = true) => {
    return new Promise((resolve, reject) => {
        showCommand && logCommand(command);

        exec(command, err => {
            err && reject(err);
            resolve(true);
        });
    });
};

module.exports = {
    shellEx, execSh
};
