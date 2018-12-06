var friends = require("../data/friends.js")

module.exports = function(app) {

    app.get("/api/friends", function(req, res){

        res.json(friends);

    });

    app.post("/api/friends", function(req, res){

        // Adds new submission into existing friendsArray
        friends.push(req.body)
        
        var userAnswers = req.body.answers;
        var finalMatch = [];
        var tempMatch = [];
        var tempAnswers = [];
        var currentCount = 100;
        

        for (let i = 0; i < friends.length-1; i++) {
            
            tempMatch = friends[i];
            tempAnswers = friends[i].answers
            var newCount = 0;


            for (let i = 0; i < tempAnswers.length; i++) {
            
                newCount += Math.abs(parseInt(tempAnswers[i]) - parseInt(userAnswers[i]))
                
            }

            if (newCount < currentCount) {
                finalMatch.shift();
                finalMatch.push(tempMatch);
                currentCount = newCount;
            }

            
        }            
        
        console.log(currentCount);
        
        console.log(finalMatch);
        
        
        // THis will return final match
        res.json(finalMatch);

    });

};