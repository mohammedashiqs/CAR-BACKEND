
import collections from '../../config/collections';
import { CustomError } from "../../../commen/custumError"
import { db } from '../../config/db';
import { ObjectId } from 'mongodb';




export const getOwnedVehicles = async (userId: ObjectId) => {
    try{
        console.log(userId)
        let ownedVehicles = await db.collection(collections.USER_COLLECTION).aggregate([
            {
                $match:{_id: userId}
            },
            {
                $unwind: '$vehicle_info'
            },
            {
                $lookup:{
                    from: collections.SOLDVEHICLES_COLLECTION,
                    localField: 'vehicle_info',
                    foreignField: '_id',
                    as: 'carId'
                }
            },
            {
                $lookup:{
                    from: collections.CAR_COLLECTION,
                    localField: 'carId.car_id',
                    foreignField: '_id',
                    as: 'cars'
                }
            },
            {
                $project:{
                    _id: 0,
                    cars:1
                }
            }
        
           
        ]).toArray()
        
        
        return ownedVehicles

    }catch(error){
        throw error
    }
}




