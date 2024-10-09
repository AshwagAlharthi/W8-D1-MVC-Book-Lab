import express from "express";
import mongoose from "mongoose";
import Book from "./model/book.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("I am Connected");
}

// get all
app.get("/books", (req, res) => {
  Book.find()
    .then((result) => {
      res.send(result);
    })
    .catch(() => {
      res.send("Error in get all");
    });
});

// post
app.post("/books", (req, res) => {
  const book = new Book({
    bookName: req.body.bookName,
    author: req.body.author,
    printNumber: req.body.printNumber,
    publishedDate: req.body.publishedDate,
    isOnlineBook: req.body.isOnlineBook,
    price: req.body.price,
    languages: req.body.languages,
    category: req.body.category,
  });
  book
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch(() => {
      res.send("Error in post");
    });
});

// patch
app.patch("/books/:id", (req, res) => {
  const { id } = req.params;
  Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((result) => {
      res.send(result);
    })
    .catch(() => {
      res.send("Error in patch");
    });
});

// delete
app.delete('/books/:id',(req,res)=>{
    const {id} = req.params
    Book.findByIdAndDelete(id)
    .then((result)=>{
        res.send(result);
    })
    .catch(()=>{
        res.send("Error in delete")
    })
})

// get by id
app.get('/books/:id',(req,res)=>{
    const {id} = req.params
    Book.findById(id)
  
    .then((result)=>{
      res.send(result);
    })
    .catch(()=>{
      res.send("Error in get by id");
    });
  })


// listen
app.listen(process.env.PORT, () => {});
