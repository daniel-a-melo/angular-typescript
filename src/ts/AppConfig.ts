/// <reference path="../../typings/tsd.d.ts"/>
// Reference path necessary due to command line compilation (TSC)
// Figure out it is only needed on this file and not on the others

module SwapApp {

  export var mainModule : string = 'app';

  angular.module(mainModule, ['ngRoute']); //Creates the main module
  angular.module(mainModule).constant('_', _); //Adding lodash globas as angular constant to facilitate unit testing

}
