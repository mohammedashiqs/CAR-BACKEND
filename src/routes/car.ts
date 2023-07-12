import express, { NextFunction } from 'express';
import { ICar } from '../car/models/ICar';
import { getAllCars } from '../car/services/carService';


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

export default carRouter