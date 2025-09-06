import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./users.types";

export interface IUserDocument extends Document, IUser {}

const UserSchema = new Schema<IUserDocument>({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["employer", "job-seeker", "agent"],
  },
});

export const User = mongoose.model<IUserDocument>("User", UserSchema);
