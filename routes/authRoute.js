import express from "express";
import registerController from "../controllers/authController.js";
import loginController from "../controllers/loginController.js";
//Routes Object
const router = express.Router();

//Routing

//Register || Method Post
router.post("/register", registerController);

//Login || POST
router.post("/login", loginController);

export default router;
