app.controller('registerCandidateController', function (notice, $scope, $http, $location, $route,$routeParams, $rootScope) {
	$scope.course = $routeParams.courseCode;
    $scope.uploadResult = "";
    var stringMessage = "";

    
    $http({
		method:'GET',
		url:courseResourceApi2
	}).then(function(response){	
		$scope.codes=(response.data);
		console.log("$scope.codes "+ $scope.codes)
	},function(errResponse) {
		console.log(errResponse.data);
		console.log("() end");
	});
    
//    $http({
//		method:'GET',
//		url:NoteTemplateResourceApi
//	}).then(function(response){	
//		$scope.noteTemplates=(response.data);
////		console.log("fmoajfi "+ $scope.note)
//	},function(errResponse) {
//		console.log(errResponse.data);
//		console.log("() end");
//	});
    
    $http({
		method:'GET',
		url:originSiteResourceApi
	}).then(function(response){	
		$scope.site=(response.data);
//		console.log("fmoajfi "+ $scope.note)
	},function(errResponse) {
		console.log(errResponse.data);
		console.log("() end");
	});
    
    // domicileCity":"","domicileStreetName":"","domicileHouseNumber":"","studyQualification":"","graduate":false,"highGraduate":false,"stillHighStudy":false,"mobile":"","cvExternalPath":"","email":"1@2.3","firstname":"bbb","lastname":"aaa","dateOfBirth":"2018-11-01","imgpath":null}]
    $scope.myForm = {
        domicileCity: "",
        domicileStreetName: "",
        domicileHouseNumber: "",
        studyQualification: "",
        graduate: "",
        highGraduate: "",
        stillHighStudy: "",
        mobile: "",
        cvExternalPath: "",
        email: "",
        firstname: "",
        lastname: "",
        note: "",
        dateOfBirth: "",
        imgpath: "",
        originSite:"",
   
        files: []
    }

//    var myText = document.getElementById("myText");
    var wordCount = document.getElementById("wordCount");
    $scope.notelengthmax = notelengthmax; 
    
//    $scope.myForm.note = myText.addEventListener("keyup",function(){
//    	var characters = myText.value.split('');
//      wordCount.innerText = "Caratteri rimanenti: " + (notelengthmax - characters.length); 
//    });    
    
    $scope.popolaForm = function () {
    	if (confirm("Sei sicuro di voler sovrascrivere il contenuto delle note ?")){
    		console.log("scelta: " + $scope.myForm.noteTemplate);
    		$scope.myForm.note = $scope.myForm.noteTemplate;
    	}
//  	 $scope.noteCustomId = $routeParams.id;
//			$http({
//				method : 'GET',
//				url : NoteTemplateResourceApi
//			}).then(function(response) {
				
//				$scope.myForm.note = response.data[0].content ;
//			});
        };
    $scope.submitUserForm = function () {

        // var url = "/rest/uploadMultiFiles";

        if ($scope.validateForm()) {

            var data = new FormData();

            data.append("domicileCity",
                $scope.myForm.domicileCity);
            data.append("domicileStreetName",
                $scope.myForm.domicileStreetName);
            data.append("domicileHouseNumber",
                $scope.myForm.domicileHouseNumber);
            data.append("studyQualification",
                $scope.myForm.studyQualification);
            data.append("graduate", $scope.myForm.graduate);
            data.append("highGraduate",
                $scope.myForm.highGraduate);
            console.log("highGraduate" +
                $scope.myForm.highGraduate);
            data.append("stillHighStudy",
                $scope.myForm.stillHighStudy);
            console.log("stillHighStudy" +
                $scope.myForm.stillHighStudy);
            data.append("mobile", $scope.myForm.mobile);
            data.append("email", $scope.myForm.email);
            data.append("firstname", $scope.myForm.firstname);
            data.append("courseCode", $scope.course);
            data.append("lastname", $scope.myForm.lastname);
            data.append("note", $scope.myForm.note);
            data.append("originSite", $scope.myForm.site);
//            data.append("$scope.candidateCustom.candidateStatesId", );
            console.log($rootScope.userLogged);
            data.append("insertedBy", $rootScope.userLogged.id);
            console.log("stillHighStudy" + $scope.myForm.stillHighStudy);
            //add by Seba 
            console.log("Seba ceck --------- origineSite: "+$scope.myForm.site);
             var dateOfBirth = $scope.myForm.dateOfBirth;
            console.log("dateOfBirth: " + dateOfBirth);
            if (dateOfBirth == undefined || dateOfBirth == null || dateOfBirth.length == 0) {
                dateOfBirth = new Date("11/11/1111");
                console.log("FakedateOfBirth: " + dateOfBirth);
            }
                   
            
            data.append("dateOfBirth", dateOfBirth);


            if (typeof ($scope.myForm.files[0]) != "undefined") {
                console.log("filesname0 " +
                    $scope.myForm.files[0].name);
                data.append("files", $scope.myForm.files[0]);
                data.append("imgpath",
                    $scope.myForm.files[0].name);
            }

            if (typeof ($scope.myForm.files[1]) != "undefined") {
                console.log("filesname0 " +
                    $scope.myForm.files[1].name);
                data.append("files", $scope.myForm.files[1]);
                data.append("cvExternalPath",
                    $scope.myForm.files[1].name);
            }

            var config = {
                transformRequest: angular.identity,
                transformResponse: angular.identity,
                headers: {
                    'Content-Type': undefined

                }
            }

            $http
                .post(candidateResourceApi2, data, config)
                .then(
                    // Success
                    function (response) {
                        $scope.uploadResult = response.data;
                        console.log(data);
                        $location
                            .path("/list-all-candidates");
                        $route.reload();
                        notice.success();
                    },
                    // Error
                    function (response) {
                        $scope.uploadResult = response.data;
                        console.log(response);
                        if (response.status == 500)
                            notice.database();
                        else
                            notice
                            .error(response.data.errorMessage);

                    });
        } else {
            notice.error(stringMessage);
        }
    };

    $scope.resetForm = function () {
        $scope.myForm = null;
    };

    $scope.validateForm = function () {
        console.log("validateForm START");

        var firstnameTmp = $scope.myForm.firstname;
        console.log("firstnameTmp: " + firstnameTmp);

        if (firstnameTmp == undefined || firstnameTmp == null || firstnameTmp.length == 0) {
            stringMessage = "inserisci un nome valido";
            return false;
        }

        var lastnameTmp = $scope.myForm.lastname;
        console.log("firstnameTmp: " + lastnameTmp);

        if (lastnameTmp == undefined || lastnameTmp == null || lastnameTmp.length == 0) {
            stringMessage = "inserisci un cognome valido";
            return false;
        }
        
        var courseCodeTmp = $scope.course;
        console.log("courseCodeTmp: " + courseCodeTmp);

        if (courseCodeTmp == undefined || courseCodeTmp == null) {
            stringMessage = "inserisci un coodice";
            return false;
        }

        var emailTmp = $scope.myForm.email;
        console.log("emailTmp: " + emailTmp);
        if (emailTmp == undefined || emailTmp == null || emailTmp.length == 0) {
            stringMessage = "inserisci un email valida";
            return false;
        }
        
//        var domicileCityTmp = $scope.myForm.domicileCity;
//        console.log("domicileCityTmp: " + domicileCityTmp);
//        if (domicileCityTmp == undefined ||
//            domicileCityTmp == null ||
//            domicileCityTmp == "") {
//            stringMessage = "inserisci un domicilio";
//            return false;
//        }
//        
//        var domicileStreetNameTmp = $scope.myForm.domicileStreetName;
//        console.log("domicileStreetNameTmp: " + domicileStreetNameTmp);
//        if (domicileStreetNameTmp == undefined ||
//            domicileStreetNameTmp == null ||
//            domicileStreetNameTmp == "") {
//            stringMessage = "inserisci la via del domicilio";
//            return false;
//        }
//
//        var domicileHouseNumberTmp = $scope.myForm.domicileHouseNumber;
//        console.log("domicileHouseNumberTmp: " + domicileHouseNumberTmp);
//        if (domicileHouseNumberTmp == undefined ||
//            domicileHouseNumberTmp == null ||
//            domicileHouseNumberTmp == "") {
//            stringMessage = "inserisci il numero civico della via";
//            return false;
//        }
//        
//        var studyQualificationTmp = $scope.myForm.studyQualification;
//        console.log("studyQualificationTmp: " +
//            studyQualificationTmp);
//        if (studyQualificationTmp == undefined ||
//            studyQualificationTmp == null ||
//            studyQualificationTmp == "") {
//            stringMessage = "inserisci un titolo di studio";
//            return false;
//        }
//
        var mobileTmp = $scope.myForm.mobile;
        console.log("mobileTmp: " + mobileTmp);
        if (mobileTmp != null) {
            var mobileStr = mobileTmp.toString();
            console.log("mobileTmp.length: " + mobileStr.length + " mobileStr " + mobileStr);
            if (mobileStr.length > 0 && mobileStr.length < 9) {
                console.log("mobileTmp2: " + mobileTmp);
                stringMessage = "lunghezza numero cellulare minima 9";
                return false;
            }
        }

        console.log("validateForm END --> true");
        return true;
    };
});