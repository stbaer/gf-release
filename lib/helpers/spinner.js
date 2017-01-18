const ora = require('ora');
const handleError = require('./handle-error');

module.exports = {
    create: message => {
        global.spinner && global.spinner.succeed();
        global.spinner = ora(message).start();
    },
    fail: message => {
        global.spinner && global.spinner.fail();
        handleError(message);
    },
    succeed: () => global.spinner && global.spinner.succeed(),
    stop: () => global.spinner && global.spinner.stop()
};

