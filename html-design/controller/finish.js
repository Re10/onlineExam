app.controller("finishController",finishController);
function finishController($scope,$http, $state, $stateParams,$rootScope){
    console.log("within finish controller");
    $scope.correctQues=[];
    $scope.wrongQue=[];
    $scope.i=[];
    $scope.correctAns=window.localStorage.getItem("correct");
    $scope.wrongAns=window.localStorage.getItem("wrong");
    $scope.totque=window.localStorage.getItem("totque");
    $scope.testName=window.localStorage.getItem("testName");
    $scope.correctQue=window.localStorage.getItem("correctQue");
    $scope.wrongQues=window.localStorage.getItem("wrongQue");
  
   
    console.log( $scope.correctAns);
    console.log( $scope.wrongAns);
    console.log( $scope.que);
$scope.correctQues= $scope.correctQue.split(",");
 console.log("QUESTIONS ARE:",$scope.correctQues);
 $scope.wrongQue= $scope.wrongQues.split(",");

    $scope.result=function(){
        console.log("within result function");
        $scope.resultValue=!$scope.resultValue;
    }
}