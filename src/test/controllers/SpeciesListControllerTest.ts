/// <reference path="../../../typings/tsd.d.ts"/>

namespace SwapApp.Tests.Controllers {

  import SpeciesListController = SwapApp.Controllers.SpeciesListController;
  import StartWarsService = SwapApp.Services.StarWarsService;
  import ISpeciesResults = SwapApp.Domain.ISpeciesResult;

  var mockService : StartWarsService;

  QUnit.module('SpeciesListController', {
    setup : () => {
      mockService = new StartWarsService(null, null); //Service will be mocked, no need to inject deps
    },
    teardown : () => {
    }
  });

  QUnit.test('Read species successfully', (assert : QUnitAssert) => {
    var mockResults = {count : 1, results : [{name : 'Name'}]};

    var serviceSpy : Sinon.SinonStub = sinon.stub(mockService, 'readSpecies');
    serviceSpy.returns({ then : (callback : Function) => callback(mockResults) }); //Return a fake promise

    var controller = new SpeciesListController(<ng.IScope>{}, _, mockService);
    assert.deepEqual(controller.speciesList, mockResults.results, 'Species data fetched successfully');

  });

}
