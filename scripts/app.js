(function () {
    'use strict';

    angular.module('app', [
        'ui.router',
		'ngResource',
        'ngMaterial',
        'ngAnimate'
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
			$urlRouterProvider.otherwise("/tab");

			$stateProvider
				.state('settings', {
					url: '/settings',
					templateUrl: 'views/settings.html',
					controller: 'SettingsController as vm'
				})
				.state('featured', {
					url: '/featured',
					templateUrl: 'views/featured.html',
					controller: 'FeaturedController as featuredController'
				})
				.state('browse', {
					url: '/browse',
					templateUrl: 'views/browse.html',
					controller: 'BrowseController as browseController'
				})
				.state('installed', {
					url: '/installed',
					templateUrl: 'views/installed.html',
					controller: 'InstalledController as vm'
				});

			$mdThemingProvider.theme('default')
				.primaryPalette('blue')
				.accentPalette('light-green')
				.warnPalette('red');
        }
    ]);
})();
