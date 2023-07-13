import express from 'express';
import {db} from '../config/db'
import {IUser} from '../user/models/IUser'
import { ObjectId } from 'mongodb';
import { getOwnedVehicles } from '../user/services/userServies';
const userRouter: express.Router = express.Router();

userRouter.get('/ownedVehicles/:userId',async (req:express.Request, res: express.Response, next) => {
            
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

export default userRouter;