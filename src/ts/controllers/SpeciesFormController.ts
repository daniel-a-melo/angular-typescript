import {ISpecies} from '../domain/SpeciesResult';
import {log} from '../decorators/LogDecorator';
import {mainModule} from '../AppConfig';


//@at.controller(SwapApp.mainModule, 'speciesFormController')
export class SpeciesFormController {

  static $inject = ['$scope'];
  species : ISpecies;
  message : string = '';

  constructor($scope : ng.IScope) {}

  //@log
  save() : void {

      if (this.species && this.species.name === 'error') {
        throw new Error('Erronenous species name entered');
      }

      if (this.species) {
        this.message = `Thanks for entering the species ${this.species.name}. However, this API is read-only. Sorry :)`;
      } else {
        this.message = 'Empty species huh? Fine because this API is read-only! :)';
      }

    }




}

angular.module(mainModule).controller('speciesFormController', SpeciesFormController);
