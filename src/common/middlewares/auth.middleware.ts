import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const JWT_SECRET = process.env.ACCESS_JWT_SECRET as string;
import { IAuthToken } from "../../auth/auth.types";

interface TokenPayload extends JwtPayload, IAuthToken {}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers?.["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorised: No token found" });
      return;
    }
    const token = authHeader?.split(" ")[1] as string;

    const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;

    req.user = payload;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token expired or not found" });
  }
};
