var fullPath = MAIN_BACKEND_LOCATION+ '/api/v1' ; 

var statisticsResourceApiWeek = fullPath + '/surveyreply/lastweek';
var statisticsResourceApiMonth = fullPath + '/surveyreply/lastmonth';
var statisticsResourceApiYear = fullPath + '/surveyreply/lastyear';
var statisticsResourceApiToday = fullPath + '/surveyreply/today';

var statisticsResourceApiTodaySurveyReply = fullPath + '/surveyreply/todayFilled';
var statisticsResourceApiSevenDaysSurveyReply = fullPath + '/surveyreply/lastSevenDaysFilled';
var statisticsResourceApiTodayUser = fullPath + '/candidate/todayRegistrated';
var statisticsResourceApiSevenDaysUser = fullPath + '/candidate/lastSevenDaysRegistrated';

var statisticsResourceApiYesterdaySurveyReply = fullPath + '/surveyreply/yesterdayFilled';
var statisticsResourceApiLastWeekSurveyReply = fullPath + '/surveyreply/lastWeekFilled';
var statisticsResourceApiYesterdayUser = fullPath + '/candidate/yesterdayRegistrated';
var statisticsResourceApiLastWeekUser = fullPath + '/candidate/lastWeekRegistrated';

var statisticsResourceApiCoursePageList = fullPath + '/coursepage/';
var statisticsResourceApiSurveyList = fullPath + '/survey/';
var statisticsResourceApiSurveyReplyList = fullPath + '/surveyreply/';
var statisticsResourceApiUsers = fullPath + '/user/';

var courseCodesResourceApi = fullPath + "/coursepage/codes";

var courseCodeByCodeResourceApi = fullPath+'/candidatecustom/code/';

