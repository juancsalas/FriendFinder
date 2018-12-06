// JS file uses the friends.js file to create a "api/friends" path
// as well as use the info from friends.js to do the Friend matching for the user

var friends = require("../data/friends.js")

module.exports = function(app) {

    app.get("/api/friends", function(req, res){

        res.json(friends);

    });

    app.post("/api/friends", function(req, res){

        // Adds new submission from survey into existing friendsArray in friends.js file
        friends.push(req.body)
        
        // Assigns the answer array from the user to userAnswers
        var userAnswers = req.body.answers;

        // Delcaring empty array for future use
        // finalMatch will hold the friendArray object that is the best Friend Match for user
        var finalMatch = [];

        // tempMatch holds the friendsArray object that will be compared while
        // tempAnswers holds the array of answer responses from the friendsArray as it's being compared to the user answers
        var tempMatch = [];
        var tempAnswers = [];

        // Declaring and initializing currentCount to keep count of answer comparisons/subtractions
        // setting it a high number so that the first comparison gets a guarantee push into finalMatch array
        var currentCount = 100;

        // First For loop cycles through every existing index (aka existing friend) already stored in the friendsArray Object in friends.js
        for (let i = 0; i < friends.length-1; i++) {
            
            // Assigning the current friendsArray element to tempMatch
            // Assigning the current friendsArray element answer array to tempAnswers
            tempMatch = friends[i];
            tempAnswers = friends[i].answers

            // newCount will keep track of the absolute value of answer subtraction between tempMatch and userAnswers
            var newCount = 0;

            // Second for loop cyclyes through each answer/element between tempAnswers and userAnswers
            for (let i = 0; i < tempAnswers.length; i++) {
                
                // Assigning newCount with the absolute value of tempAnswers - userAnswers
                // and adding to newCount as the For loop goes through the array
                newCount += Math.abs(parseInt(tempAnswers[i]) - parseInt(userAnswers[i]))
                
            }

            // Checks if the newCount is less than the currentCount
            // before the first For loop continues to the next index of friendsArray object from friends.js
            if (newCount < currentCount) {

                // If condition is met, the current element in the finalMatch object is removed
                // The object in tempMatch variable is pushed into finalMatch
                // currentCount is assigned and replaced with newCount
                finalMatch.shift();
                finalMatch.push(tempMatch);
                currentCount = newCount;
            }
        }            
            
        // When the first For loop is completed, finalMatch will have the object that is closest to the user's answers
        // It will include the name and image to display in the Modal in the survey.html
        res.json(finalMatch);

    });

};