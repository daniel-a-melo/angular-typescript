module SwapApp.Controllers {

  import ISpecies = SwapApp.Domain.ISpecies;
  import log = SwapApp.Decorators.log;

  @at.controller(SwapApp.mainModule, 'speciesFormController')
  export class SpeciesFormController {

    species : ISpecies;
    message : string = '';

    constructor(@at.inject('$scope') $scope : ng.IScope) {}

    @log
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

}
