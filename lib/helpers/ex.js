const shell = require('shelljs');
const exec = require('exec-sh');
const handleError = require('./handle-error');
const log = require('./log');
const flags = require('./../config').flags;

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
    (showCommand || flags.d) && logCommand(command);

    if (flags.d) {
        return {
            stdout: ''
        };
    }
    const runCommand = shell.exec(command, sjsOpts);
    runCommand.code !== 0 && handleError(runCommand.stderr);
    return runCommand;
};

/**
 *
 * @param {String} command - the shell command to execute
 * @param [opts] - [options={silent: true}]
 * @param [showCommand=true] - print the command
 */
const execSh = (command, opts = {silent: true}, showCommand = true) => {
    (showCommand || flags.d) && logCommand(command);

    return new Promise(resolve => {
        if (flags.d) {
            resolve(true);
        } else {
            exec(command, err => {
                err && handleError(err);
                resolve(true);
            });
        }
    });
};

module.exports = {
    shellEx, execSh
};
