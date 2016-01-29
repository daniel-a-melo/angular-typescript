# AngularJS 1 with TypeScript sample application

There are two branches on this repo:

- **main** : No module loader is used. [Bower](http://bower.io/) is used as package manager
- **jspm** : [jspm](http://jspm.io/) is used as package manager and module loader

Please check the `README.md` file of each branch for specific instructions for each version

### Quick start

Make sure node.js and git are installed

**main branch**

* Clone this repository
* `npm install`
* `npm run gulp restore`
* `npm run gulp serve`. A HTTP server will be started on port 8080
* Navigate to `http://localhost:8080`

**jspm branch**

* Clone this repository
* `git checkout jspm`
* `npm install`
* `npm run jspm install`
* `npm run gulp restore`
* `npm run gulp serve`. A HTTP server will be started on port 8080
* Navigate to `http://localhost:8080`

### Main gulp tasks

* `npm run gulp restore` : Fetches all 3rd-party dependencies from package manager (bower or jspm), fetches type definition files (tsd) and transpiles all typescript code
* `npm run gulp serve` : Starts HTTP server with server root set to `app` directory
* `npm run gulp serve --dist` : Starts HTTP server with server root set to `dist` directory (bundled version)
* `npm run gulp serve --external` : Starts HTTP server and accepts external connections
* `npm run gulp transpile` : Transpiles all typescript files
* `npm run gulp test` : Runs all unit tests using [Karma](http://karma-runner.github.io)
* `npm run gulp coverage` : Runs all unit tests and build a code coverage report at `/test-results/coverage-report`
* `npm run gulp bundle`: Creates the bundled version for distribution on `dist` directory
* `npm run gulp package` : Creates a ZIP files containing the bundled version

### Directory structure

```
project
│   README.md [This file]
│   gulpfile.js
│   karma.conf.js [Karma configuration file]
│   tsconfig.json [TypeScript compiler configuration]
│   tsd.json [Definetly typed files]
├───src [TypeScript source files]
│   ├───test [Unit tests]
│   └───ts [Application code]
|
├───app-typings [TypeScript definition files (.d.ts) written for the application]
├───typings [TypeScript definition files (d.ts) for third-party javascript libraries. Retrieved using tsd]
├───app [Resource files (html, css, images, fonts). Only folder that needs to be served]
│   ├───transpiled [Output folder for TypeScript transpilation]
│   └───jspm_packages [Packages fetched with jspm]
├───dist [Bundled version for distribution. See `gulp bundle`]
└───test-results [JUnit reporter compatible output of unit tests]
    ├───coverage-report [Code coverage report in HTML format]
    └───<test-suite> [Unit tests coverage report]
```

### Bundling

Run the command below to create the files `build.js` and `build.js.map`

`npm run jspm bundle transpiled/ts/AppInit + transpiled/ts/AppBootstrap + css + text --inject`

The bundle contains the following items:

- All 3rd-party and application JavaScript (except `system.js` and `config.js`)
- All CSS (bundled into `build.js`)
- All HTML fragments (bundled into `build.js`), except `header.html` and `footer.html`

The command below will undo the bundling:

`npm run jspm unbundle`

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
* [jspm registry](http://kasperlewau.github.io/registry/#/)
* [DefinetlyTyped registry](http://definitelytyped.org/tsd/)
* [typescript decorators, issue #249](https://github.com/Microsoft/TypeScript/issues/2249)
* [StackOverflow: How to implement a typescript decorator](http://stackoverflow.com/questions/29775830/how-to-implement-a-typescript-decorator)
* [Decorators & metadata reflection in TypeScript: From Novice to Expert](http://blog.wolksoftware.com/decorators-reflection-javascript-typescript)
* [How to start writing apps with ES6, Angular 1.x and JSPM](http://martinmicunda.com/2015/02/09/how-to-start-writing-apps-with-es6-angular-1x-and-jspm/)


### TODO

- [ ] Implement `restore` task
- [ ] Implement `bundle` and `package` task
- [ ] Check bootstrap fonts bundling (https://github.com/systemjs/builder/issues/166 and https://github.com/systemjs/plugin-css/issues/61)
- [ ] Add support for source map in test coverage tool. See [gotwarlost/istanbul#122](https://github.com/gotwarlost/istanbul/issues/212)
- [ ] Turn the decorators `@at.config`, `@at.filter`, `@at.directiveFactory` strongly typed. [https://github.com/ulfryk/angular-typescript] [http://bit.ly/1HYaQw2]

### Questions/issues

- When using FF with firebug cannot load SystemJS or AMD modules (https://github.com/systemjs/systemjs/issues/835)
- How can I config that all modules of a package should be loaded with text plugin?
- How can I invoke JSPM bundle from Gulp?
