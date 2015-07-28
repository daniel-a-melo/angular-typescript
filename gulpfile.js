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
  get dependenciesSource() { return this.runtimeFilesBase + '/bower_dependencies/**/ts/*.ts' },
  runtimeFilesBase : 'app', //Directory where served files are stored (html, images, css, fonts, javascript (transpiled or third-party))
  get output() { return this.runtimeFilesBase + '/transpiled' }, //Output dir for transpiled TypeScript
  get sourcePath() { return [this.dependenciesSource, this.baseSource +  '/**/*.ts']}, //GLOB for TypeScript sources
  //html : './*.html',
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

// Fetch all bower dependencies, copies its main files into ${appPaths.runtimeFilesBase}/bower_dependencies and fetches all TSD files
gulp.task('fetch-all-dependencies', ['normalize-bower-components', 'tsd-install']);


function doTranspilation(done) {
  var tsProject = ts.createProject('tsconfig.json', { typescript: require('typescript'), inlineSourceMap : false});
  var tsResult = gulp.src(appPaths.sourcePath)
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  return tsResult.js
    .pipe(sourcemaps.write({sourceRoot: '../' + appPaths.baseSource + '/'}))
    .pipe(gulp.dest(appPaths.output));
}


// Transpile typescript
gulp.task('transpile', doTranspilation);

// Fetch all dependencies (bower, tsd) and then transpiles typescript
gulp.task('restore', ['fetch-all-dependencies'], doTranspilation);

// Transpiles typescript and run unit tests using Karma
gulp.task('test', ['transpile'],  function(done) {
  server = new KarmaServer({
    configFile : __dirname + '/karma.conf.js',
    singleRun : true
  }, done);

  server.start();
});

// Starts HTTP server with root dir being  ${appPaths.runtimeFilesBase}
// gulp serve --dist will set root dir to ${appPaths.distributionPath}
gulp.task('serve', function(done) {

    var rootDir = './' + (argv.dist ? appPaths.distributionPath : appPaths.runtimeFilesBase);

    var serverOptions = {
      host: '0.0.0.0',
      port: 8080,
      cors : true,
      root : rootDir,
      cache : -1,
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
    return gulp.src(appPaths.resourcesFilesPath)
      .pipe(gulp.dest(appPaths.distributionPath));

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
