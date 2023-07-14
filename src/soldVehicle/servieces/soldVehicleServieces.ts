import { ObjectId } from "mongodb";
import { db } from "../../config/db";
import  collections from "../../config/collections";




export const getSoldCars = async (dealershipId: ObjectId)=>{
     
    try{

        let soldCars = await db.collection(collections.DEALERSHIP_COLLECTION).aggregate([
            {
                $match:{_id: dealershipId }
            },
            {
                $unwind: '$sold_vehicles'
            },
            {
                $lookup:{
                    from: collections.SOLDVEHICLES_COLLECTION,
                    localField: 'sold_vehicles',
                    foreignField: '_id',
                    as: 'soldVehicle'
                }
            },
            {
                $project:{
                    soldVehicle: 1
                }
            }
        ]).toArray()

        return soldCars

    }catch(error){
        throw(error)
    }
}