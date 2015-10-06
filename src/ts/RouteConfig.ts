/// <reference path="../../app-typings/app.d.ts"/>

import 'angular-route';
import {mainModule} from './AppConfig';
import * as speciesFormTemplate from 'partials/speciesForm.html!text';
import * as speciesListTemplate from 'partials/speciesList.html!text';

//@at.config(SwapApp.mainModule, ['$routeProvider'])
export class RoutesConfig {
  static config(routeProvider: ng.route.IRouteProvider) {

    routeProvider.
      when('/species', { controller : 'speciesListController', controllerAs : 'ctrl', template : speciesListTemplate}).
      when('/species/add', { controller : 'speciesFormController', controllerAs : 'ctrl', template : speciesFormTemplate}).
      otherwise({redirectTo : '/species'});
  }
}

angular.module(mainModule).config(['$routeProvider', RoutesConfig.config]);
