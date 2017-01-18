const updateJson = require('update-json');
const handleError = require('./helpers/handle-error');

/**
 *
 * @param {Array} versionFiles
 * @param {String} newVersion
 * @return {Promise.<*>}
 */
module.exports = (versionFiles, newVersion) => {
    const promises = [];

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
