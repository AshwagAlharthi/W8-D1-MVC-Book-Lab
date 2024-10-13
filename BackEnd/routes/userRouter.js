import express from "express";
import mongoose from "mongoose";
const router = express.Router();

import { addBook } from "../controller/bookController.js";
import { authenticateToken, GetUserByID, login, registerNewUser } from "../controller/userController.js";

// register
router.post("/register", registerNewUser);

// login
router.post("/login", login);

// add book
router.post("/addBook", authenticateToken, addBook);

// get user by id
router.get("/user/:id", GetUserByID);

export default router;