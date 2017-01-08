> git flow command line release helper - less typing when doing a git flow release

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## Usage

Install from [npm](https://npmjs.com/release) 

```bash
$ npm i -g gf-release
```

To start the release, call 
```bash
$ release [options] [command]
```
from the root of a git flow enabled repo 

## What it does

- check if the production and dev branches are up to date with the upstream branches
- prompt for selecting the release type (major, minor, patch)
- detect the last release version and the new release version based on the selection
- start the git flow release
    - bump the version number(s) of all files set in the config (see Config section below)
    - update the history file if it is specified in the config
    - execute the build script if it is specified in the config
    - commit the changes (use the -m cli flag for a custom commit message, otherwise it's `Release ${releaseVersion}`)
- finish the release 
- prompt if all branches and tags should be pushed
- if everything was pushed, prompt if 'npm publish' should be executed (unless disabled via cli option)

## Requirements

- git flow has to be initialized (please use [gitflow-avh](https://github.com/petervanderdoes/gitflow-avh) because [nvie/gitflow](https://github.com/nvie/gitflow) hasn't been updated in years)
- there needs to be at least one previous release / tag with a valid semver version
- npm > 3, node > 6

## Command line options

```bash
$ release -h
```

Commands:

    help  Display help

   Options:

    -d, --dry-run     only log commands without executing them (disabled by default)
    -m, --message     enter a custom tag message, if not set it will be "Release [newVersion]"
    -n, --no-publish  don't prompt for npm publish (disabled by default)
    -s, --skip-build  skip build before finishing release
    
    -h, --help        Output usage information
    -v, --version     Output the version number

### Config

This is the default configuration:

```js
{
    versionFiles: ["package.json"],
    productionBranchName: "master",
    developBranchName: "develop",
    upstream: "origin",
    commitMessagesExclude: ['Merge tag'],
    commitMessagesInclude: [],
    buildCommand: null,
    historyFile: null
}
``` 
- `versionFiles`: json files that contain a version field which should be bumped when releasing
- `productionBranchName`  / `developBranchName`: self explanatory
- `upstream` can be changed in case there's an alias set for `origin` 
-  `commitMessagesExclude`: Array of strings, commit messages containing one of the strings won't be included in the History
-  `commitMessagesInclude`: Array of strings, only include commit messages in the History that contain one of the strings
    - if `commitMessagesInclude` contains one or more strings, the exclude array will be ignored
- `buildCommand`: this command will be run before finishing the release, e.g `npm run build`
- `historyFile`: if set it will prepend the history between the last release and this one to the file, e.g 'History.md'


It can be overwritten by adding a `releaseConfig` field to the `package.json`.

```json
...
"releaseConfig": {
    "versionFiles": ["package.json", "config/version.json"],
    "buildCommand": "npm run myBuildScript",
    "productionBranchName": "prod",
    "developBranchName": "dev",
    "upstream": "myOriginAlias"
}
```

## Contribute or Report Issue

Pull requests should target the develop branch.

For bugs and feature requests, [please create an issue][10].

[10]: https://github.com/stbaer/gf-release/issues

## Licence

MIT, see [LICENSE.md](https://github.com/stbaer/gf-release/blob/master/LICENSE.md) for details.
