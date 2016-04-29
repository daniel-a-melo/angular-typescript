import * as angular from 'angular';
import * as _ from 'lodash';
import 'angular-route';
import 'angular-loading-bar';
import {mainModule} from './App';

angular.module(mainModule, ['ngRoute', 'angular-loading-bar']); //Creates the main module
angular.module(mainModule).constant('_', _); //Adding lodash globas as angular constant to facilitate unit testing
