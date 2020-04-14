//! Dependencies

const express = require("express");
const exphbs = require("express-handlebars")
const mongoose = require("mongoose");
const logger = require("morgan");
const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path")


//! Models
const db = require("./models");

//! Initialize Express
const app = express();
var PORT = process.env.PORT || 3000;

//! Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "/views/partials")
  })
);
app.set("view engine", "handlebars");


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

module.exports = app;

//! Routes
require("./controllers/htmlRoutes")(app);
require("./controllers/apiRoutes")(app);

// // route to display saved articles
// app.get("/saved", function(req, res){
//   db.Article.find({
//     "saved":true
//   }).then(function(result){
//     var hbsSaved = {
//       articles: result
//     }
//     res.render()
//   }).catch(function(err) { res.json(err) });
// });

// // route to clear all articles


// // route to clear an article by id
// app.post("/clear:id",function(req, res) {
//   db.Article.findByIdAndRemove({
//     "_id": req.params.id
//   }).then(function(result){
//     console.log("entry removed")
//   });
// });

// // route to save an article by id

// // route to save a comment on an article
// app.post("/submit", function(req, res) {
//   db.Comment.create(req.body)
//   .then(function(dbComment){
//     return db.Article.findOneAndUpdate({}, { $push: { comments: dbComment._id}}, { new: true});
//   })
// })

//! Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
