//! Dependencies

const express = require("express");
const exphbs = require("express-handlebars")
const mongoose = require("mongoose");
const logger = require("morgan");
const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path")


//! Models
const db = require("../models");

module.exports = function (app) {

// route to render the home page and pass in articles from the db  
  app.get("/", function(req, res) {
    db.Article.find({"saved": false}, function(error, data) {
    // Throw any errors to the console
      if (error) {
      console.log(error);
      } else{
        var hbsObject = {
        news: data,
        };
      console.log(hbsObject);
      res.render("index", hbsObject);
      };
    });
  });




};