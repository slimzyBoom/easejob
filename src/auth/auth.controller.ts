import { RequestHandler } from "express";
import { User } from "../user/users.schema";
import { IUser } from "../user/users.types";
import { generateTokens } from "./auth.service";
import { ILoginUser } from "./auth.types";
import bcrypt from "bcrypt";

export const createUser: RequestHandler = async (req, res) => {
  try {
    const credentials: IUser = req.body;
    const existingUser = await User.findOne({ email: credentials.email });
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(credentials.password, 10);
    const newUser = await User.create({
      fullname: credentials.fullname,
      password: hashedPassword,
      email: credentials.email,
      role: credentials.role,
    });

    const { accessToken, refreshToken } = generateTokens({
      id: newUser._id,
      role: newUser.role,
    });

    res.cookie("token", refreshToken, {
      secure: process.env.NODE_ENV ? true : false,
      sameSite: "none",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "User created ", token: accessToken });
  } catch (error) {
    const err = error as any;
    res.status(500).json({ message: err.message });
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  const credentials: ILoginUser = req.body;
  const foundUser = await User.findOne({ email: credentials.email });
  if (!foundUser) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  const comparePassword = await bcrypt.compare(
    credentials.password,
    foundUser.password
  );
  if (!comparePassword) {
    res.status(400).json({ message: "Invalid password" });
    return;
  }
  const { accessToken, refreshToken } = generateTokens({
    id: foundUser._id,
    role: foundUser.role,
  });

  res.cookie("token", refreshToken, {
    secure: process.env.NODE_ENV ? true : false,
    httpOnly: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ message: "Login successful", token: accessToken });
};
