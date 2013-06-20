describe('Kendo Forms Widget Test Suite', function() {
  describe('Form initialization tests', function() {
		var fixtures = jasmine.getFixtures(),
			base = "../";
		
		if (document.location.pathname === "/context.html") {
			// Karma is running the test, so change the base
			base = "base/";
		}
		fixtures.fixturesPath = base + 'spec/javascripts/fixtures';
				
		describe('Form Widget initialization', function() {
			it('should exist in the kendo.ui namespace', function() {
				expect(kendo.ui.Form).toBeDefined();
			});

			it('should be able to perform imperative initialization with JavaScript', function() {
				expect($('#imperative-form').kendoForm).toBeDefined();
			});

			it('should be able to perform declarative initialization with data attributes', function() {
				fixtures.load('form-init.html');
			
				kendo.init(document.body);

				expect(typeof $('#declarative-form').data('kendoForm')).toEqual("object");
			});
		});
		
		describe('Input Transformation', function() {
			it('should add the k-input class to all inputs inside of the form', function() {
				fixtures.load('form-init.html');
			
				var form = $('#imperative-form').kendoForm().data('kendoForm');
				expect($('#imperative-form').find('input').hasClass('k-input')).toBe(true);
			});
		});

		fixtures.cleanUp();
		fixtures.clearCache();
	});
});