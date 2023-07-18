import express, { NextFunction } from 'express';
import {db} from '../config/db'
import {IUser} from '../user/models/IUser'
import { ObjectId } from 'mongodb';
import {body, validationResult} from 'express-validator';
import collections from '../config/collections';
import { createUser, viewAllCars, viewCarsInDealership, viewDealershipsWithCar, viewDealsFromDealership, viewDealsOnCar, viewOwnedVehicles } from '../user/services/userServies';
import { AuthenticateToken } from '../common/services/common';



const userRouter: express.Router = express.Router();




/* To view all cars */
userRouter.get('/cars', async (req: express.Request, res: express.Response, next) => {
    try {
        
         /* todo get all cars logic */
        let car = await viewAllCars()
       
        res.status(200).json({
            car: car
        })
    } catch (error) {
        next(error)
    }
})




/* To view all cars in a dealership */
userRouter.get('/cars/:dealershipId', async (req: express.Request, res: express.Response, next) => {
    try{
        let dealershipId: ObjectId = new ObjectId(req.params.dealershipId)

        
        let cars= await viewCarsInDealership(dealershipId)

        res.status(200).json({
            cars: cars
        })

    }catch(error){
        next(error)
    }
})





/* To view dealerships with a certain car */
userRouter.get('/dealerships/:carId', async (req: express.Request, res: express.Response, next) => {
    try{
        let carId: ObjectId = new ObjectId(req.params.carId)

        
        let dealerships= await viewDealershipsWithCar(carId)

        

        res.status(200).json({
            dealerships: dealerships
        })
        
    }catch(error){
        next(error)
    }
})






/* To view all vehicles owned by user */
userRouter.get('/owned-vehicles', AuthenticateToken, async (req:express.Request, res: express.Response, next) => {
            
    try{
        const userId = req.userId

        let ownedVehicles = await viewOwnedVehicles(userId)
        
        res.status(200).json({
            ownedVehicles: ownedVehicles
        })

    }catch(error){
        next(error)
    }

})






/* To view all deals on a certain car */
userRouter.get('/deals/:carId', async (req: express.Request, res: express.Response, next) => {
    try{
        let {userId, carId}: any = req.query

        
        let deals= await viewDealsOnCar(userId, carId)

        

        res.status(200).json({
            deals: deals
        })
        
    }catch(error){
        next(error)
    }
})




/* To view all deals from a certain dealership */
userRouter.get('/deals/dealership/:dealershipId', async (req: express.Request, res: express.Response, next) => {
    try{
        let {userId, dealershipId}: any = req.query

        
        let deals= await viewDealsFromDealership(userId, dealershipId)

        

        res.status(200).json({
            deals: deals
        })
        
    }catch(error){
        next(error)
    }
})




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