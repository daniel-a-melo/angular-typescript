import 'angular-route';
import {mainModule} from './AppConfig';


//@at.config(SwapApp.mainModule, ['$routeProvider'])
export class RoutesConfig {
  static config(routeProvider: ng.route.IRouteProvider) {
    routeProvider.
      when('/species', { controller : 'speciesListController', controllerAs : 'ctrl', templateUrl : 'partials/speciesList.html'}).
      when('/species/add', { controller : 'speciesFormController', controllerAs : 'ctrl', templateUrl : 'partials/speciesForm.html'}).
      otherwise({redirectTo : '/species'});
  }
}

angular.module(mainModule).config(['$routeProvider', RoutesConfig.config]);
