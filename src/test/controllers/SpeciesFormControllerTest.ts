
import {SpeciesFormController} from '../../ts/controllers/SpeciesFormController';
import {ISpecies} from '../../ts/domain/SpeciesResult';

QUnit.module('Controller tests');

QUnit.test('Test save sucessfully', (assert : QUnitAssert) => {

  let ctrl = new SpeciesFormController(<ng.IScope>{});
  ctrl.species = <ISpecies>{};
  ctrl.species.name = 'Some species';
  ctrl.save();

  assert.equal(ctrl.message, 'Thanks for entering the species Some species. However, this API is read-only. Sorry :)')

});

QUnit.test('Test save with incorrect name', (assert : QUnitAssert) => {

  let ctrl = new SpeciesFormController(<ng.IScope>{});
  ctrl.species = <ISpecies>{};
  ctrl.species.name = 'error';

  assert.throws(() => {
    ctrl.save();
  }, new Error('Erronenous species name entered'));

});
