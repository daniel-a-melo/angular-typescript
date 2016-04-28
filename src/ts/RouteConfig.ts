/// <reference path="../../app-typings/app.d.ts"/>

import 'angular-route';
import {mainModule} from './AppConfig';
//import * as speciesFormTemplate from 'raw!../../app/partials/speciesForm.html';
// import * as speciesFormTemplate from 'raw!../html/partials/speciesForm.html';
// import * as speciesListTemplate from 'raw!../html/app/partials/speciesList.html';
//@at.config(SwapApp.mainModule, ['$routeProvider'])
export class RoutesConfig {
  static config(routeProvider: ng.route.IRouteProvider) {

    routeProvider.
      when('/species', { controller : 'speciesListController', controllerAs : 'ctrl', template : <string>require('raw!../html/speciesList.html')}).
      when('/species/add', { controller : 'speciesFormController', controllerAs : 'ctrl', template : <string>require('raw!../html/speciesForm.html')}).
      otherwise({redirectTo : '/species'});
  }
}

angular.module(mainModule).config(['$routeProvider', RoutesConfig.config]);
