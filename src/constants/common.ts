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

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
  image: string;
}

export interface IAuthUser {
  id: string;
}
