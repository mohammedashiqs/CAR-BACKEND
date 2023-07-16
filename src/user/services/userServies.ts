import collections from '../../config/collections';
import { CustomError } from "../../common/models/custumError"
import { db } from '../../config/db';
import { ObjectId } from 'mongodb';
import { IUser } from '../models/IUser';
import bcrypt from 'bcrypt'




export const createUser = async (user:IUser)=>{

    try {

        //check if the email is exists
        let userFromDb = await db.collection(collections.USER_COLLECTION).findOne({user_email: user.user_email})
        if(userFromDb){

            throw new CustomError(
                "User is Already exists",
                400,
                ""
            )
        }

        //encrypt the password
        let salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        //register the user
         user.createdAt = new Date()
         let createdUser = await db.collection(collections.USER_COLLECTION).insertOne(user)
        
         return createdUser
    } catch (error) {
        throw error
    }

}


