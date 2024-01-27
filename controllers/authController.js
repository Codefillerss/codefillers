import userModels from "../models/userModels.js";
import { hashPassword, comparePassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
// Register
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //Validation
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "Email is required" });
    }
    if (!password) {
      return res.send({ error: "Password is required" });
    }
    if (!phone) {
      return res.send({ error: "Phone is required" });
    }
    if (!address) {
      return res.send({ error: "Address is required" });
    }
    //check User
    const existingUser = await userModels.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register please login",
      });
    }
    //Resgiter User
    const hashedPassword = await hashPassword(password);

    //Save
    const user = await new userModels({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    //Password Check
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login SuccessFully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

// Test
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
