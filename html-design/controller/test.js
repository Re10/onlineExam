app.controller("testController", testController);

function testController($scope, $http, $state, $stateParams, $rootScope, $interval, $window, toastr) {
  var id;
  if (window.localStorage.setItem('id', id)) {
    id = window.localStorage.getItem('id');
  } else {
    id = $stateParams.id;
    window.localStorage.setItem('id', id);
  }
  $scope.random1;
  $scope.temparr = [];
  $scope.checked = false;
  $scope.correctQue = [];
  $scope.wrongQue = [];
  $scope.questionText;
  $scope.multipleRes;
  $scope.question = [];
  $scope.options = [];
  $scope.optionsIn = [];
  $scope.questions = [];
  $scope.userOptionArra = [];//variable for checkbox button
  $scope.i = 1;
  $scope.correctAns = 0;
  $scope.wrongAns;
  $scope.counter = 660;
  $scope.min = 10;
  $scope.cnt = 40;
  $scope.tempOption = [];
  $scope.optionsIndex = [];
  $scope.data;//variable for redio button

  //-----window focus----//
  $window.onfocus = function () { }
  //-----window Onblur----//
  $window.onblur = function () {
    $scope.cnt--;
    // console.log("Blur", $scope.cnt);
    if ($scope.cnt > 0) {
      toastr.error("Don't open new tab OtherWise test Automatically close:");
    }
    if ($scope.cnt === 0) {
      //  console.log("Blur cnt is 0");
      $scope.counter = 0;
      $scope.min = 0;
      $state.go("finish");
      $scope.cnt = 0;
    }
  }

  //---Timmer Function---//
  var increaseCounter = function () {

    $scope.counter = $scope.counter - 1;
    localStorage.setItem("counter", $scope.counter);
    if ($scope.counter == 0) {
      $scope.counter = 60;
      $scope.min = $scope.min - 1;
      localStorage.setItem("min", $scope.min);

      if ($scope.min == 5) {
        toastr.error("Only 5min remaining");
      }
      if ($scope.min == 0) {
        $state.go("finish");
      }
    }

  }
  $interval(increaseCounter, 1000);
  //====finish timmer func===//

  if (localStorage.getItem("counter")) {
    if (localStorage.getItem("min")) {
      $scope.counter = $scope.counter - 1;
      if (localStorage.getItem("counter") == 0) {
        $scope.counter = 60;
        $scope.min = $scope.min - 1;
      } else {
        $scope.counter = localStorage.getItem("counter");
        $scope.min = localStorage.getItem("min");
      }
    }
  }





  $http.get("http://interviewapi.stgbuild.com/getQuizData").then(function (res) {

    if (localStorage.getItem("indexiQue") && localStorage.getItem("questionsArray")) {
      console.log("Question Index isss:", localStorage.getItem("indexiQue"));
      $scope.queArr = JSON.parse("[" + localStorage.getItem("questionsArray") + "]");
      $scope.queArr = $scope.queArr[0];
      console.log($scope.queArr);
      console.log("within if condition value is", localStorage.getItem("indexiQue"));

      $scope.questionIndex = localStorage.getItem("indexiQue");
      console.log("refresh questionss:", $scope.questionIndex);
      for (let i = 0; i < res.data.tests.length; i++) {
        if ((res.data.tests[i]._id.toString()) === id) {
          $scope.testname = res.data.tests[i].name;
          for (let j = 0; j < res.data.tests[i].questions.length; j++) {
            $scope.questions.push(res.data.tests[i].questions[j]);

          }
        }
      }

      console.log("Refresh Ques:", $scope.questions);
      //$scope.question.push($scope.questions[$scope.questionIndex]);
      //  $scope.question.push($scope.questions);
      //  console.log("QUESTIONS ARE:",$scope.questions[$scope.questionIndex]);
      // console.log("Refresh Ques:",$scope.question[$scope.questionIndex]);
      console.log(id);
    }


    if (localStorage.getItem("questionIndex") && localStorage.getItem("randomArray")) {
      $scope.temparr = JSON.parse("[" + localStorage.getItem("randomArray") + "]");
      $scope.temparr = $scope.temparr[0];
      // console.log($scope.temparr);
      console.log("within if condition value is", localStorage.getItem("indexiQue"));

      $scope.questionIndex = localStorage.getItem("questionIndex");
      //  console.log("refresh questionss:",$scope.questionIndex);
      for (let i = 0; i < res.data.tests.length; i++) {
        if ((res.data.tests[i]._id.toString()) === id) {
          $scope.testname = res.data.tests[i].name;
          for (let j = 0; j < res.data.tests[i].questions.length; j++) {
            $scope.questions.push(res.data.tests[i].questions[j]);

          }
        }
      }

      console.log("Refresh Ques:", $scope.questions);
      //$scope.question.push($scope.questions[$scope.questionIndex]);
      //  $scope.question.push($scope.questions);
      //  console.log("QUESTIONS ARE:",$scope.questions[$scope.questionIndex]);
      // console.log("Refresh Ques:",$scope.question[$scope.questionIndex]);
      console.log(id);
    }

    else {
      for (let i = 0; i < res.data.tests.length; i++) {
        //---condition checking whether id is matched---// 
        if ((res.data.tests[i]._id.toString()) === id) {
          $scope.testname = res.data.tests[i].name;
          for (let j = 0; j < res.data.tests[i].questions.length; j++) {
            $scope.questions.push(res.data.tests[i].questions[j]);
            // console.log("Questions:::::",$scope.questions);
          }
          //====Random Question Function=====//
          $scope.randomNumber = function () {

            while ($scope.temparr.length < res.data.tests[i].questions.length) {
              for (let j = 0; j < res.data.tests[i].questions.length; j++) {
                $scope.random1 = Math.floor(Math.random() * res.data.tests[i].questions.length);

                if (!($scope.temparr.includes($scope.random1))) {
                  $scope.temparr.push($scope.random1);
                  $scope.randomNumber();
                }
              }
            }
          }
          $scope.randomNumber();
        }
      }
      // console.log("TEMPARRRR:", $scope.temparr);
      window.localStorage.setItem("randomArray", JSON.stringify($scope.temparr));
    }
    console.log("===========================================>>>>>>>>>>>>>>:", $scope.questions);
    //====Getting Index of Question====//

    for (let k = $scope.temparr.length - 1; k >= 0; k--) {
      for (let l = 0; l < $scope.questions.length; l++) {
        if ($scope.temparr[k] == l) {
          //$scope.ll= $scope.temparr[k].first();
          // console.log("questionIndex", $scope.temparr[k]);
          // window.localStorage.setItem("questionIndex",l);
          // console.log("questionIndex", $scope.questions[l]);
          $scope.question.push($scope.questions[l]);
        }

      }

    }

    console.log("Quesssssssstionsssssss:", $scope.question);
    window.localStorage.setItem("questionIndex", 0);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////

    if (localStorage.getItem("questionIndex") && localStorage.getItem("randomArray")) {
      console.log("QQQQQQQQQQQQQQQQQQQQQQQQ", $scope.question[localStorage.getItem("questionIndex")]);
      // window.localStorage.setItem("Question",$scope.question);
      $scope.questionText = $scope.question[localStorage.getItem("questionIndex")].questionText;
      console.log("question=>", $scope.questionText);
      if ($scope.question[localStorage.getItem("questionIndex")].type === "Multiple-Response") {
        console.log("Mutiple res type");
        $scope.multipleRes = true;

      }
      else {
        console.log("WIRHIN WLSE BLOCK");
        $scope.multipleRes = false;

      }

      console.log("===================>", $scope.multipleRes);
      console.log("--------->", $scope.correctQue);
      console.log("Result::::::::::::", $scope.userOptionArra);

      for (let k = 0; k < $scope.question[localStorage.getItem("questionIndex")].options.length; k++) {
        $scope.tempOption.push($scope.question[localStorage.getItem("questionIndex")].options[k]);
      }
      console.log("TepOptionsss", $scope.tempOption);
      $scope.randomNumberOption = function () {
        //  console.log("Random Option",$scope.tempOption);
        //  console.log("RAndommmTepOptionsss",$scope.tempOption.length);
        while ($scope.optionsIn.length < $scope.tempOption.length) {
          // console.log("within While loop");
          for (let j = 0; j < $scope.tempOption.length; j++) {
            $scope.random1 = Math.floor(Math.random() * $scope.tempOption.length);
            // console.log("Random Number=>", $scope.random1 );
            if (!($scope.optionsIn.includes($scope.random1))) {
              $scope.optionsIn.push($scope.random1);
              $scope.randomNumberOption();
            }
          }
        }
      }
      $scope.randomNumberOption();
      for (let i = 0; i < $scope.optionsIn.length; i++) {
        for (let k = 0; k < $scope.question[localStorage.getItem("questionIndex")].options.length; k++) {
          if ($scope.optionsIn[i] == k) {
            $scope.options.push($scope.question[localStorage.getItem("questionIndex")].options[k]);
          }

        }
      }
      console.log("Options:", $scope.options);
    }

    if (localStorage.getItem("indexiQue") && localStorage.getItem("questionsArray")) {
      $scope.options = [];
      console.log("=============Localstorage  i index Set======");
      console.log("i value within next func", localStorage.getItem("indexiQue"))
      console.log($scope.question.length)
      console.log($scope.question[localStorage.getItem("indexiQue")]);
      $scope.questionText = $scope.question[localStorage.getItem("indexiQue")].questionText;
      console.log("question=>", $scope.questionText);
      if ($scope.question[localStorage.getItem("indexiQue")].type === "Multiple-Response") {
        console.log("Mutiple res type");
        $scope.multipleRes = true;

      }
      else {
        console.log("WIRHIN Else BLOCK");
        $scope.multipleRes = false;

      }

      console.log("===================>", $scope.multipleRes);
      //  console.log("--------->", $scope.correctQue);
      // console.log("Result::::::::::::", $scope.userOptionArra);
      $scope.tempOption = [];
      $scope.options = [];
      console.log("option legth:", $scope.question[localStorage.getItem("indexiQue")].options.length);

      // for (let k = 0; k < $scope.question[localStorage.getItem("indexiQue")].options.length; k++) {
      //   console.log("here is ",$scope.question[localStorage.getItem("indexiQue")].options[k]);
      //   $scope.options.push($scope.question[localStorage.getItem("indexiQue")].options[k]);
      // }
      // console.log("options=>", $scope.options);
      for (let k = 0; k < $scope.question[localStorage.getItem("indexiQue")].options.length; k++) {
        $scope.tempOption.push($scope.question[localStorage.getItem("indexiQue")].options[k]);
      }
      console.log("TepOptionsss", $scope.tempOption);
      $scope.randomNumberOptionFun = function () {
        //  console.log("Random Option",$scope.tempOption);
        //  console.log("RAndommmTepOptionsss",$scope.tempOption.length);
        while ($scope.optionsIn.length < $scope.tempOption.length) {
          // console.log("within While loop");
          for (let j = 0; j < $scope.tempOption.length; j++) {
            $scope.random1 = Math.floor(Math.random() * $scope.tempOption.length);
            // console.log("Random Number=>", $scope.random1 );
            if (!($scope.optionsIn.includes($scope.random1))) {
              $scope.optionsIn.push($scope.random1);
              $scope.randomNumberOptionFun();
            }
          }
        }
      }
      $scope.randomNumberOptionFun();
      for (let i = 0; i < $scope.optionsIn.length; i++) {
        for (let k = 0; k < $scope.question[localStorage.getItem("indexiQue")].options.length; k++) {
          if ($scope.optionsIn[i] == k) {
            $scope.options.push($scope.question[localStorage.getItem("indexiQue")].options[k]);
          }

        }
      }
      console.log("Options:", $scope.options);


    }


  })




  //--- Next Function----//
  $scope.next = function (i) {
    // console.log(window.localStorage.getItem('indexiQue'))
    //  window.localStorage.clear();
    $scope.count = 0;
    $scope.checked = false;
    $scope.correctOpt = [];
    $scope.correctIndex = [];
    console.log("value of i==>", i, $scope.question);
    console.log("Questions:", $scope.question);
    console.log("aaaaaaaaaaaaaa of i==>", $scope.question[i - 1]);
console.log("==========================================++++++++++",$scope.question[i-1].type);
    
if($scope.question[i-1].type == "Multiple-Response"){
console .log("Type ===> Mutitype");
console.log("Original array is ======>", $scope.tempOption);
   console.log($scope.question[i - 1].correctOptionIndex.length);
    //console.log("Correct Opt value :", $scope.len);
    console.log("random array is :", $scope.options);
    for (let t = 0; t < $scope.tempOption.length; t++) {
      for(let c=0;c< $scope.question[i - 1].correctOptionIndex.length;c++){
      if (t == $scope.question[i - 1].correctOptionIndex[c]) {
        console.log("correct index ans is", $scope.tempOption[t]);
        $scope.correctOpt.push($scope.tempOption[t]);
        // console.log("optionss Arrr",$scope.options[l]);
      }
    }
  }
    console.log("here is correct answer of the question:", $scope.correctOpt);
    for (let r = 0; r < $scope.correctOpt.length; r++) {
      for (let j = 0; j < $scope.options.length; j++) {
        if ($scope.correctOpt[r] == $scope.options[j]) {
          console.log("HERE IS THE CORRECT OPT", $scope.options[j]);
          console.log("Index position iss:", j);
          $scope.correctIndex.push(j);
        }
      }
    }
    console.log("CORRECTTTTTTTTTTTTTTTTTT", $scope.correctIndex);

console.log("user Data:===>",$scope.userOptionArra);
    //-----check cond length of checkbox array is equal to correct option array-----//
    if ($scope.userOptionArra.length === $scope.correctIndex.length) {
      for (let j = 0; j < $scope.correctIndex.length; j++) {

        console.log("Length is same");
        for (let k = 0; k < $scope.userOptionArra.length; k++) {
          console.log("corr options are", $scope.correctIndex);
          if ($scope.correctIndex[j] === $scope.userOptionArra[k]) {
            $scope.count++;

          }
        }
      }
      console.log("COUNT==>",$scope.count,"+++++",$scope.correctIndex);
      if ($scope.count == $scope.correctIndex.length) {
        $scope.correctAns++;
        console.log("Correct Answer:", $scope.correctAns);
        $scope.correctQue.push($scope.question[i - 1].questionText);
      }
      else {
        console.log("Here is wrong answer");
        $scope.wrongQue.push($scope.question[i - 1].questionText);

      }
      console.log("Wrong question:::", $scope.wrongQue);
      console.log("Correct question:::", $scope.correctQue)
    }
  }
    //==== finish if condition ====//
    else {
      $scope.correctOpt=[];
      $scope.correctIndex=[];
      //---Redioooo---//
      console.log("Within else block");
      console.log("Original array is ======>", $scope.tempOption);
      //console.log($scope.question[i - 1].correctOptionIndex.length);
       //console.log("Correct Opt value :", $scope.len);
       console.log("random array is :", $scope.options);
       for (let t = 0; t < $scope.tempOption.length; t++) {
        
         if (t == $scope.question[i - 1].correctOptionIndex) {
           console.log("correct index ans is", $scope.tempOption[t]);
           $scope.correctOpt.push($scope.tempOption[t]);
           // console.log("optionss Arrr",$scope.options[l]);
         }
       
     }
       console.log("here is correct answer of the question:", $scope.correctOpt);
       for (let r = 0; r < $scope.correctOpt.length; r++) {
         for (let j = 0; j < $scope.options.length; j++) {
           if ($scope.correctOpt[r] == $scope.options[j]) {
             console.log("HERE IS THE CORRECT OPT", $scope.options[j]);
             console.log("Index position iss:", j);
             $scope.correctIndex.push(j);
           }
         }
       }
       console.log("CORRECTTTTTTTTTTTTTTTTTT", $scope.correctIndex);



      console.log("within else block===correctOptionIndex", $scope.correctIndex);
      console.log("click index", $scope.data);

      if ($scope.correctIndex == $scope.data) {
        $scope.correctAns++;
        console.log("Correct Answer:", $scope.correctAns);
        $scope.correctQue.push($scope.question[i - 1].questionText);

      }
      else {
        console.log("Here is wrong answer");
        $scope.wrongQue.push($scope.question[i - 1].questionText);

      }
      console.log("Wrong question:::", $scope.wrongQue);
      console.log("Correct question:::", $scope.correctQue)
    }
    // // === finsh else block === //

    //Here is next Logic old//
    if (window.localStorage.setItem('indexiQue', i)) {
      $scope.i = window.localStorage.getItem('indexiQue');
    } else {

      window.localStorage.setItem('indexiQue', i);
    }
    $scope.i++;
    console.log("Quesssssssstionsssssss:7777777777", $scope.question);
    window.localStorage.setItem("questionsArray", JSON.stringify($scope.question));
    console.log("within next Function", $scope.i);

    console.log("Length", $scope.question.length);
    if ($scope.i <= $scope.question.length) {
      $scope.questionText = $scope.question[i].questionText;
      console.log("==========>fggfg", $scope.question[i].correctOptionIndex.length);
      // -- check whether question type is mitiple res --//
      if ($scope.question[i].type === "Multiple-Response") {
        console.log("Mutiple res type");
        $scope.multipleRes = true;

      }
      else {
        console.log("WIRHIN WLSE BLOCK");
        $scope.multipleRes = false;

      }
      console.log("qution type is mutitipe==>", $scope.multipleRes);
      //===finish if else block===//

      $scope.options = [];
      $scope.tempOption = [];
      console.log("question=>", $scope.questionText);
      // for (let k = 0; k < $scope.question[i].options.length; k++) {
      //   $scope.options.push($scope.question[i].options[k]);
      // }

      for (let k = 0; k < $scope.question[i].options.length; k++) {
        $scope.tempOption.push($scope.question[i].options[k]);
      }
      console.log("TepOptionsss", $scope.tempOption);
      $scope.randomNumberOption = function () {
        console.log("Random Option", $scope.tempOption);
        //  console.log("RAndommmTepOptionsss",$scope.tempOption.length);
        while ($scope.optionsIn.length < $scope.tempOption.length) {
          // console.log("within While loop");
          for (let j = 0; j < $scope.tempOption.length; j++) {
            $scope.random1 = Math.floor(Math.random() * $scope.tempOption.length);
            // console.log("Random Number=>", $scope.random1 );
            if (!($scope.optionsIn.includes($scope.random1))) {
              $scope.optionsIn.push($scope.random1);
              $scope.randomNumberOption();
            }
          }
        }
      }
      $scope.randomNumberOption();
      console.log("$scope.question[i].options.length", $scope.question[i].options.length);
      console.log("Options In:", $scope.optionsIn);
      for (let l = 0; l < $scope.optionsIn.length; l++) {
        for (let k = 0; k < $scope.question[i].options.length; k++) {
          if ($scope.optionsIn[l] == k) {

            $scope.options.push($scope.question[i].options[k]);
          }

        }
      }
      console.log("Options:", $scope.options);
    }


    else {
      console.log("question over:");
      $scope.counter = 0;
      $scope.min = 0;
      $scope.cnt = 2;
      $state.go("finish");
    }
    console.log("Questions are Hereeeeeeeeeeeeeeeeeeee", $scope.question.length);
    console.log("correctAns Questions are Hereeeeeeeeeeeeeeeeeeee", $scope.correctAns);
    console.log("OPTIONSSSSSSSSSSSSSS:", $scope.options);
    $scope.wrongAns = $scope.question.length - $scope.correctAns;
    console.log("Wrong Answers:::::", $scope.wrongAns);
    window.localStorage.setItem('correct', $scope.correctAns);
    window.localStorage.setItem('wrong', $scope.wrongAns);
    window.localStorage.setItem('totque', $scope.question.length);
    window.localStorage.setItem('testName', $scope.testname);
    window.localStorage.setItem('correctQue', $scope.correctQue);
    window.localStorage.setItem('wrongQue', $scope.wrongQue);
    //   window.localStorage.setItem('index',i);
    console.log()

  }
  // ----finish of next function ----//

  // --- function for Redio button click---- //
  $scope.check = function (event, i) {
    console.log("Event", event.target.checked);

    console.log("choicessssss", i);
    if (event.target.checked == true) {
      $scope.data = i;
      $scope.checked = true;
    }

    else {
      //  $scope.data.splice(i, 1);
      console.log($scope.data);
    }

    console.log("Result:", $scope.data);
  }
  //=====finish Redio button====//
  // --- function for checkbox---- //
  $scope.checkoptions = function (event, i) {
    console.log("Event", event.target.checked);

    console.log("choicessssss", i);
    if (event.target.checked == true) {
      $scope.userOptionArra.push(i)
      $scope.checked = true;


    }

    else {
      $scope.userOptionArra.splice(i, 1);
      console.log($scope.userOptionArra);
    }

    console.log("Result:", $scope.userOptionArra);
  }
  //=====finish checkbox button====//

}



