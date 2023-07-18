import { ObjectId } from "mongodb";

export interface IUser {
  user_email: string;
  user_location: string;
  user_info: object;
  user_role: string;
  password : string;
  vehicle_info: ObjectId[];
  createdAt?: Date
  updatedAt?: Date
};



