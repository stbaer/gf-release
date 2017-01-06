const shellEx = require('./ex').shellEx;
const spinner = require('./spinner');

module.exports = branches => {
    const branchesString = branches.join(', ');
    spinner.create(`Checking if [${branchesString}] are up to date with origin.`);

    [branches].forEach(branch => {
        const local = shellEx(`git rev-parse develop`, undefined, false);
        const origin = shellEx(`git rev-parse origin/develop`, undefined, false);

        if (local.stdout !== origin.stdout) {
            spinner.fail(`Error: ${branch} not up to date with origin`);
        }
    });
    shellEx('sleep 0.5', {silent: true}, false);
    spinner.succeed();
};
