import 'qunitjs';
import 'qunitjs/qunit/qunit.css';
import '../ts/AppConfig';

var testsContext = require.context('.', true, /Test$/);
testsContext.keys().forEach(testsContext);

QUnit.load();
//QUnit.start(); //Why needed when loading it using a module loader?
