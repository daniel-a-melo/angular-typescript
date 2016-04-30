import 'angular-route';
import {mainModule} from './App';

//@at.config(SwapApp.mainModule, ['$routeProvider'])
export class RoutesConfig {
  static config(routeProvider: ng.route.IRouteProvider) {

    routeProvider.
      when('/species', { controller : 'speciesListController', controllerAs : 'ctrl', template : require<string>('../html/speciesList.html')}).
      when('/species/add', { controller : 'speciesFormController', controllerAs : 'ctrl', template : require<string>('../html/speciesForm.html')}).
      otherwise({redirectTo : '/species'});
  }
}

angular.module(mainModule).config(['$routeProvider', RoutesConfig.config]);
