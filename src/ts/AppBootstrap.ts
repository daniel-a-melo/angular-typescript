/// <reference path="../../typings/tsd.d.ts"/>
// Reference path necessary due to command line compilation (TSC)
// Figure out it is only needed on this file and not on the others

module SwapApp {

  let appName : string = 'app';

  angular.module(appName, ['ngRoute']).service("starWarsService", SwapApp.Services.StarWarsService);
  angular.module(appName).constant('_', _);

  angular.module(appName).directive("highLight", SwapApp.Directives.HighlightDirective.Factory());
  angular.module(appName).controller("speciesListController", SwapApp.Controllers.SpeciesListController);
  angular.module(appName).controller("speciesFormController", SwapApp.Controllers.SpeciesFormController);
  angular.module(appName).filter('naFilter', SwapApp.Filters.notApplicableFilter);

  angular.module(appName).config(['$routeProvider', SwapApp.Router.configRouter]);

  angular.element(document).ready(() => angular.bootstrap(document, [appName]));

}
