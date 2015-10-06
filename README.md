# AngularJS 1 with TypeScript sample application

There are two branches on this repo:

- **main** : No module loader is used. [Bower](http://bower.io/) is used as package manager
- **jspm** : [jspm](http://jspm.io/) is uses as package manager and module loader

Please check the `README.md` file of each branch for specific instructions for each version

### Quick start

Make sure node.js and git are installed

**main branch**

* Clone this repository
* `npm install`
* `./gulp.sh restore`
* `./gulp.sh serve`. A HTTP server will be started on port 8080
* Navigate to `http://localhost:8080`

**jspm branch**

* Clone this repository
* `git checkout jspm`
* `npm install`
* `./jspm.sh install`
* `./gulp.sh restore`
* `./gulp.sh serve`. A HTTP server will be started on port 8080
* Navigate to `http://localhost:8080`

### Main gulp tasks

* `./gulp.sh restore` : Fetches all 3rd-party dependencies from package manager (bower or jspm), fetches type definition files (tsd) and transpiles all typescript code
* `./gulp.sh serve` : Starts HTTP server with server root set to `app` directory
* `./gulp.sh serve --dist` : Starts HTTP server with server root set to `dist` directory (bundled version)
* `./gulp.sh serve --external` : Starts HTTP server and accepts external connections
* `./gulp.sh transpile` : Transpiles all typescript files
* `./gulp.sh test` : Runs all unit tests using [Karma](http://karma-runner.github.io)
* `./gulp.sh coverage` : Runs all unit tests and build a code coverage report at `/test-results/coverage-report`
* `./gulp.sh bundle`: Creates the bundled version for distribution on `dist` directory
* `./gulp.sh package` : Creates a ZIP files containing the bundled version

### Directory structure

```
project
│   README.md [This file]
│   gulpfile.js
│   karma.conf.js [Karma configuration file]
│   tsconfig.json [TypeScript compiler configuration]
│   tsd.json [Definetly typed files]
│   bower.json [Bower packages]
│   bower.sh / gulp.sh / tsd.sh (shell scripts for Bower, Gulp and TSD)
│    
├───src [TypeScript source files]
│   ├───test [Unit tests]
│   ├───lib [Typescript source files provided by bower packages. They are copied from app/bower_dependencies by a gulp task]
│   └───ts [Application code]
|
├───app-typings [TypeScript definition files (.d.ts) written for the application]
├───typings [TypeScript definition files (d.ts) for third-party javascript libraries. Retrieved using tsd]
├───app [Resource files (html, css, images, fonts). Only folder that needs to be served. Includes typescript files from bower components though]
│   ├───transpiled [Output folder for TypeScript transpilation]
│   └───bower_dependencies [Main files of bower packages]
├───dist [Bundled version for distribution. See `gulp bundle`]
├───bower_components [Raw bower packages]
└───test-results [JUnit reporter compatible output of unit tests]
    ├───coverage-report [Code coverage report in HTML format]
    └───<test-suite> [Code coverage report in JSON and XML (Cobertura) format]
```

### Unit tests

Unit tests can be executed via command line using `./gulp.sh test`. To run Karma without gulp use the following commands:

`./node_modules/karma/bin/karma start karma.conf.js --single-run`
`./node_modules/karma/bin/karma start karma.conf.js --single-run --log-level debug` (with debug info)

It is possible to use [QUnit](https://qunitjs.com/) test runner using the following URL:

`http://localhost:<port>/test-runner.html`

### IDE information

*Atom*

The [https://atom.io/packages/atom-typescript](Atom typescript) package supports a `filesGlob` property on `tsconfig.json` that is not supported by TypeScript transpiler. It automatically derives the file names of `files` property based on `filesGlob`

### Useful links

* [tsconfig.json schema](http://json.schemastore.org/tsconfig)
* [Bower registry](http://bower.io/search/)
* [DefinetlyTyped registry](http://definitelytyped.org/tsd/)
* [typescript decorators, issue #249](https://github.com/Microsoft/TypeScript/issues/2249)
* [StackOverflow: How to implement a typescript decorator](http://stackoverflow.com/questions/29775830/how-to-implement-a-typescript-decorator)
* [Decorators & metadata reflection in TypeScript: From Novice to Expert](http://blog.wolksoftware.com/decorators-reflection-javascript-typescript)


### TODO

- [ ] Add Windows shell scripts to Gulp, Bower and TSD
- [ ] Migrate to new-router (https://angular.github.io/router/getting-started)
- [ ] Watch [gotwarlost/istanbul#122](https://github.com/gotwarlost/istanbul/issues/212) for istanbul support for code coverages with source maps. Currently supported by remap-istanbul package
