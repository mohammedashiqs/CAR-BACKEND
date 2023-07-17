import collections from "../../config/collections"
import { db } from "../../config/db"
import { IUser } from "../../user/models/IUser"
import { CustomError } from "../models/custumError"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import generateTokens from "../../utilty/generateTokens"






export const login = async (user_email: string, password: string) => {

    try {

        //check for email
        let user: any  = await db.collection(collections.USER_COLLECTION).findOne({user_email:user_email})

        if(!user){
            throw new CustomError(
                "Invalid Email",
                401,
                ""
            )
        }

        //check for password
        let isMatch: boolean = await bcrypt.compare(password, user.password)
        if(!isMatch){
            throw new CustomError(
                'Invalid Password',
                401,
                ""
            )
        }
        
        //create a token and send

        let payload: any = {
            user:{
                id: user._id,
                name: user.user_info.name
            }
        }

        //generate access token and refresh token

        const  tokens  =  await generateTokens(payload, user._id)

        const {accessToken, refreshToken} = tokens
         
        return {accessToken, refreshToken}

    } catch (error) {
        throw error
    }
} 