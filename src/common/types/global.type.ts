import { IUserDocument } from "../../user/users.schema";

declare global {
  namespace Express {
    interface User {
      id?: string;
      role?: string;
      hasRole?: boolean;
      credentials?: IUserDocument;
      tokens?: {
        accessToken: string;
        refreshToken: string;
      };
    }
  }
}
