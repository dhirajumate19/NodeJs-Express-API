import userModel from "./User.model.js";
export const userPost = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userRequest = new userModel({ name, email });
    const dbResponse = await userRequest.save();
    res.status(200).send(dbResponse);
  } catch (error) {
    res.status(400).send("Try again later", error);
  }
};

export const userGet = async (req, res) => {
  try {
    const dbResponse = await userModel.find({ isActive: true });
    res.status(200).send(dbResponse);
  } catch (error) {
    res.send(error);
  }
};
