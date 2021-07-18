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
      var buttonNext = document.getElementsByClassName("button-next");
      if (buttonNext[0].style.opacity == 1) {
        localStorage.setItem(
          "round",
          Number(localStorage.getItem("round")) + 1
        );
        reset();
        displayQuestion(r);
      }
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
  if (allData[localStorage.getItem("round")].answers[0] != undefined) {
    answerAreaOne.innerHTML = allData[localStorage.getItem("round")].answers[0];
  } else {
    document.getElementsByClassName("answer-1")[0].style.display = "none";
  }
  if (allData[localStorage.getItem("round")].answers[1] != undefined) {
    answerAreaTwo.innerHTML = allData[localStorage.getItem("round")].answers[1];
  } else {
    document.getElementsByClassName("answer-2")[0].style.display = "none";
  }
  if (allData[localStorage.getItem("round")].answers[2] != undefined) {
    answerAreaThree.innerHTML =
      allData[localStorage.getItem("round")].answers[2];
  } else {
    document.getElementsByClassName("answer-3")[0].style.display = "none";
  }
  if (allData[localStorage.getItem("round")].answers[3] != undefined) {
    answerAreaFour.innerHTML =
      allData[localStorage.getItem("round")].answers[3];
  } else {
    document.getElementsByClassName("answer-4")[0].style.display = "none";
  }
  var secondOver = allData[localStorage.getItem("round")].duration;
  var startTimer = setInterval(timer, 1000);
  sessionStorage.setItem("startTimer", startTimer);

  function timer() {
    var getClassListTimer = document.getElementsByClassName("locked");
    var options = document.getElementsByClassName("answer-sub-div");
    var buttonNext = document.getElementsByClassName("button-next");
    if (secondOver <= 0) {
      $.ajax({
        url: "../data/question.json",
        dataType: "json",
        type: "GET",
        success: function (r) {
          for (var answer in r[Number(localStorage.getItem("round"))].answers) {
            answer = Number(answer) + 1;
            var answerClass = document.getElementsByClassName(
              "answer-" + answer
            );
            if (Number(answer) == Number(r[0].correctAnswer)) {
              answerClass[0].classList.add("correct");
            }
          }
        },
      });
      for (i of options) {
        i.classList.add("locked");
        for (i of buttonNext) {
          $.ajax({
            url: "../data/question.json",
            dataType: "json",
            type: "GET",
            success: function (r) {
              if (r[Number(localStorage.getItem("round"))].id != r.length) {
                i.style.opacity = 1;
              } else {
                finished();
              }
            },
          });
        }
      }
      for (var actualClass of getClassListTimer[0].classList) {
        if (actualClass == "locked") {
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
  sessionStorage.setItem("selectedAnswer", selectedAnswer);
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
        sessionStorage.setItem(
          "correctAnswers",
          Number(sessionStorage.getItem("correctAnswers")) + 1
        );
        for (i of buttonNext) {
          if (r[Number(localStorage.getItem("round"))].id != r.length) {
            i.style.opacity = 1;
          } else {
            finished();
          }
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
        correct[0].classList.add("false");
        sessionStorage.setItem(
          "actualRound",
          Number(sessionStorage.getItem("actualRound")) + 1
        );
        var getClassListTimer = document.getElementsByClassName("locked");
        for (var actualClass of getClassListTimer[0].classList) {
          if (actualClass == "locked") {
            for (i of buttonNext) {
              if (r[Number(localStorage.getItem("round"))].id != r.length) {
                i.style.opacity = 1;
              } else {
                finished();
              }
            }
            stopTimer();
            return;
          }
        }
      } else {
        for (i of buttonNext) {
          if (r[Number(localStorage.getItem("round"))].id != r.length) {
            i.style.opacity = 1;
          } else {
            finished();
          }
        }
        return;
      }
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
  var buttonNext = document.getElementsByClassName("button-next");
  for (i of buttonNext) {
    i.style.opacity = 0;
  }
}
sessionStorage.setItem("actualRound", 0);
loadFile();

function finished() {
  var quizArea = document.getElementsByClassName("quiz-total");
  quizArea[0].style.opacity = 0;
  setTimeout(function () {
    quizArea[0].style.opacity = 1;
    quizArea[0].innerHTML = `
      <div class="end-div">
        <span>${sessionStorage.getItem(
          "correctAnswers"
        )} of ${sessionStorage.getItem(
      "allQuestions"
    )} answers are correct! GG!</span>
      <br>
      <button class="button-again" onclick="replay()">Play Again</button>
      </div>
    `;
  }, 1500);
}

window.onload = function setStorage() {
  localStorage.setItem("round", "0");
  sessionStorage.setItem("correctAnswers", 0);
  $.ajax({
    url: "../data/question.json",
    dataType: "json",
    type: "GET",
    success: function (r) {
      sessionStorage.setItem("allQuestions", r.length);
    },
  });
};

function replay() {
  location.reload();
}
