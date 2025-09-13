import jwt from "jsonwebtoken";
import { IAuthToken } from "./auth.types";
const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET as string;
const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET as string;

export const generateTokens = (payload: IAuthToken) => {
  const accessToken = jwt.sign(payload, ACCESS_JWT_SECRET, { expiresIn: "4h" });
  const refreshToken = jwt.sign(payload, REFRESH_JWT_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};
