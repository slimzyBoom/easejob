import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./users.types";

export interface IUserDocument extends Document, IUser {
  _id: mongoose.Types.ObjectId
}

const UserSchema = new Schema<IUserDocument>({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
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
