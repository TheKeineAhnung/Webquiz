localStorage.setItem("round", "0");

async function loadFile() {
  $.ajax({
    url: "../data/question.json",
    dataType: "json",
    type: "GET",
    success: function (r) {
      displayQuestion(r);
    },
  });
}

async function next() {
  $.ajax({
    url: "../data/question.json",
    dataType: "json",
    type: "GET",
    success: function (r) {
      localStorage.setItem("round", Number(localStorage.getItem("round")) + 1);
      reset();
      displayQuestion(r);
    },
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function displayQuestion(allData) {
  var questionArea = document.getElementById("question");
  var answerAreaOne = document.getElementsByClassName("answer-1-span")[0];
  var answerAreaTwo = document.getElementsByClassName("answer-2-span")[0];
  var answerAreaThree = document.getElementsByClassName("answer-3-span")[0];
  var answerAreaFour = document.getElementsByClassName("answer-4-span")[0];
  questionArea.innerHTML =
    "<h1 class='h1-question'>" +
    allData[localStorage.getItem("round")].question +
    "</h1>";
  answerAreaOne.innerHTML = allData[localStorage.getItem("round")].answers[0];
  answerAreaTwo.innerHTML = allData[localStorage.getItem("round")].answers[1];
  answerAreaThree.innerHTML = allData[localStorage.getItem("round")].answers[2];
  answerAreaFour.innerHTML = allData[localStorage.getItem("round")].answers[3];
  var secondOver = allData[localStorage.getItem("round")].duration;
  var startTimer = setInterval(timer, 1000);
  sessionStorage.setItem("startTimer", startTimer);

  function timer() {
    var getClassListTimer = document.getElementsByClassName("locked");
    var options = document.getElementsByClassName("answer-sub-div");
    if (secondOver <= 0) {
      for (i of options) {
        i.classList.add("locked");
      }
      for (var actualClass of getClassListTimer[0].classList) {
        if (actualClass == "locked") {
          console.log("over");
          stopTimer();
          return;
        }
      }
    }
    secondOver--;
    var timerArea = document.getElementById("timer-time-span");
    timerArea.innerText = secondOver;
  }

  function stopTimer() {
    clearInterval(startTimer);
  }
}

function answer(selectedAnswer) {
  var options = document.getElementsByClassName("answer-sub-div");
  for (i of options) {
    i.classList.add("locked");
  }

  function stopTimer() {
    clearInterval(Number(sessionStorage.getItem("startTimer")));
  }

  $.ajax({
    url: "../data/question.json",
    dataType: "json",
    type: "GET",
    success: function (r) {
      var correct = document.getElementsByClassName("answer-" + selectedAnswer);
      var buttonNext = document.getElementsByClassName("button-next");
      if (
        selectedAnswer ==
          r[Number(localStorage.getItem("round"))].correctAnswer &&
        Number(sessionStorage.getItem("actualRound")) == 0
      ) {
        console.log("correct");
        for (i of buttonNext) {
          i.style.opacity = 1;
        }
        correct[0].classList.add("correct");
        sessionStorage.setItem(
          "actualRound",
          Number(sessionStorage.getItem("actualRound")) + 1
        );
        stopTimer();
        return;
      } else if (
        selectedAnswer !=
          r[Number(localStorage.getItem("round"))].correctAnswer &&
        Number(sessionStorage.getItem("actualRound")) == 0
      ) {
        console.log("incorrect");
        correct[0].classList.add("false");
        sessionStorage.setItem(
          "actualRound",
          Number(sessionStorage.getItem("actualRound")) + 1
        );
        var getClassListTimer = document.getElementsByClassName("locked");
        for (var actualClass of getClassListTimer[0].classList) {
          if (actualClass == "locked") {
            for (i of buttonNext) {
              i.style.opacity = 1;
            }
            console.log("over");
            stopTimer();
            return;
          }
        }
      } else {
        console.log("Mistake");
        for (i of buttonNext) {
          i.style.opacity = 1;
        }
        return;
      }
      /*for (i of buttonNext) {
        i.style.opacity = 1;
      }*/
    },
  });
}

function reset() {
  var options = document.getElementsByClassName("answer-sub-div");
  for (i of options) {
    i.classList.remove("locked");
    i.classList.remove("correct");
    i.classList.remove("false");
  }
  sessionStorage.setItem("actualRound", 0);
}
sessionStorage.setItem("actualRound", 0);
loadFile();
