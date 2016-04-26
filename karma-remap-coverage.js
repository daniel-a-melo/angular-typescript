var fs = require('fs');
var chokidar = require('chokidar');
var loadCoverage = require('remap-istanbul/lib/loadCoverage');
var remap = require('remap-istanbul/lib/remap');
var writeReport = require('remap-istanbul/lib/writeReport');

var RemapCoverageReporter = function (baseReporterDecorator, config, logger, helper, formatError) {

  //baseReporterDecorator(this);

  var pendingExecution = false;
  var executionDone;

  var log = logger.create('reporter.remap-coverage');

  this.onBrowserComplete = function () {

    pendingExecution = true;

    var watcher = chokidar.watch('coverage/json', {
      awaitWriteFinish: {
        stabilityThreshold: 500,
        pollInterval: 100
      }
    }).on('add', function (path) {

      // fs.readFile('coverage/json/coverage-final.json', 'utf8', function(err, data) {
      //   if (err) throw err;
      //   console.log(data);
      //   executionDone();
      // });

      console.log('Will remap');

      var collector = remap(loadCoverage('coverage/json/coverage-final.json'), {
        basePath: 'src/ts'
      });
      
      writeReport(collector, 'html', 'coverage/html').then(function () {
        console.log('Remap complete');
        executionDone();
      });
      // writeReport(collector, 'json', 'coverage/json/coverage-final-remmaped.json').then(function () {
      // });

      watcher.close();

    });

  };

  this.onExit = function (done) {
    if (pendingExecution) {
      executionDone = done;
    } else {
      done();
    }
  };

}

RemapCoverageReporter.$inject = ['baseReporterDecorator', 'config', 'logger', 'helper', 'formatError'];

module.exports = {
  'reporter:remap-coverage': ['type', RemapCoverageReporter]
}
