
import {NotApplicableFilter} from '../../ts/filters/NotApplicableFilter';

QUnit.module('Filter tests');

QUnit.test('Test notApplicableFilter with n/a value', (assert : QUnitAssert) => {
	assert.equal(NotApplicableFilter.filter()('n/a'), 'Not applicable');
});

QUnit.test('Test notApplicableFilter with non n/a value', (assert : QUnitAssert) => {
  assert.equal(NotApplicableFilter.filter()('something'), 'something');
});
