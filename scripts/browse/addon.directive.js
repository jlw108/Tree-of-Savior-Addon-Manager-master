(function() {
	'use strict';

	angular
		.module('app')
		.directive('addon', addon);

	function addon($log, $compile, $sce, installer, readmeretriever) {
		var directive = {
			scope: {},
			restrict: 'E',
			link: link,
			templateUrl: 'views/addon.html',
			controller: AddonController,
			controllerAs: "vm",
			bindToController: {
				addon: '='
			}
		};

		return directive;

		function link(scope, element, attrs) {
			scope.install = function(addon) {
				addon.isDownloading = true;
				installer.install(addon, scope, function() {
					addon.isDownloading = false;
				});
			}

			scope.uninstall = function(addon) {
				installer.uninstall(addon, scope);
			}

			scope.update = function(addon) {
				installer.update(addon, scope);
			}

			scope.openWebsite = function(addon) {
				// TODO: this needs to be a utility method
				var repoUrl = "https://github.com/" + addon.repo;
				require("shell").openExternal(repoUrl);
			}

			scope.openIssues = function(addon) {
				var issuesUrl = "https://github.com/" + addon.repo + "/issues";
				require("shell").openExternal(issuesUrl);
			}

			scope.openReadme = function(addon) {
				$log.info("Opening readme");
				readmeretriever.getReadme(addon, function(success, readme) {
					if(success) {
						var marked = require('marked');
						marked.setOptions({
							sanitize: true
						});
						scope.$apply(function() {
							addon.readme = $sce.trustAsHtml(marked(readme));
							console.log("readme: " + addon.readme);
						});
					}
				});
			}
		}
	}

	AddonController.$inject = ['$scope'];

	function AddonController($scope) {
		$scope.testFunction = function() {
			console.log("test function");
		}
	}
})();
