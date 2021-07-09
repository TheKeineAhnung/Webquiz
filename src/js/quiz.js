function loadFile() {
  $.ajax({
    url: "../data/question.json",
    dataType: "json",
    type: "GET",
    success: function (r) {
      console.log(r);
    },
  });
}

loadFile();
