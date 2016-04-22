var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};


module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['qunit'],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-qunit',
      'karma-junit-reporter',
      'karma-coverage',
      'karma-webpack'
    ],

    files : [
      //'./node_modules/phantomjs-polyfill/bind-polyfill.js',
      //'app/transpiled/test/**/*Test.js'
      'app/transpiled/test/testsBootstrap.js'
    ],

    preprocessors: {
      'app/transpiled/test/testsBootstrap.js' : ['webpack', 'coverage'],
      //'app/transpiled/test/**/*Test.js' : ['webpack', 'coverage']
    },

    webpack : {
      extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.css$/, loader: 'style!css' },
          { test: /\.tsx?$/, loader: 'ts-loader' },
        ]
      }
    },

    webpackMiddleware: {
        // webpack-dev-middleware configuration
        // i. e.
        noInfo: true
    },

    // proxies: {
    //   '/app/transpiled/test': '/base/app/transpiled/test',
    //   '/app/transpiled/': '/base/app/transpiled',
    //   '/jspm_packages/': '/base/app/jspm_packages/'
    // },

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor


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
        {type: 'json', dir:'test-results/'}
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
    singleRun: true
  })
}
