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
      console.log("!same");
      var questionArea = document.getElementById("question");
      var answerAreaOne = document.getElementsByClassName("answer-1")[0];
      var answerAreaTwo = document.getElementsByClassName("answer-2")[0];
      var answerAreaThree = document.getElementsByClassName("answer-3")[0];
      var answerAreaFour = document.getElementsByClassName("answer-4")[0];
      console.error(localStorage.getItem("round"));
      questionArea.innerHTML = allData[localStorage.getItem("round")].question;
      answerAreaOne.innerHTML =
        allData[localStorage.getItem("round")].answers[0];
      answerAreaTwo.innerHTML =
        allData[localStorage.getItem("round")].answers[1];
      answerAreaThree.innerHTML =
        allData[localStorage.getItem("round")].answers[2];
      answerAreaFour.innerHTML =
        allData[localStorage.getItem("round")].answers[3];
      await sleep(3000);
      console.warn("after");
      localStorage.setItem("round", Number(localStorage.getItem("round")) + 1);
    } else {
      console.log("same");
    }
  }
}

loadFile();
