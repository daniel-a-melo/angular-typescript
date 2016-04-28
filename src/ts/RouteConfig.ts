/// <reference path="../../app-typings/app.d.ts"/>

import 'angular-route';
import {mainModule} from './AppConfig';

//@at.config(SwapApp.mainModule, ['$routeProvider'])
export class RoutesConfig {
  static config(routeProvider: ng.route.IRouteProvider) {

    routeProvider.
      when('/species', { controller : 'speciesListController', controllerAs : 'ctrl', template : require<string>('raw!../html/speciesList.html')}).
      when('/species/add', { controller : 'speciesFormController', controllerAs : 'ctrl', template : require<string>('raw!../html/speciesForm.html')}).
      otherwise({redirectTo : '/species'});
  }
}

angular.module(mainModule).config(['$routeProvider', RoutesConfig.config]);
