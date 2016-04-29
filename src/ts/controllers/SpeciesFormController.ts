import {ISpecies} from '../domain/SpeciesResult';
import {log} from '../decorators/LogDecorator';
import {mainModule} from '../App';
import {controller, inject} from '../decorators/at-angular';


@controller(mainModule, 'speciesFormController')
@inject('$scope')
export class SpeciesFormController {

  species : ISpecies;
  message : string = '';

  constructor($scope : ng.IScope) {}

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
