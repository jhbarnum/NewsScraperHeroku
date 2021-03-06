// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
   
    // Display the apropos information on the page
    $("#articles").append("<p class='article' data-id='" + data[i]._id + "'>" + 
      data[i].title + "<br />" + 
      "<a href=" + data[i].link + "> " + data[i].link + "</a> " + "<br />" +
      "<button class='btn' id='noteBtn' data-id=" + data[i]._id + ">Article Notes</button>" +
      "<button class='btn' id='save'  data-id=" + data[i]._id + ">Save Article</button>" +
      "<button class='btn' id='delete'  data-id=" + data[i]._id + ">Delete Article</button>" + "</p>");
  }
  console.log(data)
});
                                     //db.places.remove({ "country": "Morocco" })

// Whenever someone clicks a note button
$(document).on("click", "#noteBtn", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      //data = data[0];
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "#save", function () {
  window.location.reload();
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/saved/" + thisId,
    
  })
    .then(function (data) {
      // Log the response
      console.log(data);
    });

});

$(document).on("click", "#delete", function () {
  var thisId = $(this).attr("data-id");
  console.log("DELETED");
  window.location.reload();
  $.ajax({
    method: "DELETE",
    url: "/articles/" + thisId, 
  }) 
    .then(function (data) {   
    });
});

// CLEAR DATABASE button clicked
$(document).on("click", "#cleardb", function () {
  $.ajax({
    method: "GET",
    url: "/delete"
  })
    .then(function () {
      window.location = "/";
      window.location.reload();
    });
});


$.getJSON("/saved", function (data) {
  
  // For each one
  for (var i = 0; i < data.length; i++) {
  //for (var i = data.length; i > 0; i--) {
    // Display the apropos information on the page
    $("#saved").append("<p class='article' data-id='" + data[i]._id + "'>" +
      data[i].title + "<br />" +
      "<a href=" + data[i].link + "> " + data[i].link + "</a> " + "<br />" +
      "<button class='btn' id='noteBtn' data-id=" + data[i]._id + ">Article Notes</button>" +
      "<button class='btn' id='delete'  data-id=" + data[i]._id + ">Delete Article</button>" + "</p>");
  }
  console.log(data)
});