var fs = require('fs');
var path = require('path');
var chokidar = require('chokidar');
var remapIstanbul = require('remap-istanbul');

var RemapCoverageReporter = function (baseReporterDecorator, config, logger, helper, formatError) {

  //baseReporterDecorator(this);

  var remapCoverageReporterConfig = config.remapCoverageReporter || {};
  var sourceDir = remapCoverageReporterConfig.srcDir;
  var sourceFile = remapCoverageReporterConfig.srcFile;
  var sourceFilePath = path.join(sourceDir, sourceFile);
  var htmlOutput = remapCoverageReporterConfig.htmlOutput;

  var pendingExecution = false;
  var executionDone;

  var log = logger.create('reporter.remap-coverage');

  this.onBrowserComplete = function () {

    pendingExecution = true;

    var watcher = chokidar.watch(sourceDir, {
      awaitWriteFinish: {
        stabilityThreshold: 500,
        pollInterval: 100
      }
    }).on('add', function (path) {

      log.info('Remapping ' + sourceFilePath + ' using source maps');

      remapIstanbul(sourceFilePath, { html : htmlOutput  }).then(
        function (response) { completeExecution(); },
        function (errorResponse) { log.warn(errorResponse); completeExecution(); }
      );

      watcher.close();

    });

  };

  function completeExecution() {
    log.info('Remapping of ' + sourceFilePath + ' complete');
    executionDone();
  }

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
