module SwapApp.Controllers {

  import StarWarsService = SwapApp.Services.StarWarsService;
  import ISpeciesResult = SwapApp.Domain.ISpeciesResult;
  import ISpecies = SwapApp.Domain.ISpecies;

  export class SpeciesListController {

    public static $inject = ['$scope', '_', 'starWarsService'];

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

}
