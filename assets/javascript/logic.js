
// 1. Initialize Firebase

var config = {
    apiKey: "AIzaSyBnj71LUdmWr6MtyF91dIfPGulpEHq8hNg",
    authDomain: "train-scheduler-1d437.firebaseapp.com",
    databaseURL: "https://train-scheduler-1d437.firebaseio.com",
    projectId: "train-scheduler-1d437",
    storageBucket: "train-scheduler-1d437.appspot.com",
    messagingSenderId: "435011077649"
  };
firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Train
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;
    // var nextArrival = childSpanshot.val().minutesAway;
  
    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
  
  //First time with one year subtracted to make sure it comes before the current time.
  var firstTrainConverted = moment(firstTrain, "hh:mm A").subtract(1, "years");
  console.log(firstTrainConverted);

  //Current time
  var currentTime = moment();
  console.log("CURRENT TIME:" + currentTime);

  //Difference between times
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  //Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  // Mins until train arrives
  var minutesAway = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + minutesAway);

  // Next train arrival time
  var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm A");
  console.log("ARRIVAL TIME: " + nextArrival);

 // Create the new row
 var newRow = $("<tr scope='row'>").append(
     $("<td>").text(trainName),
     $("<td>").text(destination),
     $("<td>").text(nextArrival),
     $("<td>").text(frequency),
     $("<td>").text(minutesAway)
 );

 // Append the new row to the table
 $("#train-scheduler-table > tbody").append(newRow);
});


  //   // Calculate the months worked using hardcore math
  //   // To calculate the months worked
  //   // var empMonths = moment().diff(moment(firstTrain, "X"), "months");
  //  //  console.log(empMonths);
  
  //   // Calculate the total billed rate
  //   // var empBilled = empMonths * frequency;
  //   //console.log(empBilled);
  
  //   // Create the new row
  //   var newRow = $("<tr>").append(
  //     $("<td>").text(trainName),
  //     $("<td>").text(destination),
  //     //$("<td>").text(firstTrainPretty),
  //     //$("<td>").text(empMonths),
  //     $("<td>").text(frequency),
  //     //$("<td>").text(empBilled)
  //   );
  
  //   // Append the new row to the table
  //   $("#employee-table > tbody").append(newRow);
  // });
  
  // // Example Time Math
  // // -----------------------------------------------------------------------------
  // // Assume Employee start date of January 1, 2015
  // // Assume current date is March 1, 2016
  
  // // We know that this is 15 months.
  // // Now we will create code in moment.js to confirm that any attempt we use meets this test case 