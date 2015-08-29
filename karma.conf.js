// Karma configuration
// Generated on Wed Jul 22 2015 16:03:58 GMT-0300 (BRT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jspm','qunit'],

    plugins: [
      'karma-jspm',
      'karma-phantomjs-launcher',
      'karma-firefox-launcher',
      'karma-qunit',
      'karma-junit-reporter',
      'karma-coverage'
    ],

    jspm: {
        // Edit this to your needs
        loadFiles: ['app/transpiled/test/**/*Test.js'],
        serveFiles: ['app/transpiled/**/*.+(js|html|css|json)']
    },


    proxies: {
      '/app/transpiled/test': '/base/app/transpiled/test',
      '/app/transpiled/': '/base/app/transpiled',
      '/jspm_packages/': '/base/app/jspm_packages/'
    },

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
    reporters: ['dots', 'junit', 'coverage'],

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
