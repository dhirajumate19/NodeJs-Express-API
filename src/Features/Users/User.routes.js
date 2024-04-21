import express from "express";
import { userGet, userPost } from "./user.controller.js";

const userRouter = express.Router();

userRouter.post("/", userPost);
userRouter.get("/", userGet);
export default userRouter;
