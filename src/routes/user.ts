import express, { NextFunction } from 'express';
import {db} from '../config/db'
import {IUser} from '../user/models/IUser'
import { ObjectId } from 'mongodb';
import {body, validationResult} from 'express-validator';
import collections from '../config/collections';
import { createUser } from '../user/services/userServies';



const userRouter: express.Router = express.Router();



userRouter.post('/register', [
    body('user_email').not().isEmpty().withMessage('Email is required'),
    body('password').not().isEmpty().withMessage('Password is required'),
    body('user_location').not().isEmpty().withMessage('Location is required'),
    body('user_info.name').not().isEmpty().withMessage('Name is required')
], async (req: express.Request, res: express.Response, next:NextFunction)=>{

        let errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }

        try{
            let user: IUser = req.body
            //todo registration logic

            let createdUser = await createUser(user)
            
         
            res.status(200).json({
                msg: 'user created successfully',
                createdCar: createdUser
            })



        }catch(error){
            next(error)
        }
})




export default userRouter;