import { IAuthToken } from "../../auth/auth.types";

declare global {
  namespace Express {
    interface Request {
      user?: IAuthToken;
    }
  }
}
