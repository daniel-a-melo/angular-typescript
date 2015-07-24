module SwapApp.Services {

  import SpeciesResult = SwapApp.Domain.ISpeciesResult;

  export class StarWarsService extends BaseService  {

    static $inject = ['$q', '$http'];
    private static BASE_URL : string = 'http://swapi.co/api';

    constructor($q: ng.IQService, $http: ng.IHttpService) {
      super($q, $http);
     }

    readSpecies() : ng.IPromise<SpeciesResult> {
      return this.getServiceData<SpeciesResult>(StarWarsService.BASE_URL + '/species/');
    }
    
  }

}
