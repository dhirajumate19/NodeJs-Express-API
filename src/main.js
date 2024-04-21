import express from "express";
import mongoose from "mongoose";
import userRouter from "./Features/Users/User.routes.js";

//Declraring Port
const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/myecommerce")
  .then(() => {
    console.log("Db connected SuccessFully");
  })
  .catch((err) => {
    console.log("Db not Connected", err);
  });

//creates an instance of an Express application,
// allowing you to build web applications using the Express framework in Node.js.
const app = express();
// sets up a rule for your Express application to understand and handle data sent to it in JSON format.
app.use(express.json());
app.use("/user", userRouter);

//This starts the Express application and instructs it to listen for incoming
// HTTP requests on the specified port (PORT).
app.listen(PORT, () => {
  console.log(`The Surver is runnig on localhost:${PORT}`);
});
