import express from 'express'
import { ObjectId } from 'mongodb'
import {getSoldCars} from '../soldVehicle/servieces/soldVehicleServieces'



const soldVehicleRouter: express.Router = express.Router()



soldVehicleRouter.get('/soldCars/:dealershipId', async (req:express.Request, res: express.Response, next) => {

        try {
                    let dealershipId: ObjectId = new ObjectId( req.params.dealershipId)

                    let soldCars = await getSoldCars(dealershipId)

                    res.status(200).json({
                        soldCars: soldCars
                    })

        } catch (error) {
            next(error)
        }

}) 


export default soldVehicleRouter