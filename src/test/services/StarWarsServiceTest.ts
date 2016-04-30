import {StarWarsService} from '../../ts/services/StarWarsService';
import {ISpeciesResult} from '../../ts/domain/SpeciesResult';
import {mainModule} from '../../ts/App';
import {isMatch} from 'lodash';

var $injector : ng.auto.IInjectorService;
var $httpBackend : angular.IHttpBackendService;
var $q : ng.IQService;

QUnit.module('StarWarsService', {
  setupOnce : () => {
    $injector = angular.injector([mainModule, 'ng', 'ngMock']);
    $httpBackend = $injector.get('$httpBackend');
    $q = $injector.get('$q');
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


  //var service : StarWarsService = $injector.get('starWarsService');
  var service = new StarWarsService($q, $injector.get('$http'));

  var done = assert.async();

  service.readSpecies().then((data) => {
    assert.ok(isMatch(data, mockResponse), 'Correct return object');
    done();
  });

  $httpBackend.flush();

});
