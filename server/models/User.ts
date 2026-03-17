import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  fullname: string;
  email: string;
  password?: string;
  role?: "employee" | "organization";
  provider: "local" | "google" | "apple";
  providerId?: string;
  isProfileComplete: boolean;
  refreshToken?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return this.provider === "local";
      },
    },
    role: {
      type: String,
      enum: ["organization", "employee"],
      default: null,
    },
    provider: {
      type: String,
      enum: ["local", "google", "apple"],
      default: "local",
    },
    providerId: { type: String },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
    refreshToken: { type: String, select: false },
    avatar: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);
