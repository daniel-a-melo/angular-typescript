var gulp = require('gulp');
var colors = require('colors')
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var KarmaServer = require('karma').Server;
var httpServer = require('http-server');
var useref = require('gulp-useref');
var argv = require('yargs').argv;
var zip = require('gulp-zip');
var replace = require('gulp-replace');
var bower = require('bower');
var tsd = require('gulp-tsd');


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

// Invokes bower install
gulp.task('bower-install', function (done) {

  bower.commands.install([], {save: true}, {})
    .on('end', function(installed){
      done();
    });

});

// Invokes tsd reinstall
gulp.task('tsd-install', function (done) {
    tsd({
        command: 'reinstall',
        config: './tsd.json'
    }, done);
});

// Copies the files listed under main of each bower package into ${appPaths.runtimeFilesBase}/bower_dependencies
// Check bower.json for overrides of main files
gulp.task('normalize-bower-components', ['bower-install'], function(done) {
    var bower = require('main-bower-files');
    var bowerNormalizer = require('gulp-bower-normalize');
    return gulp.src(bower(), {base: './bower_components'})
        .pipe(bowerNormalizer({bowerJson: './bower.json'}))
        .pipe(gulp.dest('./' + appPaths.runtimeFilesBase + '/bower_dependencies/'))
});

// Copies the typescript files distributed by bower packages to the
gulp.task('copy-bower-ts-sources', ['normalize-bower-components'],  function(done) {
  return gulp.src(['./app/bower_dependencies/**/ts/*.ts'])
          .pipe(gulp.dest('./' + appPaths.tsLibrariesSource));
});

// Fetch all bower dependencies, copies its main files into ${appPaths.runtimeFilesBase}/bower_dependencies and fetches all .d.ts files
gulp.task('fetch-all-dependencies', ['copy-bower-ts-sources', 'tsd-install']);


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

// Concats all transpiled javascript files into  ${appPaths.distributionPath}/vendor.js (third-party libs) and
// ${appPaths.distributionPath}/app.js (transpiled application files)
gulp.task('bundle-resources', function(done) {

  var assets = useref.assets();

  return gulp.src(appPaths.htmlFilesPath)
      .pipe(assets)
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest(appPaths.distributionPath));


});

// Copy all resource files (images, css, fonts) from ${appPaths.runtimeFilesBase} to ${appPaths.distributionPath}
gulp.task('copy-resource-files', function (done) {
    gulp.src(appPaths.resourcesFilesPath)
      .pipe(gulp.dest(appPaths.distributionPath));

    gulp.src(appPaths.runtimeFilesBase + '/bower_dependencies/bootstrap/fonts/*.*')
        .pipe(gulp.dest(appPaths.distributionPath + '/fonts'));

    done();

});

// Replaces the tag ${version} on ${appPaths.distributionPath}/index.html to the version configured on package.json
gulp.task('replace-version', ['bundle-resources'], function (done) {
  var packageFile = require('./package.json');
  return gulp.src(appPaths.distributionPath + '/index.html')
        .pipe(replace('${version}', packageFile.version))
        .pipe(gulp.dest(appPaths.distributionPath));
});


// Generates bundled version for distribuition on ${appPaths.distributionPath}
// See tasks 'bundle-resource' and 'replace-version'
gulp.task('bundle', ['copy-resource-files', 'replace-version'], function() {

});

// Generates a ZIP files with distribution bundled version
// See task 'bundle'
gulp.task('package', function (done) {

    var packageFile = require('./package.json');

    return gulp.src(appPaths.distributionPath + '/*')
        .pipe(zip(packageFile.name + '-' + packageFile.version + '.zip'))
        .pipe(gulp.dest(appPaths.distributionPath));

});
