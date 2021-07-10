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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

localStorage.setItem("round", "0");

async function displayQuestion(allData) {
  for (i of allData) {
    if (Number(localStorage.getItem("round")) <= allData.length - 1) {
      var questionArea = document.getElementById("question");
      var answerAreaOne = document.getElementsByClassName("answer-1")[0];
      var answerAreaTwo = document.getElementsByClassName("answer-2")[0];
      var answerAreaThree = document.getElementsByClassName("answer-3")[0];
      var answerAreaFour = document.getElementsByClassName("answer-4")[0];
      questionArea.innerHTML =
        "<h1 class='h1-question'>" +
        allData[localStorage.getItem("round")].question +
        "</h1>";
      answerAreaOne.innerHTML =
        "<button class='button-answer'>" +
        allData[localStorage.getItem("round")].answers[0] +
        "</button>";
      answerAreaTwo.innerHTML =
        "<button class='button-answer'>" +
        allData[localStorage.getItem("round")].answers[1] +
        "</button>";
      answerAreaThree.innerHTML =
        "<button class='button-answer'>" +
        allData[localStorage.getItem("round")].answers[2] +
        "</button>";
      answerAreaFour.innerHTML =
        "<button class='button-answer'>" +
        allData[localStorage.getItem("round")].answers[3] +
        "</button>";
      await sleep(3000);
      console.log("change");
      localStorage.setItem("round", Number(localStorage.getItem("round")) + 1);
      if (Number(localStorage.getItem("round")) > allData.length - 1) {
        localStorage.setItem(
          "round",
          Number(localStorage.getItem("round") - 1)
        );
      }
    } else {
    }
  }
}

function answer(selectedAnswer) {
  $.ajax({
    url: "../data/question.json",
    dataType: "json",
    type: "GET",
    success: function (r) {
      if (
        selectedAnswer == r[Number(localStorage.getItem("round"))].correctAnswer
      ) {
        console.log("correct");
      } else {
        console.log("incorrect");
      }
    },
  });
}

loadFile();
