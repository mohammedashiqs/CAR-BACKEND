import collections from "../../config/collections"
import { db } from "../../config/db"
import { CustomError } from "../models/custumError"
import bcrypt from 'bcrypt'
import generateTokens from "../../utilty/generateTokens"
import { IUser } from "../../user/models/IUser"


const check_email_exists = async (email: string) => {

    let user_exists = await db.collection(collections.USER_COLLECTION).findOne({ user_email: email })
    if (!user_exists) {
        let dealership_exists = await db.collection(collections.DEALERSHIP_COLLECTION).findOne({ dealership_email: email })
        return dealership_exists
    }
    return user_exists


}





export const login = async (email: string, password: string) => {

    try {

        //check for email
        let user_type = await check_email_exists(email)

        if (!user_type) {
            throw new CustomError(
                "Invalid Email",
                401,
                ""
            )
        }

        //check for password
        let isMatch: boolean = await bcrypt.compare(password, user_type.password)
        if (!isMatch) {
            throw new CustomError(
                'Invalid Password',
                401,
                ""
            )
        }

        //create a token and send

        let payload: any = {
            user: {
                id: user_type._id,
                user_role: user_type.user_role
            }
        }

        //generate access token and refresh token

        const tokens = await generateTokens(payload, user_type._id)

        const { accessToken, refreshToken } = tokens

        return { accessToken, refreshToken }

    } catch (error) {
        throw error
    }
}


export const logout = async (refreshToken: string) => {
    try {
        const userToken = await db.collection(collections.USERTOKEN_COLLECTION).findOne({ token: refreshToken })
       
        if (!userToken) {

            return 'Logged out successfullyjj'

        } else {
          await db.collection(collections.USERTOKEN_COLLECTION).deleteOne({ token: refreshToken })
            return 'Logged out successfully'
        }


    } catch (error) {
        throw error
    }
}




export const registerUser = async (user: IUser) => {

    try {

        //check if the email is exists
        let userFromDb = await db.collection(collections.USER_COLLECTION).findOne({ user_email: user.user_email })
        if (userFromDb) {

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
        user.user_role = "user"
        let createdUser = await db.collection(collections.USER_COLLECTION).insertOne(user)

        return createdUser
    } catch (error) {
        throw error
    }

}



