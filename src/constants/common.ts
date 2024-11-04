import { Document } from "mongoose";

export interface IProducts {
  name: string;
  price: number;
  description: string;
  stock: number;
}

export interface IBooks {
  image: string;
  author: string;
  title: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  stock: number;
}

export interface IAuth extends Document {
  username: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
}
