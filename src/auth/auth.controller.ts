import { RequestHandler } from "express";
import { User } from "../user/users.schema";
import { IUser } from "../user/users.types";
import { generateTokens } from "./auth.service";
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
    });
    res.status(201).json({ message: "User created", data: newUser });
  } catch (error) {
    const err = error as any;
    res.status(500).json({ message: err.message });
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  const credentials = req.body;
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
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ message: "Login successful", token: accessToken });
};

// Set the user role after registration and if not set before 
export const setAuthRole: RequestHandler = async (req, res) => {
  try {
    const { role, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "No email or invalid email " });
      return;
    }
    if (user.role !== null) {
      res.status(409).json({ message : 'User role have been set before'})
      return
    }
    user.role = role;
    await user.save()

    const { accessToken, refreshToken } = generateTokens({
      id: user._id,
      role: user.role,
    });

    res.cookie("token", refreshToken, {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ message: "User role saved", token: accessToken });
  } catch (error) {
    const err = error as any;
    res.status(500).json({ message: err.message });
  }
};

export const handleOauth: RequestHandler = async (req, res) => {
  try {
    const oAuthPayload = req.user;

    if (!oAuthPayload) {
      res.status(403).json({ message: "Forbidden: Not allowed to access " });
      return;
    }
    if (!oAuthPayload.hasRole) {
      res
        .status(201)
        .json({ message: "User regsitered", data: req.user?.credentials });
      return;
    }

    const accessToken = req.user?.tokens?.accessToken as string;
    const refreshToken = req.user?.tokens?.refreshToken as string;

    res.cookie("token", refreshToken, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      messsage: "User logged in",
      token: accessToken,
    });
  } catch (error) {
    const err = error as any;
    res.status(500).json({ message: err.message });
  }
};
