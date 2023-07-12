import express from 'express'
import { ObjectId } from 'mongodb';
import { IDealership } from '../dealership/models/IDealership';


const dealershipRouter: express.Router = express.Router();


dealershipRouter.put('/dealership/:dealershipId', async (req: express.Request, res: express.Response, next) => {
    try{
        let dealershipId: ObjectId = new ObjectId(req.params.dealershipId)
        let dealershipDetails: IDealership = req.body

        // to do updation logic
        
        /* let updatedDealership: await updateDealership(dealershipId, dealershipDetails) */
    }catch(error){

    }
})


export default dealershipRouter