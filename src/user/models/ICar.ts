import { ObjectId } from "mongodb";

export interface ICar {
    _id: ObjectId,
    type: string;
    name: string;
    model: string;
    car_info : string;
    vehicle_info: object;
    createdAt?: Date;
    updatedAt?: Date;
  };



  
  