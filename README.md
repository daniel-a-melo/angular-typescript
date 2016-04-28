# AngularJS 1 with TypeScript sample application

There are two branches on this repo:

- **main** : No module loader is used. [Bower](http://bower.io/) is used as package manager
- **jspm** : [jspm](http://jspm.io/) is used as package manager and module loader/bundler
- **webpack** : [webpack](http://webpack.github.io/) is used as module loader/bundler and [npm](https://www.npmjs.com/) as package manager

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

**webpack branch** (in progress)

* Clone this repository
* `git checkout webpack`
* `npm install`
* `npm run dev`. A HTTP server will be started on port 8080
* Navigate to `http://localhost:8080`


### Directory structure

```
project
│   README.md [This file]
│   webpack.config.js
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
└───test-results [JUnit reporter compatible output of unit tests]
    ├───coverage-report [Code coverage report in HTML format]
    └───<test-suite> [Unit tests coverage report]
```

### Bundling


### Unit tests


### IDE information

*Atom*

The [https://atom.io/packages/atom-typescript](Atom typescript) package supports a `filesGlob` property on `tsconfig.json` that is not supported by TypeScript transpiler. It automatically derives the file names of `files` property based on `filesGlob`

### Useful links

* [React webpack cookbook](https://christianalfoni.github.io/react-webpack-cookbook/index.html)
* [tsconfig.json schema](http://json.schemastore.org/tsconfig)
* [jspm registry](http://kasperlewau.github.io/registry/#/)
* [DefinetlyTyped registry](http://definitelytyped.org/tsd/)
* [typescript decorators, issue #249](https://github.com/Microsoft/TypeScript/issues/2249)
* [StackOverflow: How to implement a typescript decorator](http://stackoverflow.com/questions/29775830/how-to-implement-a-typescript-decorator)
* [Decorators & metadata reflection in TypeScript: From Novice to Expert](http://blog.wolksoftware.com/decorators-reflection-javascript-typescript)
* [How to start writing apps with ES6, Angular 1.x and JSPM](http://martinmicunda.com/2015/02/09/how-to-start-writing-apps-with-es6-angular-1x-and-jspm/)


### TODO

- [ ] Add QUnit and Karma support
- [ ] Check how to bundle web fonts
- [ ] Add support for source map in test coverage tool. See [gotwarlost/istanbul#122](https://github.com/gotwarlost/istanbul/issues/212)
- [ ] Turn the decorators `@at.config`, `@at.filter`, `@at.directiveFactory` strongly typed. [https://github.com/ulfryk/angular-typescript] [http://bit.ly/1HYaQw2]


### Questions/issues
