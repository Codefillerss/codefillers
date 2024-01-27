import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//Routes Object
const router = express.Router();

//Routing

//Register || Method Post
router.post("/register", registerController);

//Login || POST
router.post("/login", loginController);

//Login || POST
router.get("/test", requireSignIn, isAdmin, testController);

export default router;
