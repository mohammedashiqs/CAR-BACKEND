import express from 'express'
import { ObjectId } from 'mongodb';
import { IDealership } from '../dealership/models/IDealership';
import {getCars, getDealership } from '../dealership/services/dealershipService'


const dealershipRouter: express.Router = express.Router();


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



export default dealershipRouter



