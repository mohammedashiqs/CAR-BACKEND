import { ObjectId } from "mongodb";

export interface IUserToken{
    userId: ObjectId;
    token: string
}