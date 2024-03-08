// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

//display current date and time in header
const now = dayjs();
setInterval(function () {
  $("#currentDay").text(dayjs().format("dddd, MMMM D YYYY, h:mm:ss"));
}, 1000);


$(function () {
  // current hour stored in a variable for comparison purposes
  var currentHour = dayjs().hour();


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  function saveTask() {
    $(".saveBtn").on("click", function () {
      var key = $(this).parent().attr('id'); //time-block id used as key
      var value = $(this).siblings(".description").val(); // textarea entry stored in value
      localStorage.setItem(key, value);
      alert("Task Saved!");
    })
  }


  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function updateTimeBlockColor() {

    //iterate over each block
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr('id').split('-')[1]); //split the id attribute of each timeblock into an array and parse the second child
      //remove any old classe
      $(this).removeClass('past present future');
      //compare blockHour to currentHour
      if (blockHour < currentHour) {
        $(this).addClass('past');
      } else if (blockHour === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    })
  }

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  function loadTask() {
    $(".time-block").each(function () {
      var key = $(this).attr("id");
      var value = localStorage.getItem(key); // retrieve the stored value
      if (value !== null) { // if value in local storage is not empty
        $(this).children('.description').val(value); // set the va
      }
    })
  }
  //
  // TODO: Add code to display the current date in the header of the page.
  $(document).ready(function () {
    saveTask();
    loadTask();
    updateTimeBlockColor();
  })
});
