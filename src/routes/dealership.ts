import express from 'express'
import { ObjectId } from 'mongodb';
import { IDealership } from '../dealership/models/IDealership';


const dealershipRouter: express.Router = express.Router();


dealershipRouter.get('/cars/:dealershipId', async (req: express.Request, res: express.Response, next) => {
    try{
        let dealershipId: ObjectId = new ObjectId(req.params.dealershipId)

        // to do updation logic
        
        /* let updatedDealership: await getCars(dealershipId) */
    }catch(error){
        next(error)
    }
})


export default dealershipRouter