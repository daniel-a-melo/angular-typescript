import {BaseService} from './BaseService';
import {ISpeciesResult} from '../domain/SpeciesResult';
import {mainModule} from '../App';
import {service, inject} from '../decorators/at-angular';

@service(mainModule, 'starWarsService')
@inject('$q', '$http')
export class StarWarsService extends BaseService  {

  //static $inject = ['$q', '$http'];
  private static BASE_URL : string = 'https://swapi.co/api';

  constructor($q: ng.IQService, $http: ng.IHttpService) {
    super($q, $http);
   }

  readSpecies() : ng.IPromise<ISpeciesResult> {
    return this.getServiceData<ISpeciesResult>(StarWarsService.BASE_URL + '/species/');
  }

}

//angular.module(mainModule).service('starWarsService', StarWarsService);
