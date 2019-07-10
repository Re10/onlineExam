app.controller("finishController",finishController);
function finishController($scope,$http, $state, $stateParams,$rootScope){
    console.log("within finish controller");
    $scope.string=[];
    $scope.wrongQue=[];
    $scope.correctAns=window.localStorage.getItem("correct");
    $scope.wrongAns=window.localStorage.getItem("wrong");
    $scope.totque=window.localStorage.getItem("totque");
    $scope.testName=window.localStorage.getItem("testName");
    $scope.que=window.localStorage.getItem("que");
    $scope.wrongQues=window.localStorage.getItem("wrongQue");
    console.log( $scope.correctAns);
    console.log( $scope.wrongAns);
    console.log( $scope.que);
$scope.ques= $scope.que.split(",");
 console.log("QUESTIONS ARE:",$scope.ques);
 $scope.wrongQue= $scope.wrongQues.split(",");
  //  console.log("==============================================================>", $scope.que.replaceAll("^\"|\"$", ""));
    console.log("Questions are",$scope.que);
    $scope.result=function(){
        console.log("within result function");
        $scope.resultValue=!$scope.resultValue;
    }
}