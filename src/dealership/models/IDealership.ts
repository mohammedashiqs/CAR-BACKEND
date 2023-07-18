import { ObjectId } from "mongodb"

export interface IDealership {
  dealership_email : string
  dealership_name: string
  dealership_location: string
  user_role: string
  password: string
  dealership_info: object;
  cars: ObjectId[]
  deals: ObjectId[]
  sold_vehicles: ObjectId[]
  createdAt?: Date
  updatedAt?: Date
  };
  
  