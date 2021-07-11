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
}

function answer(selectedAnswer) {
  var options = document.getElementsByClassName("answer-sub-div");
  for (i of options) {
    i.classList.add("locked");
  }
  $.ajax({
    url: "../data/question.json",
    dataType: "json",
    type: "GET",
    success: function (r) {
      var correct = document.getElementsByClassName("answer-" + selectedAnswer);
      if (
        selectedAnswer ==
          r[Number(localStorage.getItem("round"))].correctAnswer &&
        correct[0].classList[correct.length - 1] != "locked"
      ) {
        console.log("correct");
        correct[0].classList.add("correct");
      } else {
        console.log("incorrect");
        correct[0].classList.add("false");
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
}

loadFile();
