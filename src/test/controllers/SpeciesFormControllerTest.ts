namespace SwapApp.Tests.Controllers {

  import SpeciesFormController = SwapApp.Controllers.SpeciesFormController;
  import ISpecies = SwapApp.Domain.ISpecies;

  QUnit.module('SpeciesFormController');

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

  QUnit.test('Test save with empty form', (assert : QUnitAssert) => {

    let ctrl = new SpeciesFormController(<ng.IScope>{});
    ctrl.species = undefined;

    ctrl.save();
    assert.equal(ctrl.message, 'Empty species huh? Fine because this API is read-only! :)');

  });

}
