(function() {
	'use strict';

	angular
		.module('app')
		.controller('SettingsController', SettingsController);

	SettingsController.$inject = ['settings'];

	/* @ngInject */
	function SettingsController(settings) {
		var vm = this;

		settings.getTreeOfSaviorDirectory(function(treeOfSaviorDirectory) {
			vm.treeOfSaviorDirectory = treeOfSaviorDirectory;
			validateDirectory();
		});

		vm.browseForDirectory = function() {
			var remote = require('remote');
			var dialog = remote.require('dialog');
			var directories = dialog.showOpenDialog({ properties: ['openDirectory']});

			if(directories && directories.length > 0) {
				vm.treeOfSaviorDirectory = directories[0];
				settings.saveTreeOfSaviorDirectory(vm.treeOfSaviorDirectory);
				validateDirectory();
			}
		};

		vm.isValidDirectory = function() {
			return settings.getIsValidDirectory();
		};

		function validateDirectory() {
			var fs = require("fs");
			var exe = vm.treeOfSaviorDirectory + "/release/Client_tos.exe";

			fs.stat(exe, function(error, stat) {
				if(error == null) {
					settings.setIsValidDirectory(true);
				} else {
					settings.setIsValidDirectory(false);
				}
			});
		}
	}
})();
