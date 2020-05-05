var app = angular.module('userregistrationsystem', [ 'ngRoute', 'ngResource' ]);

app.config(function($routeProvider) {
	$routeProvider.when('/list-all-candidates', {
		//		candidates
		templateUrl : './template/candidate/list.html',
		controller : 'listCandidateController'
	}).when('/list-all-candidates/:code', {
		templateUrl : './template/candidate/list.html',
		controller : 'listCandidateController'
	}).when('/insert-new-candidate/:courseCode', {
		templateUrl : './template/candidate/new.html',
		controller : 'registerCandidateController'
	}).when('/insert-new-candidate', {
		templateUrl : './template/candidate/new.html',
		controller : 'registerCandidateController'
//	}).when('/insert-new2-candidate', {
//		templateUrl : './template/candidate/new2.html',
//		controller : 'smartRegisterCandidateController'
	}).when('/update-candidate/:id', {
		templateUrl : './template/candidate/update.html',
		controller : 'detailCandidateController'
	}).when('/list-all-usersurveytoken', {
		//		usersurveytoken
		templateUrl : './template/usersurveytoken/list.html',
		controller : 'listUserSurveyTokenController'
	}).when('/insert-new-usersurveytoken', {
		templateUrl : './template/usersurveytoken/new.html',
		controller : 'insertUserSurveyTokenController'
	}).when('/list-all-itconsultants', {
		//		itconsultants
		templateUrl : './template/itconsultant/list.html',
		controller : 'listItConsultantController'
	}).when('/register-new-itconsultant', {
		templateUrl : './template/itconsultant/new.html',
		controller : 'registerItConsultantController'
	}).when('/register-newSmart-itconsultant', {
		templateUrl : './template/itconsultant/newSmart.html',
		controller : 'registerSmartItConsultantController'
	}).when('/update-itconsultant/:id', {
		templateUrl : './template/itconsultant/update.html',
		controller : 'itConsultantDetailsController'
	}).when('/statistics-itconsultant/', {
		templateUrl : './template/itconsultant/statisticsITC.html',
		controller : 'itConsultantStatisticController'
	}).when('/statistics-itconsultant2/', {
		templateUrl : './template/itconsultant/statisticsITC2.html',
		controller : 'itConsultantStatisticController'
	//books
//	}).when('/register-new-book', {
//		templateUrl : './template/book/new.html',
//		controller : 'registerBookController'
//	}).when('/list-all-books', {
//		templateUrl : './template/book/list.html',
//		controller : 'listBookController'
//	}).when('/update-book/:id', {
//		templateUrl : './template/book/update.html',
//		controller : 'bookDetailsController'
//	}).when('/list-all-books-to-download', {
//		templateUrl : './template/book/listb.html',
//		controller : 'listBookController'
	}).when('/list-all-courses', {
		templateUrl : './template/course/list.html',
		controller : 'listCourseController'
	}).when('/register-new-course', {
		templateUrl : './template/course/new.html',
		controller : 'registerCourseController'
//	}).when('/statistiche/:code', {
//		templateUrl : './template/statistics2.html',
//		controller : 'statisticsController'
//	}).when('/update-course/:id', {
//		templateUrl : './template/course/update.html',
//		controller : 'courseDetailsController'
			
//	}).when('/list-all-noteTemplate', {
//		//		itconsultants
//		templateUrl : './template/noteTemplate/list.html',
//		controller : 'listNoteController'
//	}).when('/register-new-noteTemplate', {
//		templateUrl : './template/noteTemplate/new.html',
//		controller : 'RegisterNoteController'
//	}).when('/update-noteTemplate/:id', {
//		templateUrl : './template/noteTemplate/update.html',
//		controller : 'noteEditController'

//	}).when('/list-all-message', {
//		//		newsLetterMessage
//		templateUrl : './template/newsLetterMessage/list.html',
//		controller : 'listMessageController'
//	}).when('/register-new-message', {
//		templateUrl : './template/newsLetterMessage/new.html',
//		controller : 'registerMessageController'
//	}).when('/update-message/:id', {
//		templateUrl : './template/newsLetterMessage/update.html',
//		controller : 'messageEditController'
	}).when('/list-all-interviewreplies', {
		templateUrl : './template/interview/interview.html',
		controller : 'interviewController'
	//	      courseresumes
//	}).when('/list-all-courseresumes', {
//		templateUrl : './template/courseresume/list.html',
//		controller : 'listCourseResumeController'
//	}).when('/register-new-courseresume', {
//		templateUrl : './template/courseresume/new.html',
//		controller : 'registerCourseResumeController'
//	}).when('/update-courseresume/:id', {
//		templateUrl : './template/courseresume/update.html',
//		controller : 'courseResumeDetailsController'
	//   originsites
//	}).when('/list-all-originsites', {
//		templateUrl : './template/originsite/list.html',
//		controller : 'listOriginSiteController'
//	}).when('/register-new-originsite', {
//		templateUrl : './template/originsite/new.html',
//		controller : 'registerOriginSiteController'
//	}).when('/update-originsite/:id', {
//		templateUrl : './template/originsite/update.html',
//		controller : 'originSiteDetailsController'
	}).when('/login', {
		templateUrl : './template/login.html',
		controller : 'loginController'
	}).when('/logout', {
		templateUrl : './template/login.html',
		controller : 'logoutController'
	}).when('/register-new-user', {
		templateUrl : './template/userregistration.html',
		controller : 'registerAccountController'
	}).when('/list-all-candidateStates', {
		// candidateStates
		templateUrl : './template/candidateStates/list.html',
		controller : 'listCandidateStatesController'
	}).when('/update-candidateStates/:id', {
		templateUrl : '/template/candidateStates/new.html',
		controller : 'candidateStatesDetailsController'
	}).otherwise({
		//		home
		redirectTo : '/home',
		templateUrl : './template/statistics.html',
		controller : 'statisticsController'
	});

});

