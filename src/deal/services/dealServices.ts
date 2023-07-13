import { ObjectId } from "mongodb"
import { CustomError } from "../../../commen/custumError"
import { db } from "../../config/db"
import collections from "../../config/collections"









export const getDeals = async (userId: any, carId: any) => {
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






