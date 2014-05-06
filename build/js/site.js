'use strict';

var siteModule = angular.module('siteApp', []);

siteModule.controller('siteCtrl', function($scope){
	var sessionCons = function(){
		show: {
			home: true,
			login: false,
			register: false,
			profile: false,
			about: false,
			shop: false,
			forum: false,
			support: false,
			gameGuide: false
		}

	}
	$scope.session = sessionCons();
});