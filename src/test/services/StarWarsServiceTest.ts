/// <reference path="../../../typings/tsd.d.ts"/>
/// <reference path="../../../app-typings/lodash-update.d.ts"/>

module SwapApp.Tests.Services {

  import StarWarsService = SwapApp.Services.StarWarsService;
  import ISpeciesResult = SwapApp.Domain.ISpeciesResult;

  var $injector : ng.auto.IInjectorService;
  var $httpBackend : angular.IHttpBackendService;

  QUnit.module('StarWarsService tests', {
    setup : () => {
      $injector = angular.injector([SwapApp.mainModule, 'ng', 'ngMock']);
      $httpBackend = $injector.get('$httpBackend');
    },

    teardown : () => {
      if ($httpBackend) {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      }
    }
  });

  QUnit.test('Test read species sucessfully', (assert : QUnitAssert) => {

    var mockResponse : ISpeciesResult = {
      count : 1,
      results : [
        {
          name : 'Species 1',
          classification : 'A',
          designation: 'A',
          average_height : 'A',
          skin_colors : 'A',
          hair_colors : 'A',
          eye_colors : 'A',
          average_lifespan : 'A',
          language : 'A'
        }
      ]
    };

    $httpBackend.expectGET('https://swapi.co/api/species/').respond(mockResponse);

    var service : StarWarsService = $injector.get('starWarsService');
    var done = assert.async();

    service.readSpecies().then((data) => {
      assert.ok(_.isMatch(data, mockResponse), 'Correct return object');
      done();
    });

    $httpBackend.flush();

  });

}
