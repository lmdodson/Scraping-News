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


//! Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
