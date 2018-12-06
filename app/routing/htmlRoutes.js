// HTML Routes that send the correct HTML files to the correct path
// The "/" or root path sends the user to the home page
// The "/survey" path will send the user to the survey.html files

var path = require("path");

module.exports = function (app) {

    app.get("/survey", function(req, res){

        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
}