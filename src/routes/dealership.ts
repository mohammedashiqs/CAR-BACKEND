import express, { NextFunction } from 'express'
import { ObjectId } from 'mongodb';
import { IDealership } from '../dealership/models/IDealership';
import {dealerChangePassword, viewAllCars, addCar, addDeal, viewDeals, viewSoldCars, registerDealership, } from '../dealership/services/dealershipService'
import { ICar } from '../user/models/ICar';
import { IDeal } from '../dealership/models/IDeal';
import { body, validationResult } from 'express-validator';
import { AuthenticateToken, authorizeRole } from '../common/services/common';


const dealershipRouter: express.Router = express.Router();


/* To view all cars */
dealershipRouter.get('/cars', async (req: express.Request, res: express.Response, next) => {
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



/* To view all cars sold by dealership */
dealershipRouter.get('/sold-cars/:dealershipId', AuthenticateToken, authorizeRole('dealership'), async (req:express.Request, res: express.Response, next) => {

    try {
                let dealershipId: ObjectId = new ObjectId( req.params.dealershipId)

                let soldCars = await viewSoldCars(dealershipId)

                res.status(200).json({
                    soldCars: soldCars
                })

    } catch (error) {
        next(error)
    }

}) 


/* To add cars to dealership */
dealershipRouter.post('/add-car/:dealershipId',  AuthenticateToken, authorizeRole('dealership'), async (req: express.Request, res: express.Response, next) => {
    try{
        let dealershipId: ObjectId = new ObjectId(req.params.dealershipId)
        let car: ICar = req.body
        
        let createdCar= await addCar(dealershipId, car)

        res.status(200).json({
            msg: 'car added successfully',
            createdCar: createdCar
        })


    }catch(error){
        next(error)
    }
})




/* To view deals provided by dealership */
dealershipRouter.get('/deals/:dealershipId',  AuthenticateToken, authorizeRole('dealership'), async (req: express.Request, res: express.Response, next) => {
    try{
        let dealershipId: ObjectId = new ObjectId(req.params.dealershipId)

        
        let deals= await viewDeals(dealershipId)

        

        res.status(200).json({
            deals: deals
        })
        
    }catch(error){
        next(error)
    }
})




/* To add deals to dealership */
dealershipRouter.post('/add-deal/:dealershipId',  AuthenticateToken, authorizeRole('dealership'), async (req: express.Request, res: express.Response, next) => {
    try{
        let dealershipId: ObjectId = new ObjectId(req.params.dealershipId)
        let deal: IDeal = req.body
        
        let createdDeal= await addDeal(dealershipId, deal)

        res.status(200).json({
            msg: 'Deal added successfully',
            createdCar: createdDeal
        })


    }catch(error){
        next(error)
    }
})





dealershipRouter.post('/register', [
    body('dealership_email').not().isEmpty().withMessage('Email is required'),
    body('dealership_name').not().isEmpty().withMessage('Name is required'),
    body('dealership_location').not().isEmpty().withMessage('Location is required'),
    body('password').not().isEmpty().withMessage('Password is required')
], async (req: express.Request, res: express.Response, next:NextFunction)=>{

        let errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }

        try{
            let dealership: IDealership = req.body
            //todo registration logic

            let createdDealership = await registerDealership(dealership)
            
         
            res.status(200).json({
                msg: 'user created successfully',
                createdCar: createdDealership
            })



        }catch(error){
            next(error)
        }
})




dealershipRouter.put('/changePassword', AuthenticateToken, async (req: express.Request, res: express.Response, next: NextFunction) => {

    const userId = req.user.id
  
    try {
  
      const { oldPassword, newPassword } = req.body;
  
      const result = await dealerChangePassword(oldPassword, newPassword, userId)
  
      res.status(200).json({
        msg: result
    })
      
  
    } catch (error) {
      next(error)
    }
  })
  
  




export default dealershipRouter



