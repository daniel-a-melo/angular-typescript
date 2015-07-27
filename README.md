# AngularJS 1.X with TypeScript 1.5 sample application

### Quick start

Make sure node.js and git is installed

* Run `npm install`
* Run `gulp restore`
* Run `gulp serve`. A HTTP server will be started on port 8080 (or the next port available)
* Navigate to `http://localhost<port>`

### Main gulp tasks

* `gulp restore` : Runs `bower install`, `tsd reinstall`, copies main files of each bower package to `app/bower_dependencies` and transpiles all TypeScript files
* `gulp serve` : Starts HTTP server with server root set to `app` directory
* `gulp serve --dist` : Starts HTTP server with server root set to `dist` directory (bundled version)
* `gulp transpile` : Transpiles all TypeScript files
* `gulp test` : Runs all unit tests using [Karma](http://karma-runner.github.io)
* `gulp bundle`: Creates the bundled version for distribution on `dist` directory. Bundled version consists of concatenated javascript files `vendor.js` and ` app.js`
* `gulp package` : Creates a ZIP files containing the bundled version

### Directory structure

```
project
│   README.md [This file]
│   gulpfile.js
│   karma.conf.js [Karma configuration file]
│   tsconfig.json [TypeScript compiler configuration]
│   tsd.json [Definetly typed files]
│   bower.json [Bower packages]
└───src [TypeScript source files]
│   ├───test [Unit tests]
│   └───ts [Application code]
└───app-typings [TypeScript definition files (.d.ts) written for the application]
└───typings [TypeScript definition files (d.ts) for third-party javascript libraries. Retrieved using tsd]
└───app [Resource files (html, css, images, fonts). Only folder that needs to be served]
│   ├───transpiled [Output folder for TypeScript transpilation]
│   └───bower_dependencies [Main files of bower packages]
└───dist [Bundled version for distribution. See `gulp bundle`]
└───bower_components [Raw bower packages]
└───test-results [JUnit reporter compatible output of unit tests]
    └───<test-suite> [Unit tests coverage report]
```

### Unit tests

Unit tests can be executed via command line using `gulp test`. To run Karma without gulp use the following commands:

`./node_modules/karma/bin/karma start karma.conf.js --single-run`
`./node_modules/karma/bin/karma start karma.conf.js --single-run --log-level debug` (with debug)

It is possible to use [QUnit](https://qunitjs.com/) test runner using the following URL:

`http://localhost:<port>/test-runner.html`

### IDE information

*Atom*

The [https://atom.io/packages/atom-typescript](Atom typescript) package supports a `filesGlob` property on `tsconfig.json` that is not supported by TypeScript transpiler. It automatically derives the file names of `files` property based on `filesGlob`

### Useful links

* [tsconfig.json schema](http://json.schemastore.org/tsconfig)
* [Bower registry](http://bower.io/search/)
* [DefinetlyTyped registry](http://definitelytyped.org/tsd/)


### TODO

- [ ] Add support for modules (JSPM)
- [ ] Add support for source map in test coverage tool. See [gotwarlost/istanbul#122](https://github.com/gotwarlost/istanbul/issues/212)
- [ ] Use angular 1.x decorators [https://github.com/ulfryk/angular-typescript]
- [ ] Check [SinonJS](http://sinonjs.org)
