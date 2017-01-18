

###Release 1.4.2
>*January 18, 2017*

 * moved history stuff to release-history package; internal refactor; added history now contains commit links [be4bfe7](https://github.com/stbaer/gf-release/commit/be4bfe75f6a4e2689f2e0e087904d0cfc8b28835)
 * .gitignore [978aadd](https://github.com/stbaer/gf-release/commit/978aaddbe5df4c5bc35d3efb9d4cbbe75af59c80)
 * updated args package [cb74401](https://github.com/stbaer/gf-release/commit/cb744016da4dfc60009f3cbf61facba85bc2476f)
 * updated ora [48d4973](https://github.com/stbaer/gf-release/commit/48d4973ff00876795e10e58f404c7eea609ab236)

###Release 1.4.1
>*January 9, 2017*

 * fix bin entry in package.json [d5b0d27](https://github.com/stbaer/gf-release/commit/d5b0d279b5093bbb9c33f1343d20c58ca1490e6c)

###Release 1.4.0
>*January 9, 2017*

 * added engines field to package.json [5546377](https://github.com/stbaer/gf-release/commit/5546377403474054ecaa0fd2a8c0aea6eb323351)
 * change: renamed release.js to gf-release.js [3df75bf](https://github.com/stbaer/gf-release/commit/3df75bfd72652438ec32754696866db181f67707)
 * lint / xo fixes [4c5b00a](https://github.com/stbaer/gf-release/commit/4c5b00a1f4701af156a79e1872ae81d53bfa48f2)
 * updated shelljs to 0.7.6 [8bd09a1](https://github.com/stbaer/gf-release/commit/8bd09a1e17a14ff8cebd08d19724af6b3028420b)
 * removed console.log [656e178](https://github.com/stbaer/gf-release/commit/656e17852dd536ec7868f70c2f5ea74ea604f2c2)

###Release 1.3.0
>*January 8, 2017*

 * added history commit message include and exclude filters [dc354aa](https://github.com/stbaer/gf-release/commit/dc354aad2bfc6cc0d5e601eb2abf3efc982992d2)
 * minor cleanup in prompt messages [ccf704b](https://github.com/stbaer/gf-release/commit/ccf704bf538b31d96b22cf625d604f9074f4a1e5)

###Release 1.2.1
>*January 8, 2017*

 * fixed typo [4245939](https://github.com/stbaer/gf-release/commit/4245939e60b7454d87a83a364c33fdc8ce54c307)

###Release 1.2.0
>*January 8, 2017*

 * fixed xo errors [9dcad0f](https://github.com/stbaer/gf-release/commit/9dcad0f7f79ce506848994cfdb14aeb61f2535ed)
 * minor cleanup [e357624](https://github.com/stbaer/gf-release/commit/e3576242b0ca89dc89e44a014018eb37a8895a19)
 * - new: prompt for npm publish, can be disabled via cli [c39b4d5](https://github.com/stbaer/gf-release/commit/c39b4d56a5dc4929ea91ba3278ed54d21f65b9b1)
 * - new: dry-run option, only logs the commands without changing anything [b55a449](https://github.com/stbaer/gf-release/commit/b55a449448cdf5aca5bcc02544f7eab43f6f764b)
 * updated yarn.lock [6fb9fb0](https://github.com/stbaer/gf-release/commit/6fb9fb00bb1827f77b5757cca65d8a2f1f4d1a4b)

###Release 1.1.4
>*January 8, 2017*

 * fix: get config from package.json [0d91998](https://github.com/stbaer/gf-release/commit/0d91998131c53417e39561c7d0394cfc262df99e)

###Release 1.1.3
>*January 7, 2017*

 * added preferGlobal to package.json [0d534d8](https://github.com/stbaer/gf-release/commit/0d534d8390513d4cb90752b86f3e6141e1fe809e)
 * fix: tag message; readme updated [d57a2d9](https://github.com/stbaer/gf-release/commit/d57a2d9922e5e930d4bb9310b7da4f64dc209b8e)
 * updated README.md [3f90e36](https://github.com/stbaer/gf-release/commit/3f90e36827e4dd6f554d2e2ca9ca195e628aec78)

###Release 1.1.2
>*January 7, 2017*

 * fix: commit command after version bump [f4d46cb](https://github.com/stbaer/gf-release/commit/f4d46cb5e2723d788999c1383e5aecdf2103744b)
 * change: release type defaults to patch now; fix: prompt.js exports [c8684ea](https://github.com/stbaer/gf-release/commit/c8684eae21e6dd886f0e3be92b31962f90b8657f)
 * change: no more prompt if the build should run, this depends on the config now [182edab](https://github.com/stbaer/gf-release/commit/182edabf50a1d806ff94c4725d27ffab3208a35a)

###Release 1.1.1
>*January 7, 2017*

 * fix: missing lib folder in package.json files entry [ab0316c](https://github.com/stbaer/gf-release/commit/ab0316c17f16c23c229f1ab3bd8bd3c58597b7b1)

###Release 1.1.0
>*January 7, 2017*

 * added empty History.md; added history config to package.json [c4c886f](https://github.com/stbaer/gf-release/commit/c4c886feb5a54833046ebfb30a98670b55537e95)
 * removed xo fix script - npm run xo -- --fix is good enough [0b6d7fd](https://github.com/stbaer/gf-release/commit/0b6d7fd9b1e2bf9482a9b3fbf6fce49934891222)
 * lint fix [b63f3b3](https://github.com/stbaer/gf-release/commit/b63f3b3740acceae36fd5975bbf230f2aa633a44)
 * option to create a history file [86a99f8](https://github.com/stbaer/gf-release/commit/86a99f81d7a598b16e707230ea985ea2cc2780fa)
 * added history module [13bb138](https://github.com/stbaer/gf-release/commit/13bb138e244eacac52650fef5f33dd927274f527)
 * license [4493051](https://github.com/stbaer/gf-release/commit/4493051b6789076faa1eb32781f489515400a8e3)
 * fix: typo [51a39c1](https://github.com/stbaer/gf-release/commit/51a39c1ac642b6bac3e9cab51f0e862bdd15d6d6)

###Release 1.0.1
>*January 6, 2017*

 * updated README [e2d9c7e](https://github.com/stbaer/gf-release/commit/e2d9c7eedab33ad4d3bacae91c7547ca0a5bd493)
 * updated prompt confirm message [2086170](https://github.com/stbaer/gf-release/commit/2086170fb241ad424fa70583b70f0f3f90eaa057)

###Release 1.0.0
>*January 6, 2017*

 * removed config for testing from package.json [ce7a095](https://github.com/stbaer/gf-release/commit/ce7a095cf39330d449e877c6ec4ce4ee13cdd28c)

###Release 0.1.0
>*January 6, 2017*

 * version 0.0.0 [7de3a7c](https://github.com/stbaer/gf-release/commit/7de3a7c23cf2c4f2d4b7e35e537619bb00d19567)
 * init gf-release [f5c8bd7](https://github.com/stbaer/gf-release/commit/f5c8bd7e328dacc064a82f93697824a3698eac20)


