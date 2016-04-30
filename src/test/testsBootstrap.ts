import 'qunitjs';
import 'qunitjs/qunit/qunit.css';
import 'angular';
import 'angular-mocks';
import '../ts/AppConfig';

var templateModules = angular.module('app-templates', []);

var testsContext = require.context('.', true, /Test$/);
testsContext.keys().forEach(testsContext);

templateModules.run(['$templateCache', ($templateCache : ng.ITemplateCacheService) => {
  var templatesContext = require.context('../html', true, /\.html$/);
  templatesContext.keys().forEach(value => {
    $templateCache.put(value.slice(2), templatesContext(value) );
  });
}]);

QUnit.load();
//QUnit.start(); //Why needed when loading it using a module loader?
