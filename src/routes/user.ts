import express from 'express';
import {db} from '../config/db'
import {IUser} from '../user/models/IUser'
const userRouter: express.Router = express.Router();

userRouter.post('/user',async (req:express.Request, res: express.Response) => {
    let user: IUser = req.body

    
})

export default userRouter;