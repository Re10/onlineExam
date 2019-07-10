app.controller("mainController", mainController);

function mainController($scope, $http, $state,$stateParams,$timeout,$window) {
    var id = $stateParams.id;
  console.log("id:::::::::::::",id);
    console.log("within main Controller");
    window.localStorage.clear();
    
 console.log("localstorage clear", window.localStorage.clear());


    $scope.test=[];
    $scope.questionsm=[];
  
    $scope.questions=[];
    $http.get("http://interviewapi.stgbuild.com/getQuizData ").then(function(res){
        console.log("res",res);
        console.log("RESPONSE NAME",res.data.tests[0].questions);
       // console.log("test",$scope.test);
        
        for(let i=0;i<res.data.tests.length;i++)
        {
            console.log("test=>",res.data.tests[i]);
             $scope.test.push(res.data.tests[i]);  
             $scope.questionsm.push(res.data.tests[i].questions); 
             console.log("length:",res.data.tests[i].questions.length); 
             $scope.questions.push(res.data.tests[i].questions.length);
        }
        console.log("test:::::", $scope.test);
        console.log("question lnegth:",$scope.questions);
       

      
    })
   
}