app.controller('statisticsController', function($scope, $http, $location,$route,notice, $routeParams, $rootScope) {
var x = 0;
var y = 0;
var j = 0;
var k = 0; 
var listOfSurvey;
var listOfCandidatesForCode;
var listOfSurveyReply;



$scope.courseCode = $routeParams.code;

$scope.testa = false ;
if ($rootScope.authenticated) {
//       $location.path("/");
//       $scope.loginerror = false;
	$rootScope.authenticated= true;
} else {
       $location.path("/login");
       $scope.loginerror = true;
}




$http({
	method:'GET',
	url: courseCodesResourceApi
}).then(function(response){
	
	$rootScope.codes=(response.data);
	
},function(errResponse) {
	console.log(errResponse.data);
	console.log("() end");
});

//list of surveyreply
$http({
	method : 'GET',
	url : statisticsResourceApiSurveyReplyList
}).then(function (response){
	
	
	listOfSurveyReply = response.data;
	
	
}), function(errResponse) {
	console.log(errResponse.data);
	console.log("() end");
};


	//List of coursepage code
	$http({
		method : 'GET',
		url : statisticsResourceApiCoursePageList
	}).then(function (response){
		$scope.cursePages = response.data;
		
		
	}, function(errResponse) {
		console.log(errResponse.data);
		console.log("() end");
	});
	
	//List of surveys
	$http({
		method : 'GET',
		url : statisticsResourceApiSurveyList
	}).then(function (response){
		listOfSurvey = response.data;
		$scope.surveys = listOfSurvey;
		
		
	}, function(errResponse) {
		console.log(errResponse.data);
		console.log("() end");
	});
	
	
	$http({
		method : 'GET',
		url : courseCodeByCodeResourceApi + $scope.courseCode
	}).then(function (response){
		
		$("#chart").css("display", "none");
		$("#noContent").css("display", "inline");
		
		for(i = 0; i < listOfSurvey.length; i++){
			$("#" + listOfSurvey[i].id).empty();
		}
		
		listOfCandidatesForCode =  response.data;
		
		if(listOfCandidatesForCode.length > 0){
		
			var i;
			var x;
			var y;
			var users = [];
			var currentSurvey;
			
			for(i = 0; i < listOfSurvey.length; i++){
			
				users = [];
				currentSurveyId = listOfSurvey[i].id;
			
			
				for(x = 0; x < listOfCandidatesForCode.length; x++){
					currentUserId = listOfCandidatesForCode[x].userId;
					
					
				
					for(y = 0; y < listOfSurveyReply.length; y++){
						
						if(listOfSurveyReply[y].userId == currentUserId && listOfSurveyReply[y].surveyId == currentSurveyId && listOfSurveyReply[y].points != null){
							
							
							var start = new Date (listOfSurveyReply[y].starttime);
							var end = new Date (listOfSurveyReply[y].endtime);
							
							
							var time = calcolaTempo(start, end);
								var user = {
								id: currentUserId,
								points: listOfSurveyReply[y].points,
								tempo: time,
								firstname : listOfCandidatesForCode[x].firstname,
								lastname : listOfCandidatesForCode[x].lastname,
						}
						
						users.push(user);
					}
				}
			}
			
				
			caricaGrafico(currentSurveyId, users);
			
			
			
		}
			
		}
		else{
			
			$("#chart").css("display", "none");
			$("#noContent").css("display", "inline");
		}
			
		
		
	}, function(errResponse) {
		
		
		$("#chart").css("display", "none");
		$("#noContent").css("display", "inline");
		console.log(errResponse.data);
		console.log("() end");
	});
		
		
		
		
		function calcolaTempo(oraI, oraF) {
			
			
			var x = (oraF - oraI);
			var d = new Date(x);
			
			if(d.getSeconds() == 10 || d.getSeconds() == 20 || d.getSeconds() == 30 || d.getSeconds() == 40 || d.getSeconds() == 50) {
				var time = d.getMinutes() + "." + (d.getSeconds() + 1);//added 1 second for bug in rendering single seconds
				                                                       //i.e. 1 minute and 10 seconds was rendered 1.1
				                                                       //instead now it was rendered 1.11
				                                                       //TODO: there is a tick regulation??
			}
			
			else if(d.getSeconds() < 10) {
				var time = d.getMinutes() + ".0" + d.getSeconds();
				
			}
			
			else {
				var time = d.getMinutes() + "." + d.getSeconds();
			}
			
			return time;
			
		}
		
		
		
		
		
	
	
	function caricaGrafico(surveyId, users){
	
		if(!users.length == 0){
			$("#panel" + surveyId).css("display", "inline");
			var userId = [];
			var points = [];
			var time = [];
			var userNameAndSurname = [];
			var currentUser;
			var i;
			for(i = 0; i < users.length; i++){
				
				if(users[i].points != null){
				userNameAndSurname.push(users[i].lastname + " " + users[i].firstname);
				userId.push(users[i].id);
				points.push(users[i].points);
				time.push(users[i].tempo);
				}
			}
		
			mostraGrafico(userId, points, time, surveyId, userNameAndSurname);
		
		}
		else {
//			$("#noContent").css("display", "inline");
			$("#panel" + surveyId).css("display", "none");
			
		}
		
	}
	
	function mostraGrafico(userId, points, time, surveyId, userNameAndSurname){

		
		$("#" + surveyId).empty();
		
		
		
		if(userId != 0){
		
			$("#noContent").css("display", "none");
			$("#chart").css("display", "inline");
			
		
		
		var options = {
			     chart: {
			       height: 500,
			       type: 'line',
			       stacked: false
			     },
			     dataLabels: {
			       enabled: false
			     },
			     series: [{
			    	
			       name: 'Points',
			       type: 'column',
			       data: points
			     }, {
			    	 
			       name: 'Tempo minuti/secondi',
			       type: 'column',
			       data: time
			     }, 
			     ],
			     stroke: {
			       width: [1, 1, 4]
			     },
			     title: {
			       text: 'Punti/Tempo',
			       align: 'left',
			      
			     },
			     xaxis: {
			    	 
			    	 labels: {
			    		 minHeight: 150,
			             show: true,
			             rotate: -90,
			             
			             rotateAlways: true
			             
			    	 },		
			    	 
			       categories: userNameAndSurname,
			     },
			     yaxis: [
			       {
			         axisTicks: {
			           show: true,
			         },
			         axisBorder: {
			           show: true,
			           color: '#008FFB'
			         },
			         labels: {
			           style: {
			             color: '#008FFB',
			           }
			         },
			         title: {
			           text: "Punti",
			           style: {
			             color: '#008FFB',
			           }
			         },
			         tooltip: {
			           enabled: true
			         }
			       },

			       {
			         seriesName: 'Income',
			         opposite: true,
			         axisTicks: {
			           show: true,
			         },
			         axisBorder: {
			           show: true,
			           color: '#00E396'
			         },
			         labels: {
			           style: {
			             color: '#00E396',
			           }
			         },
			         title: {
			           text: "Tempo minuti/secondi",
			           style: {
			             color: '#00E396',
			           }
			         },
			       },
			       
			     ],
			     tooltip: {
			       fixed: {
			         enabled: true,
			         position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
			         offsetY: 30,
			         offsetX: 60
			       },
			     },
			     legend: {
			       horizontalAlign: 'left',
			       offsetX: 40
			     }
			   }

			   var chart = new ApexCharts(
			     document.getElementById(surveyId),
			     options
			   );


			   chart.render();
		
			   
		}
		
		
	
		
	}
	
	
	
	
	
	
	
	

//	SurveyReply todayFilled
	$scope.surveyReplyFilledToday=0;
	$http({
		method : 'GET',
		url : statisticsResourceApiTodaySurveyReply
	}).then(function (response) {
        console.log("surveyReplyFilledToday : " + response.data);
       $scope.surveyReplyFilledToday=(response.data);
       j = $scope.surveyReplyFilledToday;
	}, function(errResponse) {
		console.log(errResponse.data);
		console.log("() end");
	});
	
//	SurveyReply yesterdayFilled
	$scope.surveyReplyFilledYesterday=0;
	$http({
		method : 'GET',
		url : statisticsResourceApiYesterdaySurveyReply
	}).then(function (response) {
        console.log("surveyReplyFilledYesterday : " + response.data);
       $scope.surveyReplyFilledYesterday=(response.data);
       k =  $scope.surveyReplyFilledYesterday;
       calcolaPercentualeSRD();
	}, function(errResponse) {
		console.log(errResponse.data);
		console.log("() end");
	});
	
//	surveyReplyFilledLastSevenDays
	$scope.surveyReplyFilledLastSevenDays=0;
	$http({
		method : 'GET',
		url : statisticsResourceApiSevenDaysSurveyReply
	}).then(function (response) {
		console.log("surveyReplyFilledLastSevenDays : " + response.data);	
       $scope.surveyReplyFilledLastSevenDays=(response.data);
       x = $scope.surveyReplyFilledLastSevenDays;
	}, function(errResponse) {
		console.log(errResponse.data);
	});
//	surveyReplyFilledLastWeek
	$scope.surveyReplyFilledLastWeek=0;
	$http({
		method : 'GET',
		url : statisticsResourceApiLastWeekUser
	}).then(function (response) {
		console.log("surveyReplyFilledLastWeek : " + response.data);
       $scope.surveyReplyFilledLastWeek=(response.data);  
       y = $scope.surveyReplyFilledLastWeek;
 //    console.log("y : " + y);
      calcolaPercentualeSRW();
  //     console.log(y);
	}, function(errResponse) {
		console.log(errResponse.data);
	});
	
	//SurveyReply percentuale fra due settimane
	function calcolaPercentualeSRW(){
		var q = 0;
		if(y > 0){
			q = (x/y)*100;
		}
		else{
			q = 100;
		}
		q = q.toFixed(0);
		$scope.compareWeeks = q;
		console.log("x, y : " + x + " " + y + " " + $scope.compareWeeks);
	}
	//SurveyReply percentuale fra due giorni
	$scope.compareDays= 0;
	function calcolaPercentualeSRD(){
		var q = 0;
		if(k> 0){
			q = (j/k)*100;
		}
		else{
			q = 100;
		}		
		q = q.toFixed(0);
		$scope.compareDays = q;
		console.log("j, k : " + j + " " + k + " " + $scope.compareDays);
	}

	
//	USERS todayRegistrated
	var n = 0;
	$scope.todayRegistrated=0;
	$http({
		method : 'GET',
		url : statisticsResourceApiTodayUser
	}).then(function (response) {
//		  console.log("USERS todayRegistrated " + response.data);
       $scope.todayRegistrated=(response.data);
       n = $scope.todayRegistrated;
	}, function(errResponse) {
		console.log(errResponse.data);
	});
	
	//	USERS yesterdayRegistrated
	var m = 0;
	$scope.yesterdaRegistrated=0;
	$http({
		method : 'GET',
		url : statisticsResourceApiYesterdayUser
	}).then(function (response) {
//		  console.log("USERS todayRegistrated " + response.data);
       $scope.yesterdaRegistrated=(response.data);
       m = $scope.yesterdaRegistrated;
       calcolaPercentualeYT();
	}, function(errResponse) {
		console.log(errResponse.data);
	});
	
//  USERS lastSevenDaysRegistrated
	var u = 0;
	$scope.lastSevenDaysRegistrated=0;
	$http({
		method : 'GET',
		url : statisticsResourceApiSevenDaysUser
	}).then(function (response) {
//        console.log("USERS lastSevenDaysRegistrated " + response.data);
       $scope.lastSevenDaysRegistrated=(response.data);
       u = $scope.lastSevenDaysRegistrated;
       calcolaPercentualeYT();
	}, function(errResponse) {
		console.log(errResponse.data);
	});
	
//  USERS lastWeekRegistrated
	var v = 0;
	$scope.lastWeekRegistrated=0;
	$http({
		method : 'GET',
		url : statisticsResourceApiLastWeekUser
	}).then(function (response) {
//        console.log("USERS lastSevenDaysRegistrated " + response.data);
       $scope.lastWeekRegistrated=(response.data);
       v =  $scope.lastWeekRegistrated;
       calcolaPercentualeWW();
	}, function(errResponse) {
		console.log(errResponse.data);
	});
	
	//USERS percentuale fra due giorni
	function calcolaPercentualeYT(){
		var q = 0;
		if(m > 0){
			q = (n/m)*100;
		}
		else {
			q = 100;
		}	
		q = q.toFixed(0);
		$scope.compareUsersDays = q;
		console.log("compareUsersDays n, m : " + x + " " + y + " " + $scope.compareUsersDays);
	}
	//USERS percentuale fra due settimane
	function calcolaPercentualeWW(){
		var q = 0;
		if(v > 0){
			q = (u/v)*100;
		}
		else{
			q = 100;
		}
		q = q.toFixed(0);
		$scope.compareUsersWeek = q;
		console.log(" compareUsersWeek u, v : " + u + " " + v + " " + $scope.compareUsersWeek);
	}

// web site analitics Week
		$http({
			method : 'GET',
			url : statisticsResourceApiWeek
		}).then(function (response) {
//            console.log("response.data: " + response.data);
            
//            $scope.buf = {};
//            $scope.chart = {};
//            $scope.buf['chartData'] = response.data;
////         	sort dates ascending
//			$scope.buf['chartData'].sort(function(a, b) {
//				return a.date.localeCompare(b.date);
//			});
//
////			preparing array to draw
//			var dim = $scope.buf['chartData'].length;
//			var x = new Array(dim);
//			var y = new Array(dim);
//			for (var i = 0; i < dim; i++) {
//				x[i] = $scope.buf['chartData'][i].date;
//				y[i] = $scope.buf['chartData'][i].number;
//			}
            
            var dataToDraw = preparingData(response.data);
			
			// drawing the chart
			$scope.canvas = document.getElementById("lastWeekCandidatesRegistrationFlow");
			drawChart(dataToDraw[0],dataToDraw[1],'Candidati registrati negli ultimi 7 giorni','rgba(0, 204, 163,1)');
          
		}, function(errResponse) {
			notice.error(errResponse.data.errorMessage);
		});
		
// web site analitics Month	
		$http({
			method : 'GET',
			url : statisticsResourceApiMonth
		}).then(function (response) {
//            console.log("response.data: " + response.data);
            
            var dataToDraw = preparingData(response.data);
			
			// drawing the chart
			$scope.canvas = document.getElementById("lastMonthCandidatesRegistrationFlow");
			drawChart(dataToDraw[0],dataToDraw[1],'Candidati registrati negli ultimi 30 giorni','rgba(81, 166, 255,1)');
					
		}, function(errResponse) {
			notice.error(errResponse.data.errorMessage);
		});
		
// web site analitics Year
		$http({
			method : 'GET',
			url : statisticsResourceApiYear
		}).then(function (response) {
//            console.log("response.data: " + response.data);
            
            var dataToDraw = preparingData(response.data);
			
			// drawing the chart
			$scope.canvas = document.getElementById("lastYearCandidatesRegistrationFlow");
			drawChart(dataToDraw[0],dataToDraw[1],'Candidati registrati  negll\'ultimo anno','rgba(81,136,218,1)');
						          
		}, function(errResponse) {
			notice.error(errResponse.data.errorMessage);
		});
		
		
		function preparingData(data) {
			// sort dates ascending
			data.sort(function(a, b) {
				return a.date.localeCompare(b.date);
			});
			// preparing array to draw
			var dim = data.length;
			var x = new Array(dim);
			var y = new Array(dim);
			for (var i = 0; i < dim; i++) {
				x[i] = data[i].date;
				y[i] = data[i].number;
			}
			var arr = [x,y];
			return arr;
		}
		
		function drawChart(x,y,label,color){
			try {
				$scope.ctx = $scope.canvas.getContext("2d");
				$scope.chart = new Chart($scope.ctx, {
					type : 'line',
					data : {
						labels : x,
						datasets : [ {
							data : y,
//							label : label,
							label : "Candidati",
							borderColor : color, // line color
							backgroundColor : 'rgba(0,0,0,0.1)', // fill color
							fill : true, // no fill
							lineTension : 0.3
						}
						]
					},
					options : {
						tooltips : {
							enabled : true
						},
						hover : {
							mode : true
						},
						showAllTooltips : true,
						legend : {
							display : false
						}
					}
				});	
			} catch (error) {
				console.log("Problemi nella visualizzazione della chart...");
			}
			
		}
		
		
		
		
			
		
		
		



	
});
