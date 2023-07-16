import { ObjectId } from "mongodb";
export interface IDeal {
    carId: ObjectId;
    dealInfo: object;
    createdAt?: Date
    updatedAt?: Date
  };
  
  