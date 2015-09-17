namespace SwapApp.Domain {

    export interface ISpecies {
      name : string;
      classification : string;
      designation: string;
      average_height : string;
      skin_colors : string;
      hair_colors : string;
      eye_colors : string;
      average_lifespan : string;
      language : string;
    }

    export interface ISpeciesResult {
      count: number;
      results : ISpecies[];
    }

}
