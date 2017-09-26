var app = angular.module('tabHistoryApp', []);

app.controller('tabHistoryController', function($scope) {
	var listUrl = [];
	$scope.submit = function () {
		$scope.url = $scope.url;
		listUrl.unshift($scope.url);
		chrome.storage.sync.set({'url': listUrl})
		$scope.getAllUrls();
	}
	$scope.remove = function(url) {
		var index = listUrl.indexOf(url);
		listUrl.splice(index,1);
		chrome.storage.sync.set({'url': listUrl})
		$scope.getAllUrls();
	}
	$scope.promises = [];
	$scope.getAllUrls = function () {
		chrome.storage.sync.get("url", function(data) {
			$scope.listUrl = data['url'];
		})
	}
	$scope.open = function () {
		listUrl.forEach(function (elem) {
			window.open(elem, '');
		})
	}
	$scope.promises.push($scope.getAllUrls());
});
