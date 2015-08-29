import {StarWarsService} from '../services/StarWarsService';
import {ISpeciesResult, ISpecies} from '../domain/SpeciesResult';
import {mainModule} from '../AppConfig';


export class SpeciesListController {

  static $inject = ['$scope', '_', 'starWarsService'];
  private starWarsService : StarWarsService;
  public speciesList : ISpecies[];


  constructor($scope : ng.IScope, _ : _.LoDashStatic, starWarsService : StarWarsService) {
    this.starWarsService = starWarsService;
    this.readSpecies();
    console.log(`Lodash version : ${_.VERSION}`);
  }

  readSpecies() : void {
    this.starWarsService.readSpecies().then(( resolution : ISpeciesResult) => this.speciesList = resolution.results);
  }

}

angular.module(mainModule).controller('speciesListController', SpeciesListController);
