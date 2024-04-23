import express from "express";
import mongoose from "mongoose";
import { rateLimit } from "express-rate-limit";
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

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
  message: {
    message: "You have exceeded the API limit. Please contact admin",
  },
});
//creates an instance of an Express application,
// allowing you to build web applications using the Express framework in Node.js.
const app = express();
// sets up a rule for your Express application to understand and handle data sent to it in JSON format.
app.use(express.json());
app.use(limiter);
app.use("/user", userRouter);

//This starts the Express application and instructs it to listen for incoming
// HTTP requests on the specified port (PORT).
app.listen(PORT, () => {
  console.log(`The Surver is runnig on localhost:${PORT}`);
});
