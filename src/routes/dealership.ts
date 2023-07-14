import express from 'express'
import { ObjectId } from 'mongodb';
import { IDealership } from '../dealership/models/IDealership';
import {createCar, getCars, getDealership } from '../dealership/services/dealershipService'
import { ICar } from '../car/models/ICar';


const dealershipRouter: express.Router = express.Router();

/* To view all cars in a dealership - user ends */
dealershipRouter.get('/cars/:dealershipId', async (req: express.Request, res: express.Response, next) => {
    try{
        let dealershipId: ObjectId = new ObjectId(req.params.dealershipId)

        
        let cars= await getCars(dealershipId)

        res.status(200).json({
            cars: cars
        })

    }catch(error){
        next(error)
    }
})


/* To view dealerships with a certain car - user end */
dealershipRouter.get('/dealership/:carId', async (req: express.Request, res: express.Response, next) => {
    try{
        let carId: ObjectId = new ObjectId(req.params.carId)

        
        let dealerships= await getDealership(carId)

        

        res.status(200).json({
            dealerships: dealerships
        })
        
    }catch(error){
        next(error)
    }
})




/* To add cars to dealership */
dealershipRouter.post('/addCars/:dealershipId', async (req: express.Request, res: express.Response, next) => {
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



export default dealershipRouter



