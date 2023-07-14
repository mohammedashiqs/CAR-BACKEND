import express from 'express'
import { ObjectId } from 'mongodb';
import { dealsOnCertainCar, dealsOnCertainDealership, getDeals } from '../deal/services/dealServices';


const dealRouter: express.Router = express.Router();



/* To view all deals on a certain car - user ends */
dealRouter.get('/dealsOnCertainCar', async (req: express.Request, res: express.Response, next) => {
    try{
        let {userId, carId}: any = req.query

        
        let deals= await dealsOnCertainCar(userId, carId)

        

        res.status(200).json({
            deals: deals
        })
        
    }catch(error){
        next(error)
    }
})


/* To view all deals from a certain dealership - user ends */
dealRouter.get('/dealsOnCertainDealership', async (req: express.Request, res: express.Response, next) => {
    try{
        let {userId, dealershipId}: any = req.query

        
        let deals= await dealsOnCertainDealership(userId, dealershipId)

        

        res.status(200).json({
            deals: deals
        })
        
    }catch(error){
        next(error)
    }
})


/* To view deals provided by dealership - dealership ends */
dealRouter.get('/dealsProvidedByDealership/:dealershipId', async (req: express.Request, res: express.Response, next) => {
    try{
        let dealershipId: ObjectId = new ObjectId(req.params.dealershipId)

        
        let deals= await getDeals(dealershipId)

        

        res.status(200).json({
            deals: deals
        })
        
    }catch(error){
        next(error)
    }
})

export default dealRouter