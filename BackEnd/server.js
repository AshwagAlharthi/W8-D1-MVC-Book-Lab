import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/userRouter.js";
dotenv.config();

const app = express();
app.use(express.json());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("I am Connected");
}

app.use('/api/user', router)

// listen
app.listen(process.env.PORT, () => {});
