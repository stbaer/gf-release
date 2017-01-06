> git flow command line release helper - less typing when doing a git flow release

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## Usage

Install from [npm](https://npmjs.com/release) 

```bash
$ npm i gf-release --save-dev
```

Or use [yarn](https://yarnpkg.com/en/docs/install)
```bash
$ yarn add gf-release --save-dev
```

## What it does

- check if the production and dev branches are up to date with the upstream branches
- ask for the release type (major, minor, patch)
- detect the last release version and the new release version based on the selection
- run `git flow release start ${newReleaseVersion}`
- bump the version numbers (see config below)
- ask if a build script should be run, if yes per default `npm run build` or see config
- commit the changes 
- run `git flow release finish ${newReleaseVersion}` 
- ask if all branches and tags should be pushed and do it if yes

## Requirements

- git flow has to be initialized
- there needs to be at least one previous release / tag with a valid semver version
- npm > 3, node > 6

## Options

Show available cli options:
```bash
$ release -h
```

### Config

This is the default configuration:

```json
{
    "versionFiles": ["package.json"],
    "buildCommand": "npm run build",
    "productionBranchName": "master",
    "developBranchName": "develop",
    "upstream": "origin"
}
``` 
- `versionFiles`: json files that contain a version field which should be bumped when releasing
- `buildCommand`: this command will be run before `git flow release finish ${version}`
- `productionBranchName`  / `productionBranchName` - self explanatory
- `upstream` can be changed in case theres an alias set for `origin` 

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
