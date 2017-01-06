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
 *
 * @type {[*]}
 */
const doRunBuild = [{
    type: 'confirm',
    name: 'doRunBuild',
    message: `Executing: build command`,
    default: true
}];

module.exports = {
    releaseTypes, pushThemAll, doRunBuild
};
