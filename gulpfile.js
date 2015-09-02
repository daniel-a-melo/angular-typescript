var gulp = require('gulp');
var colors = require('colors')
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var KarmaServer = require('karma').Server;
var httpServer = require('http-server');
var useref = require('gulp-useref');
var argv = require('yargs').argv;
var replace = require('gulp-replace');
var tsd = require('gulp-tsd');
var jspm = require('jspm');


var appPaths = {
  baseSource : 'src', //TypeScript source file root
  get tsLibrariesSource () { return this.baseSource + '/lib' }, //TypeScript bower dependencies that need to be transpiled
  runtimeFilesBase : 'app', //Directory where served files are stored (html, images, css, fonts, javascript (transpiled or third-party))
  get output() { return this.runtimeFilesBase + '/transpiled' }, //Output dir for transpiled TypeScript
  get sourcePath() { return [this.baseSource +  '/**/*.ts']}, //GLOB for TypeScript sources
  distributionPath : 'dist', //Directory for bundled verion of application
  get htmlFilesPath() { return [this.runtimeFilesBase + '/**/*.html'] }, //GLOB for html files that will be processed during bundling
  get resourcesFilesPath() { return [this.runtimeFilesBase + '/**/*.png', this.runtimeFilesBase + '/**/*.ico'] } //GLOB for resource files that will be processed during bundling
};

// Invokes tsd reinstall
gulp.task('tsd-install', function (done) {
    tsd({
        command: 'reinstall',
        config: './tsd.json'
    }, done);
});

// Fetch all bower dependencies, copies its main files into ${appPaths.runtimeFilesBase}/bower_dependencies and fetches all .d.ts files
gulp.task('fetch-all-dependencies', ['tsd-install']);


function doTranspilation(done) {
  var tsProject = ts.createProject('tsconfig.json', { typescript: require('typescript'), inlineSourceMap : false});
  var tsResult = gulp.src(appPaths.sourcePath)
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  return tsResult.js
    .pipe(sourcemaps.write({includeContent: true, debug: true}))
    .pipe(gulp.dest(appPaths.output));
}


// Transpile typescript
gulp.task('transpile', doTranspilation);

// Fetch all dependencies (bower, definetly typed) and then transpiles typescript
gulp.task('restore', ['fetch-all-dependencies'], doTranspilation);

// Watches changes on typescript files and triggers transpilation

//Note: Live reload only works if your HTML file has a <body> tag
gulp.task('watch', function() {

  gulp.watch([appPaths.sourcePath, appPaths.tsLibrariesSource], ['transpile']).on('change', reportChange);

  function reportChange(event){
    console.log('File ' + event.path + ' was ' + event.type + ', running transpilation');
  }

});

// Transpiles typescript and run unit tests using Karma
gulp.task('test', ['transpile'],  function(done) {
  var karmaOptions = {
    configFile : __dirname + '/karma.conf.js',
    singleRun : true
  };

  if (argv.browsers) {
    karmaOptions.browsers = argv.browsers.split(',');
  }

  server = new KarmaServer(karmaOptions, done);

  server.start();
});

//Source: http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
function findCurrentIPAddress() {

  var os = require('os');
  var ifaces = os.networkInterfaces();
  var address;

  Object.keys(ifaces).forEach(function (ifname) {

    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      } else {
        address = iface.address;
      }
    });
  });

  return address;

}

// Starts HTTP server with root dir being  ${appPaths.runtimeFilesBase}
// gulp serve --dist will set root dir to ${appPaths.distributionPath}
// gulp serve --external will accept external connections
gulp.task('serve', function(done) {

    var rootDir = './' + (argv.dist ? appPaths.distributionPath : appPaths.runtimeFilesBase);
    var hostAddress = '0.0.0.0';
    var proxyAddress = undefined;

    var ipAddress;
    if (argv.external) {
      ipAddress = findCurrentIPAddress();
      if (ipAddress !== undefined) {
        hostAddress = ipAddress;
      } else {
        console.log('Unable to obtain IP address');
      }
    }

    if (typeof(argv.proxy) === 'number') {
      proxyAddress = 'http://localhost:' + argv.proxy.toString();
    }

    var serverOptions = {
      host: hostAddress,
      port: 8080,
      cors : true,
      root : rootDir,
      cache : -1,
      proxy : proxyAddress,
      logFn: requestLogger
    }

    function requestLogger(req, res, error) {
      var date = (new Date).toUTCString();
      if (error) {
        log('[%s] "%s %s" Error (%s): "%s"', date, req.method.red, req.url.red, error.status.toString().red, error.message.red);
      } else {
        log('[%s] "%s %s" "%s"', date, req.method.cyan, req.url.cyan, req.headers['user-agent']);
      }
    };

    var s = httpServer.createServer(serverOptions);
    s.listen(serverOptions.port, serverOptions.host);

    log('Starting up http-server, serving '.yellow
      + serverOptions.root.cyan
      + ' on: '.yellow
      + (serverOptions.host + ':' + serverOptions.port).cyan);

      if (serverOptions.proxy !== undefined) {
        log('Unknown requests being proxied to '.yellow + (serverOptions.proxy).cyan);
      }

});

// Replaces the tag ${version} on ${appPaths.distributionPath}/index.html to the version configured on package.json
gulp.task('replace-version', ['bundle-resources'], function (done) {
  var packageFile = require('./package.json');
  return gulp.src(appPaths.distributionPath + '/index.html')
        .pipe(replace('${version}', packageFile.version))
        .pipe(gulp.dest(appPaths.distributionPath));
});


gulp.task('bundle', function (done) {

  //jspm bundle transpiled/ts/AppInit + transpiled/ts/AppBootstrap + css --inject

  //jspm.setPackagePath('.');
  return jspm.bundle('transpiled/ts/AppInit + transpiled/ts/AppBootstrap + css', 'build.js', { inject: true });

});
