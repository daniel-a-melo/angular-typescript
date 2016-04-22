/// <reference path="../../app-typings/qunit.d.ts"/>
//Needed only by command line transpiler (TSC)


import 'qunitjs';
import 'qunitjs/qunit/qunit.css';
import './controllers/SpeciesFormControllerTest';
import './controllers/SpeciesListControllerTest';
import './controllers/MenuControllerTest';
import './services/StarWarsServiceTest';
import './filters/NotApplicableFilterTest';

QUnit.load();
//QUnit.start(); //Why needed when loading it using a module loader?
