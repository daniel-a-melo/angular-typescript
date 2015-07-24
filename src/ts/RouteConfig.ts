module SwapApp.Router {

  export function configRouter(routeProvider: ng.route.IRouteProvider) {
    routeProvider.
      when('/species', { controller : 'speciesListController', controllerAs : 'ctrl', templateUrl : 'partials/speciesList.html'}).
      when('/species/add', { controller : 'speciesFormController', controllerAs : 'ctrl', templateUrl : 'partials/speciesForm.html'}).
      otherwise({redirectTo : '/species'});
  }

}
