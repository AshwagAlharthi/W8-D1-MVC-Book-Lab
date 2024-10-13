import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
    author: String,
    printNumber: Number,
    publishedDate: String,
    isOnlineBook: Boolean,
    price: Number,
    languages: Array,
    category: String,

    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
