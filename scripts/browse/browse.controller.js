(function() {
	'use strict';

	angular
		.module('app')
		.controller('BrowseController', BrowseController);

	BrowseController.$inject = ['$scope', '$http', 'addonretriever', 'settings', '$log'];

	function BrowseController($scope, $http, addonretriever, settings, $log) {
		var viewModel = this;

		addonretriever.getAddons(function(addons) {
			viewModel.addons = addons;
		});

		addonretriever.getDependencies(function(dependencies) {
			$log.info(JSON.stringify(dependencies));
		});
	}
})();
