import jwt from 'jsonwebtoken'
import collections from '../config/collections'
import { db } from '../config/db'


const generateTokens = async (payload: any, userId: any) => {

    try {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20d' })
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)


        //remove refresh token if already present in this user

        await db.collection(collections.USERTOKEN_COLLECTION).deleteOne({ userId: userId })

        //store refresh token in database
        await db.collection(collections.USERTOKEN_COLLECTION).insertOne({
            userId: userId, token: refreshToken, createdAt: new Date()
        })

        return Promise.resolve({accessToken, refreshToken})


    } catch (error) {
        return Promise.reject(error)
    }

}






export default generateTokens