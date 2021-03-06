//! Dependencies
var axios = require("axios");
var cheerio = require("cheerio");

//! Models
const db = require("../models");

//! Routes
module.exports = function (app) { 

    // Route to scrape the Onion website
    app.get("/scrape", function(req, res) {

  // Grab the body of the html with axios
    axios.get("https://www.theonion.com/").then(function(response) {
    // Load html into cheerio 
        var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
        $("article div a").each(function(i, element) {
        // Save an empty result object to push data into
            var result = {};

      // Add artcile data and save as properties of the result object
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
        // catch all errors
            .catch(function(err) {
          // If an error occurred, log it
            console.log("skipped");
            });
        });
        // Send a message to the client
        res.send("Scrape Complete");
    });
    });

    // Route to save Article by Id
    app.post("/save/:id", function(req, res) {
      // Update an Article to reflect saved status
      db.Article.findOneAndUpdate(
        // find the Article Id
        {"_id": req.params.id}, 
        // set object property to true
        {"$set": {"saved": true}})
      .then(function(result) {
          console.log("here")
          res.json(result);
          // catch all errors
      }).catch(function(err){ 
        res.json(err) 
      });
  });

  // route to clear db collection documents
  app.post("/clear", function (req, res) {
    db.Article.deleteMany({"saved": false})
    .then(function() {
      res.render("index")
    });
  });

  // route to remove article from saved
  app.post("/delete/:id", function(req, res) {
    // Update an Article to reflect saved status
    db.Article.findOneAndUpdate(
      // find the Article Id
      {"_id": req.params.id}, 
      // set object property to false
      {"$set": {"saved": false}})
    .then(function(result) {
        console.log("here")
        res.json(result);
        // catch all errors
    }).catch(function(err){ 
      res.json(err) 
    });
  });

  // route to save a comment 
  app.post("/articles/:id", function(req, res) {
    db.Comment.create(req.body)
    .then(function(dbComment) {
      return db.Article.findOneAndUpdate(
        { _id: req.params.id},
        { comment: dbComment._id},
        { new: true}
        )
    })
    .then(function(dbArticle) {
      res.json(dbArticle)
    })
    .catch(function(err) {
      res.json(err)
    });
  });

  // route to populate a comment into an article by id
  app.get("/articles/:id", function(req, res) {
    db.Article.findOne({_id: req.params.id})
    .populate("comment")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    }) ;
  });
  
};