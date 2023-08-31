const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/bookmodel")
const cors = require("cors")

const app = express();

const PORT = 5000;
const MONGOURI = "mongodb://127.0.0.1:27017/Book";

app.use(express.json())
app.use(cors())

// fetch the all the data form the backend 

app.get("/data", async (req, res) => {
    try {
      const response = await Book.find({});
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }
  });

  // add the book in the database

  app.post("/data", async (req, res) => {
    try {
      const newBook = req.body; // Assuming the request body contains the new book data
      const book = new Book(newBook);
      const savedBook = await book.save();
      res.status(201).json(savedBook);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }
  });
  

  // it will delete the book by its id

// Assuming you have already defined the Book model and connected to MongoDB
// const Book = require('./models/book'); // Import the Book model

app.delete("/data/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully", deletedBook });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// updates the data 
app.put("/data/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updatedBookData = req.body; // Assuming the request body contains the updated book data
    const updatedBook = await Book.findByIdAndUpdate(_id, updatedBookData, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book updated successfully", updatedBook });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});


app.get("/", (req, res) => {
    res.send("HOme page")
})
  

mongoose
  .connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  })
  .catch((err) => console.log(err));
