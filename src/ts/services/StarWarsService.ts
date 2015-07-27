module SwapApp.Services {

  import SpeciesResult = SwapApp.Domain.ISpeciesResult;

  @at.service(SwapApp.mainModule, 'starWarsService')
  export class StarWarsService extends BaseService  {

    private static BASE_URL : string = 'http://swapi.co/api';

    constructor(@at.inject('$q') $q: ng.IQService, @at.inject('$http') $http: ng.IHttpService) {
      super($q, $http);
     }

    readSpecies() : ng.IPromise<SpeciesResult> {
      return this.getServiceData<SpeciesResult>(StarWarsService.BASE_URL + '/species/');
    }

  }

}
