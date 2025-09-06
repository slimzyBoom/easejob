import { RequestHandler } from "express";
import { createUserService } from "./auth.service";

export const createUser: RequestHandler = async (req, res) => {
  try {
    const credentials = req.body;
    const user = await createUserService(credentials);
    res.status(201).json({ message: "User created ", data: user });
  } catch (error) {
    const err = error as any;
    res.status(500).json({ message: err.message });
    throw err;
  }
};
