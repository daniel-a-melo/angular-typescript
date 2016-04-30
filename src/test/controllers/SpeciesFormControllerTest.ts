
import {SpeciesFormController} from '../../ts/controllers/SpeciesFormController';
import {ISpecies} from '../../ts/domain/SpeciesResult';
import {mainModule} from '../../ts/App';
import * as $ from 'jquery';

var $injector : ng.auto.IInjectorService;
var $controller : ng.IControllerService;
var $templateCache : ng.ITemplateCacheService;
var $compile : ng.ICompileService;
var $rootScope : ng.IRootScopeService;
var $newScope : ng.IScope;
var ctrlTemplate : string;

QUnit.module('SpeciesFormController', {
  setupOnce : () => {
    $injector = angular.injector([mainModule, 'ng', 'ngMock', 'app-templates']);
    $controller = $injector.get('$controller');
    $rootScope = <ng.IRootScopeService> $injector.get('$rootScope');
    $templateCache = $injector.get('$templateCache');
    $compile = $injector.get('$compile');
    ctrlTemplate = <string> $templateCache.get('speciesForm.html');
  },
  setup : () => {
    $newScope = $rootScope.$new();
  }
});

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

QUnit.test('Test message box with sucess message shows up', (assert : QUnitAssert) => {
  let $element = $compile(ctrlTemplate)($newScope);
  let ctrl = $controller('speciesFormController as ctrl', { $scope : $newScope, $element : $element });

  ctrl.species = <ISpecies>{};
  ctrl.species.name = 'Some species';
  ctrl.save();

  $newScope.$digest();
  assert.equal($($element[0]).find('#messages').html(), 'Thanks for entering the species Some species. However, this API is read-only. Sorry :)');
});
