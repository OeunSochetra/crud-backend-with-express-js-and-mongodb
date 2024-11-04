import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import { IAuth } from "../constants/common";

const AuthSchema: Schema<IAuth> = new Schema(
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

AuthSchema.pre<IAuth>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

AuthSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export const Auth = mongoose.model<IAuth>("Auth", AuthSchema);
