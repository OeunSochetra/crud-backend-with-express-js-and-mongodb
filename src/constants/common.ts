import { Document } from "mongoose";

export interface IProducts {
  name: string;
  price: number;
  description: string;
  stock: number;
}

export interface IUsers extends Document {
  username: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
}