// ################# START SERVICE NOTICE OPERATION #################
var timeNotice = 2000; // time in milliseconds (1000 = 1sec)

app.service('notice', function($rootScope) {

	this.success = function noticeSuccess() {
		console.log("noticeSuccess invoked");
		$rootScope.successMessageBool = true;
		setTimeout(function() {
			$('#noticeModalSuccess').fadeOut('fast');
			$rootScope.successMessageBool = false;
		}, timeNotice);
	}

	this.error = function noticeError(msg) {
		console.log("noticeError invoked");
		console.log("error message received: " + msg);
		$rootScope.errorMessage = msg;
		$rootScope.errorMessageBool = true;
		console.log("erorreorererr" + $rootScope.errorMessageBool)
		setTimeout(function() {
			$('#noticeModalError').fadeOut('fast');
			$rootScope.errorMessageBool = false;
			console.log("erorreorererr" + $rootScope.errorMessageBool)
			$rootScope.errorMessage = "";
		}, timeNotice);
	}

	this.warn = function noticeWarn(msg) {
		console.log("noticeWarn invoked");
		console.log("warn message received: " + msg);
		$rootScope.warnMessage = msg;
		$rootScope.warnMessageBool = true;
		setTimeout(function() {
			$('#noticeModalWarn').fadeOut('fast');
			$rootScope.warnMessageBool = false;
			$rootScope.warnMessage = "";
		}, timeNotice);
	}

	this.database = function noticeErrorDB() {
		console.log("noticeErrorDB invoked");
		$rootScope.errorDBMessageBool = true;
		setTimeout(function() {
			$('#noticeModalErrorDB').fadeOut('fast');
			$rootScope.errorDBMessageBool = false;
		}, timeNotice);
	}
});
//################# END SERVICE NOTICE OPERATION #################

// DIRECTIVE - FILE MODEL
app.directive('fileModel', [ '$parse', function($parse) {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function() {
				scope.$apply(function() {
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};

} ]);

// DIRECTIVE - TOOLTIP

app.directive('toggle', function() {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			if (attrs.toggle == "tooltip") {
				$(element).tooltip();
			}
			if (attrs.toggle == "popover") {
				$(element).popover();
			}
		}
	};
})

app
		.config([
				'$httpProvider',
				function($httpProvider) {
					$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
//					$httpProvider.defaults.headers.common.Authorization = "Basic "
//                        + btoa("1@2.3:ciao1234");
				} ]);
//app.factory('AuthInterceptor', [ function($httpProvider) {
app.factory('AuthInterceptor', ['$rootScope', function($rootScope) {
	return {
		'request' : function(config) {
			console.log("config.headers: " + config.headers + " - config.headers.Authorization: " + config.headers.Authorization);
//			config.headers = config.headers || {};
			if ($rootScope.username!=undefined){
				var username = $rootScope.username ? $rootScope.username : "";
				var password = $rootScope.password ? $rootScope.password : "";
				var encodedString = btoa(username+":"+password);
				config.headers.Authorization = 'Basic ' + encodedString;
			}
//			config.headers.Authorization = 'Basic ' + encodedString;
//			$httpProvider.defaults.headers.common.Authorization = "Basic " + btoa("1@2.3:ciao1234");
//			config.headers.Authorization = 'Basic ' + encodedString;
			
//			config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
//			config.headers.Header = 'Basic ' + encodedString;
			return config;
		}
	};
} ]);

app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
	}]);