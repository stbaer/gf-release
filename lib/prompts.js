/**
 * @type {[*]}
 */
const releaseTypes = [
    {
        type: 'list',
        name: 'Release type selection',
        message: 'Select the release type:',
        choices: [{
            name: 'Major - breaking change',
            short: 'major',
            value: 'major'
        }, {
            name: 'Minor - new feature',
            short: 'minor',
            value: 'minor'
        }, {
            name: 'Patch - bugfix',
            short: 'patch',
            value: 'patch'
        }],
        default: 2,
        filter(val) {
            return val.toLowerCase();
        }
    }
];

/**
 *
 * @type {[*]}
 */
const pushThemAll = [{
    type: 'confirm',
    name: 'pushThemAll',
    message: `Release done. Push all branches and tags now?"`,
    default: true
}];

/**
 * @type {[*]}
 */
const npmPublish = [{
    type: 'confirm',
    name: 'npmPublish',
    message: `Everything pushed, run 'npm publish now?'`,
    default: false
}];

module.exports = {
    releaseTypes, pushThemAll, npmPublish
};
