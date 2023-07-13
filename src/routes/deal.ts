import express from 'express'
import { ObjectId } from 'mongodb';
import { getDeals } from '../deal/services/dealServices';


const dealRouter: express.Router = express.Router();




dealRouter.get('/deals', async (req: express.Request, res: express.Response, next) => {
    try{
        let {userId, carId}: any = req.query

        
        let deals= await getDeals(userId, carId)

        

        res.status(200).json({
            deals: deals
        })
        
    }catch(error){
        next(error)
    }
})





export default dealRouter