// Dependencies
const mongoose = require("mongoose");

// Reference the Schema constructor
let Schema = mongoose.Schema;

// Create Article Schema
let ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// creates the model from the schema
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
