import Mongoose from "mongoose";

const userSchema = Mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);
const userModel = Mongoose.model("user", userSchema);
export default userModel;
