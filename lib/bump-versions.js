const updateJson = require('update-json');
const handleError = require('./helpers/handle-error');
const config = require('./config');

/**
 *
 * @param {Array} versionFiles
 * @param {String} newVersion
 * @return {Promise.<*>}
 */
module.exports = (versionFiles, newVersion) => {
    const promises = [];
    if(config.flags.d){
        versionFiles = [];
    }

    versionFiles.forEach(file => {
        promises.push(
            new Promise((resolve, reject) => {
                updateJson(file, {version: newVersion}, err => (err ? reject(err) : resolve(true)));
            })
        );
    });
    return Promise.all(promises)
        .catch(handleError);
};
