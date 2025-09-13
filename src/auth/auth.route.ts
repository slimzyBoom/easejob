import express from "express";
import { createUser, loginUser, handleOauth, setAuthRole } from "./auth.controller";
import { validationSchema } from "../common/middlewares/validate-credential.middleware";
import {
  createUserJoi,
  loginUserJoi,
  forgetPasswordJoi,
  resetPasswordJoi,
  setRoleJoi
} from "./auth.joi";
import passport from "passport";

const router = express.Router();

router.post("/register", validationSchema(createUserJoi, "body"), createUser);

router.post("/login", validationSchema(loginUserJoi, "body"), loginUser);

// Must be registered first before assigning role for both jwt and oauth
router.post("/set-role", validationSchema(setRoleJoi, "body"), setAuthRole)

router.get("/google", passport.authenticate("google", {
  scope: ["email", "profile"],
}))

router.get("/google/callback", passport.authenticate("google", { session: false }), handleOauth)

export default router;