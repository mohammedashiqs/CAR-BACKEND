import express, { NextFunction } from 'express';
import { ICar } from '../car/models/ICar';
import { getAllCars, getOwnedVehicles } from '../car/services/carService';
import { ObjectId } from 'mongodb';


const carRouter: express.Router = express.Router()


carRouter.get('/car', async (req: express.Request, res: express.Response, next) => {
    try {
        
         /* todo get all cars logic */
        let car = await getAllCars()
       
        res.status(200).json({
            car: car
        })
    } catch (error) {
        next(error)
    }
})


/* To view all vehicles owned by user */
carRouter.get('/ownedVehicles/:userId',async (req:express.Request, res: express.Response, next) => {
            
    try{
        let carId: ObjectId = new ObjectId(req.params.userId)
        let ownedVehicles = await getOwnedVehicles(carId)
        
        res.status(200).json({
            ownedVehicles: ownedVehicles
        })

    }catch(error){
        next(error)
    }

})
export default carRouter