import {MenuController} from '../../ts/controllers/MenuController';

QUnit.module('MenuController');

QUnit.test('Test isActiveTab with same location', (assert : QUnitAssert) => {

  var mock$location = <ng.ILocationService> {
    path () {
      return '/some/url';
    }
  }

  var ctrl = new MenuController(mock$location);
  var returnValue = ctrl.isActiveTab('/some/url');
  assert.ok(returnValue, 'isActiveTab returns true for same URL');

});

QUnit.test('Test isActiveTab with similar location', (assert : QUnitAssert) => {

  var mock$location = <ng.ILocationService> {
    path () {
      return '/some/url';
    }
  }

  var ctrl = new MenuController(mock$location);
  var returnValue = ctrl.isActiveTab('/some/url/something');
  assert.ok(!returnValue, 'isActiveTab returns false for similar URL');

});
