import { ObjectId } from "mongodb"
import { CustomError } from "../../../commen/custumError"
import { db } from "../../config/db"
import collections from "../../config/collections"









export const dealsOnCertainCar = async (userId: any, carId: any) => {
    try{

            userId = new ObjectId(userId)
            carId = new ObjectId(carId)

        let deals = await db.collection(collections.DEAL_COLLECTION).aggregate([
            {
                $match: {"deal_info.userId": userId, car_id: carId}
            }
        ]).toArray()
        
        if (!deals || deals.length == 0) {
            throw new CustomError(
                "No deals found",
                400,
                ""
            )
        }
        
        return deals

    }catch(error){
        throw error
    }
}









export const dealsOnCertainDealership = async (userId: any, dealershipId: any) => {
    try{

        userId = new ObjectId(userId)
        dealershipId = new ObjectId(dealershipId)

        let deals = await db.collection(collections.DEALERSHIP_COLLECTION).aggregate([
            {
                $match: {_id: dealershipId}
            },
            {
                $unwind: '$deals'
            },
            {
                $lookup:{
                    from: collections.DEAL_COLLECTION,
                    localField: 'deals',
                    foreignField: '_id',
                    as: 'deals'
                }
            },
            {
                $match:{"deals.deal_info.userId": userId}
            }
        ]).toArray()
        
        if (!deals || deals.length == 0) {
            throw new CustomError(
                "No deals found",
                400,
                ""
            )
        }
        
        return deals

    }catch(error){
        throw error
    }
}





