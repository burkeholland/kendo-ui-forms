(function($, kendo) {
	var ui = kendo.ui,
		Widget = ui.Widget,
		formWidget,
		typeUpgrades = kendo.forms.types;

	var Form = Widget.extend({
		init: function(element, options) {
			var that = this;
			var inputs = $(element).find('input, button');
			var i, len;

			var upgradeFormType = function(type, callback) {
				// replace dash with underscore for features object lookup
				var modType = type.replace(/-/g,'_');

				if (that.options.alwaysUseWidgets || !kendo.forms.features[modType]) {
          inputs.filter('input[type=' + type + ']').each(callback);
				}
			};

			// base call to widget initialization
			Widget.fn.init.call(this, element, options);

			if (that.options.styleInputs) {
        inputs.filter('input, button').each(function(index, val) {
					// Add the k-input class to each form element (or 
					// k-button for buttons), providing Kendo UI styling 
					// to all elements, not just those the widget will transform.
					var el = $(val);

					if (val.type === 'button' ||
						val.type === 'submit' ||
						val.type === 'reset') {
						el.addClass('k-button');
					} else {
						el.addClass('k-input');
					}
				});
			}

			// Add basic support for form types defined in the typeUpgrades array
			for (i = 0, len = typeUpgrades.length; i < len; i++) {
				var typeObj = typeUpgrades[i];
				upgradeFormType(typeObj.type, typeObj.upgrade);
			}

			// Add placeholder support if not provided by the browser
			if(!kendo.forms.features.placeholder) {
        inputs.filter('[placeholder]').each(function(index, val) {
					var el = $(val);
					// Strip CR and LF from attribute vales, as specified in
          // www.w3.org/TR/html5/forms.html#the-placeholder-attribute
          var placeholderText = el.attr('placeholder')
            .replace(/(\\r\\n|\\n|\\r)/gm,'');

					// When the field loses focus, clear out the placeholder if
					// the input contains a value.
					el.on('blur', function() {
						var $el = $(this);
						var labelNode = this.previousSibling;
						if (this.value) {
							labelNode.nodeValue = '';
							$el.addClass('relPlaceholder');
						} else if (labelNode.nodeValue !== placeholderText) {
							labelNode.nodeValue = placeholderText;
							$el.removeClass('relPlaceholder');
						}
					});
					el.wrap('<label class="placeholder">' + placeholderText + '</label>');
					el.addClass('placeholder');
				});
			}
		},

		options: {
			// the name is what it will appear in the kendo namespace (kendo.ui.Form).
			// The jQuery plugin would be jQuery.fn.kendoForm.
			name: 'Form',
			alwaysUseWidgets: false,
			styleInputs: true
		}
	});

	ui.plugin(Form);
} (jQuery, kendo));