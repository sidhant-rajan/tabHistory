var app = angular.module('tabHistoryApp', []);

app.controller('tabHistoryController', function($scope, localStorageService, $rootScope) {
	var listUrl;
	if(window.localStorage.getItem("url")=="null")
		listUrl = [];
	else
		listUrl = JSON.parse(window.localStorage.getItem("url"));

	// Addition of new url
	$scope.submit = function () {
		listUrl.unshift($scope.url);
		window.localStorage.setItem("url", JSON.stringify(listUrl));
		$scope.getAllUrls();
	}

	// Remove an url
	$scope.remove = function(url) {
		var index = listUrl.indexOf(url);
		listUrl.splice(index,1);
		window.localStorage.setItem("url", listUrl);
		$scope.getAllUrls();
	}

	// on page onload
	$scope.promises = [];

	// Get all urls
	$scope.getAllUrls = function () {
		$scope.listUrl=JSON.parse(window.localStorage.getItem("url"));
	}

	// Open each link in a new tab
	$scope.open = function () {
		$scope.listUrl.forEach(function (elem) {
			window.open(elem,'');
		})
	}
	$scope.promises.push($scope.getAllUrls());
});
