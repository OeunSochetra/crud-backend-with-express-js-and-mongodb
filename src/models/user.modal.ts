import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import { IUsers } from "../constants/common";

const UserSchema: Schema<IUsers> = new Schema(
  {
    username: {
      type: String,
      required: [true, "User name is required"],
    },
    password: {
      type: String,
      required: [true, "User password is required"],
    },
  },
  { timestamps: true }
);

UserSchema.pre<IUsers>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model<IUsers>("User", UserSchema);
