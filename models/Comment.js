// Dependencies
const mongoose = require("mongoose");

// Save a reference to the Schema constructor
let Schema = mongoose.Schema;

// CommentSchema Object
let CommentSchema = new Schema({
  title: String,
  body: String
});

// creates the model from the schema
let Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = Comment;
