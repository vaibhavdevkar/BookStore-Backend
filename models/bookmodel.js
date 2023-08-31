const mongoose = require("mongoose");

const Bookdata = mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  }
});

const Book = mongoose.model("Book", Bookdata);

module.exports = Book;
