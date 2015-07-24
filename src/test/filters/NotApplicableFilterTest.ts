module SwapApp.Tests.Filters {

	import notApplicableFilter = SwapApp.Filters.notApplicableFilter;

	QUnit.module('Filter tests');

	QUnit.test('Test notApplicableFilter with n/a value', (assert : QUnitAssert) => {
		assert.equal(notApplicableFilter()('n/a'), 'Not applicable');
	});

  QUnit.test('Test notApplicableFilter with non n/a value', (assert : QUnitAssert) => {
    assert.equal(notApplicableFilter()('something'), 'something');
  });

}
