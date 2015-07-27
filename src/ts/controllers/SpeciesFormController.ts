module SwapApp.Controllers {

  import ISpecies = SwapApp.Domain.ISpecies;
  import log = SwapApp.Decorators.log;

  export class SpeciesFormController {

    public static $inject = ['$scope'];

    species : ISpecies;
    message : string = '';

    constructor($scope : ng.IScope) {}

    @log
    save() : void {

      if (this.species.name === 'error') {
        throw new Error('Erronenous species name entered');
      }

      this.message = `Thanks for entering the species ${this.species.name}. However, this API is read-only. Sorry :)`;
    }

  }

}
