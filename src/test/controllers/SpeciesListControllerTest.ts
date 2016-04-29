//https://github.com/sinonjs/sinon/issues/830

import {SpeciesListController} from '../../ts/controllers/SpeciesListController';
import {StarWarsService} from '../../ts/services/StarWarsService';
import {ISpeciesResult} from '../../ts/domain/SpeciesResult';
import * as sinon from 'sinon';
import * as _ from 'lodash';

var mockService : StarWarsService;

QUnit.module('SpeciesListController', {
  setup : () => {
    mockService = new StarWarsService(null, null); //Service will be mocked, no need to inject deps
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
  assert.equal(true, true);

});
