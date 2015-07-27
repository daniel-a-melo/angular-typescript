module SwapApp.Controllers {

  import StarWarsService = SwapApp.Services.StarWarsService;
  import ISpeciesResult = SwapApp.Domain.ISpeciesResult;
  import ISpecies = SwapApp.Domain.ISpecies;

  @at.controller(SwapApp.mainModule, 'speciesListController')
  @at.inject('$scope', '_', 'starWarsService')
  export class SpeciesListController {

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
