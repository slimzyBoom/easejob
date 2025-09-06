import express from "express";
import { createUser } from "./auth.controller";
import { validationSchema } from "../common/middlewares/validate-credential.middleware";
import {
  createUserJoi,
  loginUserJoi,
  forgetPasswordJoi,
  resetPasswordJoi,
} from "./auth.joi";

const router = express.Router();

router.post("/register", validationSchema(createUserJoi, "body"), createUser);
