//! Dependencies

var express = require("express");
var exphbs = require("express-handlebars")
var mongoose = require("mongoose");
var logger = require("morgan");
var axios = require("axios");
var cheerio = require("cheerio");


//! Models
var db = require("./models");


//! Initialize Express
var app = express();
var PORT = process.env.PORT || 3000;

//! Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "hbs");


//! Middleware
// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

//!  Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

//! Routes
// require("./controllers/controllers")(app);
// require("./controllers/scraper")(app);

module.exports = app;



// A GET route for scraping the Onion website
app.get("/scrape", function(req, res) {
  // Grab the body of the html with axios
  axios.get("https://www.theonion.com/").then(function(response) {
    // Load html into cheerio 
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("article div a").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("h4")
        .text();
      result.link = $(this)
        .attr("href");
    result.summary = $(this)
        .children("p")
        .text();
        

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});


    // Send a message to the client
    res.send("Scrape Complete");
  });
});


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
