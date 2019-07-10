app.controller("testController", testController);

function testController($scope, $http, $state, $stateParams,$rootScope,$interval, $window, toastr) {
  console.log("within test Controller");
  $scope.cnt=4;
    $window.onfocus = function(){ }
  
     
    $window.onblur = function(){ 
       $scope.cnt--;
       console.log("Blur",$scope.cnt);
       if($scope.cnt > 0)
       {
        toastr.error("Don't open new tab OtherWise test Automatically close:");
       }
        if($scope.cnt === 0){
          console.log("Blur cnt is 0");
         $scope.counter=0;
         $scope.min=0;
            $state.go("finish");   
        }
}

  var id = $stateParams.id;
  $scope.checked=false;
  $scope.que=[];
  $scope.wrongQue=[];
  $scope.questionText;
  $scope.newtest;
  $scope.multipleRes;
  $scope.singleRes;
  console.log("id:::::::::::::", id);
  $scope.question = [];
  $scope.options = [];
  $scope.userOptionArra = [];
  $scope.i = 1;
  $scope.correctAns = 0;
  $scope.wrongAns;
 $scope.counter=10;
 $scope.min=10;
 var increaseCounter = function () {

  $scope.counter = $scope.counter -1;
  if($scope.counter == 0){
    $scope.counter = 10;
   $scope.min=$scope.min-1;
   if($scope.min == 5){
    toastr.error("Only 5min remaining");
  }
   if($scope.min == 0){
    $state.go("finish");
  }
}

}
$interval(increaseCounter, 1000);  
  

  $http.get("http://interviewapi.stgbuild.com/getQuizData").then(function (res) {
    console.log("within get of test", res);
  

    for (let i = 0; i < res.data.tests.length; i++) {
      console.log("Test id:", res.data.tests[i]._id);
      console.log("requested Id:", id);
      if ((res.data.tests[i]._id.toString()) === id) {
        console.log("id is same",res.data.tests[i].name);
        $scope.testname=res.data.tests[i].name;
        for (let j = 0; j < res.data.tests[i].questions.length; j++) {
          $scope.question.push(res.data.tests[i].questions[j]);

        }
        console.log("questions are", $scope.question);
      }
      else {
        console.log("Not same id");
      }

    }
    




    $scope.questionText = $scope.question[0].questionText;
    console.log("question=>", $scope.questionText);
    if ($scope.question[0].type === "Multiple-Response") {
      console.log("Mutiple res type");
      $scope.multipleRes = true;

    }
    else {
      console.log("WIRHIN WLSE BLOCK");
      $scope.multipleRes = false;

    }
    console.log("===================>", $scope.multipleRes);
    console.log("--------->", $scope.que);
    console.log("Result::::::::::::", $scope.userOptionArra);
    for (let k = 0; k < $scope.question[0].options.length; k++) {
      $scope.options.push($scope.question[0].options[k]);
    }
    console.log("options=>", $scope.options);
   
  })
  $scope.next = function (i) {
    $scope.count = 0;
    $scope.checked=false;
    console.log("value of i==>", i);
 
 
    if ($scope.userOptionArra.length === $scope.question[i - 1].correctOptionIndex.length) {
      for (let j = 0; j < $scope.question[i - 1].correctOptionIndex.length; j++) {

        console.log("Length is same");
        for (let k = 0; k < $scope.userOptionArra.length; k++) {
          console.log("corr options are", $scope.question[i - 1].correctOptionIndex[j]);
          if ($scope.question[i - 1].correctOptionIndex[j] === $scope.userOptionArra[k]) {
            $scope.count++;
          //  console.log("Count==>", $scope.count);


          }

        }
      }
      if ($scope.count === $scope.question[i - 1].correctOptionIndex.length) {
        $scope.correctAns++;
        $scope.que.push($scope.question[i - 1].questionText);
     
      }
      else{
        $scope.wrongQue.push($scope.question[i - 1].questionText);
   
      }
      console.log("Wrong question:::",$scope.wrongQue);
      console.log("Correct question:::",$scope.que)
    }
    else{
    
    /////---Redioooo---//
    if ($scope.question[i - 1].correctOptionIndex === $scope.data) {
    //  console.log("Correct Options");
      $scope.correctAns++;
     // console.log("Count Coorect ans==>", $scope.correctAns);
      $scope.que.push($scope.question[i - 1].questionText);

    }
    else{
      $scope.wrongQue.push($scope.question[i - 1].questionText);
      
    }
    console.log("Wrong question:::",$scope.wrongQue);
    console.log("Correct question:::",$scope.que)
  }
    $scope.i++;
    console.log("within next Function", $scope.i);
    console.log("Length", $scope.question.length);
    if ($scope.i <= $scope.question.length) {
      $scope.questionText = $scope.question[i].questionText;
      console.log("==========>fggfg", $scope.question[i]);
      console.log("==========>fggfg", $scope.question[i].correctOptionIndex.length);

      if ($scope.question[i].type === "Multiple-Response") {
        console.log("Mutiple res type");
        $scope.multipleRes = true;

      }
      else {
        console.log("WIRHIN WLSE BLOCK");
        $scope.multipleRes = false;

      }
      $scope.options = [];
      console.log("question=>", $scope.questionText);
      for (let k = 0; k < $scope.question[i].options.length; k++) {
        $scope.options.push($scope.question[i].options[k]);
      }
    }


    else {
      console.log("question over:");
      $scope.counter=0;
      $scope.min=0;
      $scope.cnt=2;
      $state.go("finish");
    }
    console.log("Questions are Hereeeeeeeeeeeeeeeeeeee", $scope.question.length);
    console.log("Questions are Hereeeeeeeeeeeeeeeeeeee", $scope.correctAns);
    $scope.wrongAns = $scope.question.length - $scope.correctAns;
    console.log("Wrong Answers:::::", $scope.wrongAns);
    window.localStorage.setItem('correct', $scope.correctAns);
    window.localStorage.setItem('wrong', $scope.wrongAns);
    window.localStorage.setItem('totque', $scope.question.length);
    window.localStorage.setItem('testName', $scope.testname);
    window.localStorage.setItem('que', $scope.que);
    window.localStorage.setItem('wrongQue', $scope.wrongQue);
 
  }

  $scope.data;
  $scope.check = function (event, i) {
    console.log("Event", event.target.checked);

    console.log("choicessssss", i);
    if (event.target.checked == true) {
      $scope.data = i;
      $scope.checked=true;
    }
    else {
      //  $scope.data.splice(i, 1);
      console.log($scope.data);
    }

    console.log("Result:", $scope.data);
  }
  $scope.checkoptions = function (event, i) {
    console.log("Event", event.target.checked);

    console.log("choicessssss", i);
    if (event.target.checked == true) {
      $scope.userOptionArra.push(i)
      $scope.checked=true;
    }
    else {
      $scope.userOptionArra.splice(i, 1);
      console.log($scope.userOptionArra);
    }

    console.log("Result:", $scope.userOptionArra);
  }


}



