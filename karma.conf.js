// var webpackConfig = require('./webpack.config.js');
// webpackConfig.entry = {};


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
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-remap-istanbul',
      require('./karma-remap-coverage.js')
    ],

    files : [
      //'./node_modules/phantomjs-polyfill/bind-polyfill.js',
      //'app/transpiled/test/**/*Test.js',
      //'app/transpiled/test/testsBootstrap.js',
      './src/ts/AppConfig.ts',
      './src/test/**/*Test.ts'
    ],

    preprocessors: {
      //'app/transpiled/test/testsBootstrap.js' : ['webpack', 'sourcemap'],
      //'app/transpiled/test/testsBootstrap.js' : ['webpack', 'sourcemap',  'coverage'],
      //'app/transpiled/test/**/*Test.js' : ['webpack', 'sourcemap']
      'src/ts/AppConfig.ts' : ['webpack'],
      'src/test/**/*Test.ts' : ['webpack' /*, 'sourcemap'*/]
    },

    webpack : {
      resolve : {
        extensions: ['', '.js', '.ts'],
      },
      //extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.css$/, loader: 'style!css' },
          { test: /\.tsx?$/, loader: 'ts-loader' },
        ],
        postLoaders : [
          //{ test: /\.js$/, exclude: /(__tests__|node_modules|legacy)\//, loader: 'istanbul-instrumenter' }
          { test: /\.ts$/, exclude: /(test|node_modules|legacy)\//, loader: 'istanbul-instrumenter' }
        ]
      },

      ts : {
        compilerOptions : {
          sourceMap : false,
          sourceRoot : 'src',
          inlineSourceMap : true
        }
      }

    },

    webpackMiddleware: {
        // webpack-dev-middleware configuration
        // i. e.
        noInfo: true
    },

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'junit', 'coverage', 'remap-coverage'],

    junitReporter: {
       outputDir: './test-results', // results will be saved as $outputDir/$browserName.xml
       outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
       suite: ''
     },

     coverageReporter: {
       reporters:[
        {type: 'cobertura', dir:'test-results', subdir : 'coverage/cobertura', file : 'cobertura-coverage.xml'},
        {type: 'json', dir:'test-results' , subdir : 'coverage/json', file : 'coverage-final.json'}
      ]
     },

     remapCoverageReporter : {
       srcDir : 'test-results/coverage/json',
       srcFile : 'coverage-final.json',
       htmlOutput : 'test-results/coverage/html'
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
