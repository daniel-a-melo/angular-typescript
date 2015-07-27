// Karma configuration
// Generated on Wed Jul 22 2015 16:03:58 GMT-0300 (BRT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['qunit'],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-firefox-launcher',
      'karma-qunit',
      'karma-junit-reporter',
      'karma-coverage'
    ],

    // list of files / patterns to load in the browser


    files: [
      'app/bower_dependencies/angular/js/*.js',
      'app/bower_dependencies/angular-route/js/*.js',
      'app/bower_dependencies/lodash/js/*.js',
      'app/transpiled/ts/AppConfig.js',
      'app/transpiled/ts/decorators/LogDecorator.js',
      'app/transpiled/ts/decorators/at-angular.js',
      'app/transpiled/ts/services/BaseService.js',
      'app/transpiled/ts/services/StarWarsService.js',
      'app/transpiled/ts/controllers/SpeciesFormController.js',
      'app/transpiled/ts/controllers/SpeciesListController.js',
      'app/transpiled/ts/directives/HighlightDirective.js',
      'app/transpiled/ts/filters/NotApplicableFilter.js',
      'app/transpiled/ts/RouteConfig.js',
      'app/transpiled/ts/AppBootstrap.js',
      'app/transpiled/test/**/*Test.js',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/transpiled/ts/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'dots', 'junit', 'coverage'],

    junitReporter: {
       outputDir: './test-results', // results will be saved as $outputDir/$browserName.xml
       outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
       suite: ''
     },

     coverageReporter: {
       reporters:[
        {type: 'html', dir:'test-results/'},
        {type: 'cobertura', dir:'test-results/'},
      ]
     },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
