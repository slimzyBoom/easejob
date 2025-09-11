import { Roles } from "../types/roles.enum";
import { IAuthToken } from "../../auth/auth.types";
import { Request, Response, NextFunction } from "express";


// A middleware that verifies roles
export const verifyRoles = (...allowedRoles: Roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as IAuthToken;
      if (!user) {
        res.status(401).json({ message: "Unauthorised" });
        return;
      }
      if (!allowedRoles.includes(user.role as Roles)) {
        res.status(403).json({ message: "Forbiden: Not allowed to access" });
        return;
      }
      next();
    } catch (error) {
      const err = error as any;
      res.status(500).json({ message: err.message });
    }
  };
};
