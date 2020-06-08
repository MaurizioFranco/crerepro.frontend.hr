app.controller('detailCandidateController', function (notice, $scope, $http, $location, $routeParams, $route) {
	let debugEnabled = true ;
    let oldImgProfilePath = "";
    let oldCVPath = "";
    $scope.uploadResult = "";
    let stringMessage = "";
    let getCandState = "";
    
     $http({
		method:'GET',
		url:candidateStatesApi
	}).then(function(response){	
		
		$scope.states=(response.data);
		debugMessage("Lista candidate states...");
		debugMessage($scope.states);
		initializeSelectedStatusCode();
	},function(errResponse) {
		debugMessage(errResponse.data);
	});
    
    $scope.candidateCustomId = $routeParams.id;
    $http({
        method: 'GET',
        url: candidateResourceApi2 + $scope.candidateCustomId
    }).then(function (response) {
        $scope.candidateCustom = response.data;
        debugMessage("Caricato dettaglio del candidato:");
		debugMessage($scope.candidateCustom);
        oldImgProfilePath = $scope.candidateCustom.imgpath;
        oldCVPath = $scope.candidateCustom.cvExternalPath;
        getCandState = $scope.candidateCustom.id;
        initializeSelectedStatusCode();
        
    });
    
    function initializeSelectedStatusCode () {
    	if (($scope.candidateCustom.candidateStatusCode!=undefined)&&($scope.candidateCustom.candidateStatusCode!=null)) {
    		for (let i=0; i<$scope.states.length;i++) {
    			if ($scope.candidateCustom.candidateStatusCode==$scope.states[i].statusCode){
    				$scope.selected = $scope.states[i];	
    			}
    		}
    	}    	
    }
    
    //$scope.selected = currentStateSelected;
    $scope.candidateCustom = {
        domicileCity: "",
        studyQualification: "",
        graduate: "",
        highGraduate: "",
        stillHighStudy: "",
        mobile: "",
        cvExternalPath: null,
        email: "",
        firstname: "",
        lastname: "",
        dateOfBirth: "",
        note:"",
        imgpath: null,
        oldImg: null,
        oldCV: null,
        oldCandStat:null,
        candidateStatusCode:null,
        files: []
    
    	
    }

    $scope.submitUserForm = function () {

        debugMessage("oldImgProfilePath " + oldImgProfilePath);
        debugMessage("oldCVPath " + oldCVPath);
        if ($scope.validateForm()) {
            let data = new FormData();
            data.append("positionCode", $scope.candidateCustom.courseCode);
            data.append("domicileCity",
                $scope.candidateCustom.domicileCity);
            data.append("studyQualification",
                $scope.candidateCustom.studyQualification);

            if ($scope.candidateCustom.graduate == null) {
                data.append("graduate", false);
            } else {
                data.append("graduate",
                    $scope.candidateCustom.graduate);
                debugMessage("graduate" +
                    $scope.candidateCustom.graduate);
            }

            if ($scope.candidateCustom.highGraduate == null) {
                data.append("highGraduate", false);
            } else {
                data.append("highGraduate",
                    $scope.candidateCustom.highGraduate);
                debugMessage("highGraduate" +
                    $scope.candidateCustom.highGraduate);
            }

            if ($scope.candidateCustom.stillHighStudy == null) {
                data.append("stillHighStudy", false);
            } else {
                data.append("stillHighStudy",
                    $scope.candidateCustom.stillHighStudy);
                console
                    .log("stillHighStudy" +
                        $scope.candidateCustom.stillHighStudy);
            }

            data.append("mobile", $scope.candidateCustom.mobile);
            data.append("email", $scope.candidateCustom.email);
            data.append("firstname",
                $scope.candidateCustom.firstname);
            data.append("lastname",
                $scope.candidateCustom.lastname);
            
            data.append("note",
                    $scope.candidateCustom.note);

            debugMessage("$scope.candidateCustom.dateOfBirth " +
                $scope.candidateCustom.dateOfBirth); // old
            // dateOfBirth
            debugMessage("$scope.dateOfBirth : " +
                $scope.dateOfBirth); // new dateOfBirth

            if ($scope.dateOfBirth == null) {

                // let inputDate =
                // $scope.candidateCustom.dateOfBirth;
                // let d = new Date(inputDate);
                // debugMessage("inputDate " + d);
                // data.append("dateOfBirth", d);
            } else {

                let inputDate = $scope.dateOfBirth;
                let d = new Date(inputDate);
                debugMessage("inputDate " + d);
                data.append("dateOfBirth", d);
            }

            data.append("oldImg", oldImgProfilePath);
            data.append("oldCV", oldCVPath);
            data.append("oldCandStat", getCandState);

            debugMessage("oldImgProfilePath: " + oldImgProfilePath);
            debugMessage("oldCV " + oldCVPath);
            debugMessage("XXXXXX $scope.candidateCustom.candidateStatusCode" + $scope.candidateCustom.candidateStatusCode + "$scope.selected " + $scope.selected);
            debugMessage($scope.selected);
//            debugMessage(JSON.stringify($scope.selected));
//            debugMessage("currentStateSelected: " + currentStateSelected);
            //debugMessage("currentStateSelected.id: "+ currentStateSelected.id);
            data.append("candidateStatusCode", $scope.selected.statusCode);
            debugMessage("$scope.candidateCustom.files" +
                $scope.candidateCustom.files);
            let fileIsPresent = $scope.candidateCustom.files;

            if (fileIsPresent) {

                if (typeof ($scope.candidateCustom.files[0]) != "undefined") {
                    console
                        .log("Filesname0 IMG IS PRESENT " +
                            $scope.candidateCustom.files[0].name);
                    data.append("files",
                        $scope.candidateCustom.files[0]);
                    data
                        .append(
                            "imgpath",
                            $scope.candidateCustom.files[0].name);
                } else {
                    data.append("imgpath", null);
                }

                if (typeof ($scope.candidateCustom.files[1]) != "undefined") {
                    console
                        .log("Filesname1 CV IS PRESENT" +
                            $scope.candidateCustom.files[1].name);
                    data.append("files",
                        $scope.candidateCustom.files[1]);
                    data
                        .append(
                            "cvExternalPath",
                            $scope.candidateCustom.files[1].name);
                } else {
                    data.append("cvExternalPath", null);
                }

            }

            let config = {
                transformRequest: angular.identity,
                transformResponse: angular.identity,
                headers: {
                    'Content-Type': undefined

                }
            }

            $http.put(
                candidateResourceApi2 +
                $scope.candidateCustomId, data,
                config).then(
                // Success
                function (response) {
                	$scope.uploadResult = response.data;
                    debugMessage(data);
                    
                    $location.path("/list-all-candidates");
                    $route.reload();
                    notice.success();
                },
                // Error
                function (response) {
                    $scope.uploadResult = response.data;
                    debugMessage(response);
                    if (response.status == 500)
                        notice.database();
                    else
                        notice.error(response.data.errorMessage);

                });
        } else {
            notice.error(stringMessage);
        }

    }

    $scope.validateForm = function () {
        debugMessage("validateForm START");
        debugMessage($scope.candidateCustom);
        debugMessage($scope.selected);
        let firstnameTmp = $scope.candidateCustom.firstname;
//        debugMessage("firstnameTmp: " + firstnameTmp);

        if (firstnameTmp == undefined || firstnameTmp == null ||
            firstnameTmp == "") {
        	stringMessage = "inserisci un nome valido";
            return false;
        }

        let lastnameTmp = $scope.candidateCustom.lastname;
//        debugMessage("firstnameTmp: " + lastnameTmp);

        if (lastnameTmp == undefined || lastnameTmp == null ||
            lastnameTmp == "") {
        	stringMessage = "inserisci un cognome valido";
            return false;
        }
        
        let emailTmp = $scope.candidateCustom.email;
//        debugMessage("emailTmp: " + emailTmp);
        if (emailTmp == undefined || emailTmp == null ||
            emailTmp == "") {
        	stringMessage = "inserisci una mail valida";
            return false;
        }

        
        let mobileTmp = $scope.candidateCustom.mobile;
//        debugMessage("mobileTmp: " + mobileTmp);
        if (mobileTmp != null) {
            let mobileStr = mobileTmp.toString();
            debugMessage("mobileTmp.length: " + mobileStr.length + " mobileStr " + mobileStr);
            if (mobileStr.length > 0 && mobileStr.length < 9) {
//                debugMessage("mobileTmp2: " + mobileTmp);
                stringMessage = "lunghezza numero cellulare minima 9";
                return false;
            }
        }

        debugMessage("validateForm END --> true");
        return true;
    };
    
    let myText = document.getElementById("myText");
    let wordCount = document.getElementById("wordCount");
    $scope.notelengthmax = notelengthmax; 
    
    $scope.candidateCustom.note = myText.addEventListener("keyup",function(){
    	let characters = myText.value.split('');
      wordCount.innerText = "Caratteri rimanenti: " + (notelengthmax - characters.length); 
    });
    
    function debugMessage (message) {
    	if(debugEnabled){
    	    console.log(message);	
    	}
    }

});
