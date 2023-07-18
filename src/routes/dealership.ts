import express from 'express'
import { ObjectId } from 'mongodb';
import { IDealership } from '../dealership/models/IDealership';
import {addDeal, createCar, viewDeals, viewSoldCars, } from '../dealership/services/dealershipService'
import { ICar } from '../user/models/ICar';
import { IDeal } from '../dealership/models/IDeal';
import { viewAllCars } from '../user/services/userServies';


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
dealershipRouter.get('/sold-cars/:dealershipId', async (req:express.Request, res: express.Response, next) => {

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
dealershipRouter.post('/add-car/:dealershipId', async (req: express.Request, res: express.Response, next) => {
    try{
        let dealershipId: ObjectId = new ObjectId(req.params.dealershipId)
        let car: ICar = req.body
        
        let createdCar= await createCar(dealershipId, car)

        res.status(200).json({
            msg: 'car added successfully',
            createdCar: createdCar
        })


    }catch(error){
        next(error)
    }
})




/* To view deals provided by dealership */
dealershipRouter.get('/deals/:dealershipId', async (req: express.Request, res: express.Response, next) => {
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
dealershipRouter.post('/add-deal/:dealershipId', async (req: express.Request, res: express.Response, next) => {
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



export default dealershipRouter



