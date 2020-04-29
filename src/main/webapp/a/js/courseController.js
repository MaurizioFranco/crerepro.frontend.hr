var courseResourceApi = MAIN_BACKEND_LOCATION+'/api/v1/coursepage/';

app.controller('registerCourseController', function (notice, $scope, $http, $location, $route) {

	var stringMessage = "";

	$scope.submitUserForm = function() {
		console.log($scope.myForm);

		$http({
			method : 'POST',
			url : courseResourceApi,
			contentType : 'application/json',
			data : JSON.stringify($scope.myForm),

		}).then(function(response) {
			$location.path("/list-all-courses");
			$route.reload();
			notice.success();
		}, function(errResponse) {
			if (errResponse.status == 500)
				notice.database();
			else
				notice.error(errResponse.data.errorMessage);
		});
	}
	$scope.resetForm = function() {
		console.log("sono in resetForm myform: "+$scope.myForm);
		$scope.myForm = null;
	};

});

app.controller('listCourseController', function(notice, $scope, $http,
		$location, $route, $interval, $window) {

	$http({
		method : 'GET',
		url : courseResourceApi
	}).then(function(response) {
		$scope.list = response.data;
		console.log($scope.list);
	});

	$scope.setOnline = function(coursePageId) {
		var dataToInsert = {};
		$http({
			method : 'PUT',
			data : JSON.stringify(dataToInsert),
			contentType : 'application/json',
			url : courseResourceApi + "online/" + coursePageId

		}).then(function(response) {
			$location.path("/list-all-courses");
			console.log(response);
			$route.reload();
			notice.success();

		},
		// Error
		function(response) {
			$scope.uploadResult = response.data;
			console.log(response);
			if (response.status == 500)
				notice.database();
			else
				notice.error(response.data.errorMessage);

		});
	}

	$scope.setOffline = function(coursePageId) {
		var dataToInsert = {};
		$http({
			method : 'PUT',
			data : JSON.stringify(dataToInsert),
			contentType : 'application/json',
			url : courseResourceApi + "offline/" + coursePageId
		}).then(function(response) {
			$location.path("/list-all-courses");
			console.log(response);
			$route.reload();
			notice.success();

		},
		// Error
		function(response) {
			$scope.uploadResult = response.data;
			console.log(response);
			if (response.status == 500)
				notice.database();
			else
				notice.error(response.data.errorMessage);

		});
	}

	$scope.editCoursePage = function(coursePageId) {
		$location.path("/update-course/" + coursePageId);
	}
	$scope.deleteCourse = function(coursePageId) {
		$http({
			method : 'DELETE',
			url : courseResourceApi + coursePageId
		}).then(function(response) {
			$location.path("/list-all-courses");
			console.log(response);
			$route.reload();
			notice.success();

		},
		// Error
		function(response) {
			$scope.uploadResult = response.data;
			console.log(response);
			if (response.status == 500)
				notice.database();
			else
				notice.error(response.data.errorMessage);

		});
	}

});

app.controller('courseDetailsController', function(notice, $scope, $http,
		$location, $routeParams, $route) {

	$scope.coursePageId = $routeParams.id;
	$http({
		method : 'GET',
		url : courseResourceApi + $scope.coursePageId
	}).then(function(response) {
		$scope.myForm = response.data;
		console.log($scope.myForm);
	});

	$scope.editCoursePage = function() {

		$http({
			method : 'PUT',
			data : JSON.stringify($scope.myForm),
			contentType : 'application/json',
			url : courseResourceApi + $scope.coursePageId
		}).then(function(response) {
			$location.path("/list-all-courses");
			console.log(response);
			$route.reload();
			notice.success();

		},
		// Error
		function(response) {
			console.log(response);
			if (response.status == 500)
				notice.database();
			else
				notice.error(response.data.errorMessage);

		});
	}

});
