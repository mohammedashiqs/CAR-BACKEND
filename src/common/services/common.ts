import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'




declare global{
    namespace Express{
        interface Request {
                user: {id: ObjectId, user_role: string}
        }
    }
}


export const AuthenticateToken = (req: Request, res: Response, next: NextFunction) => {

    const authHeader: string | undefined = req.headers['authorization']
    const token: string | undefined = authHeader && authHeader.split(' ')[1]

    if(token == null) return res.status(401).json({msg: 'Access denied. No token provided.' })
    
    let {ACCESS_TOKEN_SECRET} = process.env
    if(ACCESS_TOKEN_SECRET){
    jwt.verify(token, ACCESS_TOKEN_SECRET , (err) =>{
        if(err) return res.status(403).json({msg: 'Invalid or expired token' })

        const decodedUser = jwt.decode(token, { complete: true });
        const payload: any = decodedUser?.payload
        req.user =  payload.user
        req.user.id = new ObjectId(payload.user.id)
        next()
    })
}

}

export const authorizeRole = (requiredRole: string) => (req: Request, res: Response, next: NextFunction)=>{
        const {user_role} = req.user
        console.log(user_role)
        if(user_role !== requiredRole){
            return res.status(403).json({msg: 'Unauthorized access.'})
        }

        next()
}




