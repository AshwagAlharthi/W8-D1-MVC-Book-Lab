import Book from "../model/book.js";
import User from "../model/user.js";

// add book
export const addBook = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const book = new Book({
      bookName: req.body.bookName,
      author: req.body.author,
      printNumber: req.body.printNumber,
      publishedDate: req.body.publishedDate,
      isOnlineBook: req.body.isOnlineBook,
      price: req.body.price,
      languages: req.body.languages,
      category: req.body.category,
      writer: user._id,
    });

    await book.save();
    console.log("New Book Added:", book);
    user.books.push(book._id);
    console.log("User books before saving:", user.books);
    await user.save();

    res.status(201).json({
      message: "Book Added successfully",
      book: book,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Error adding book", error });
  }
};
