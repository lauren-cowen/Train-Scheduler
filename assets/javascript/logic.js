// Initialize Firebase


// Initialize Firebase
var config = {
    apiKey: "AIzaSyA2E7UuI034wOINFw2lgf7JetcIlpN0754",
    authDomain: "train-scheduler-3a846.firebaseapp.com",
    databaseURL: "https://train-scheduler-3a846.firebaseio.com",
    projectId: "train-scheduler-3a846",
    storageBucket: "train-scheduler-3a846.appspot.com",
    messagingSenderId: "652096318198"
};
firebase.initializeApp(config);



var database = firebase.database();


$("#trainInfo").on("click", function(event) {
    event.preventDefault();
    var name = $("#trainName").val().trim();
    

    var dest = $("#destination").val().trim();
    

    var firstTime = $("#firstTrainTime").val().trim();
    

    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    

    var currentTime = moment();
    console.log(moment(currentTime).format("hh:mm"));
    

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");


    var freq = $("#frequency").val().trim();
  

    var tRemainder = diffTime % freq;
    

    var tMinutesTillTrain = freq - tRemainder;
   

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");
   

    database.ref().push({
        name: name,
        destination: dest,
        frequency: freq,
        nextTrainWillArive: nextTrain,
        minutesAway: tMinutesTillTrain
    })




})

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    var displayName = childSnapshot.val().name;
    var displayDest = childSnapshot.val().destination;
    var dispalyfrequency = childSnapshot.val().frequency;
    var dispalyNextTrain = childSnapshot.val().nextTrainWillArive;
    var displayMinutesAway = childSnapshot.val().minutesAway;

    $("#listofTrains > tbody").append("<tr><td>" + displayName + "</td><td>" + displayDest + "</td><td>" + dispalyfrequency + "</td><td>" + 
    	dispalyNextTrain + "</td><td>" + displayMinutesAway + "</td></tr>");



});