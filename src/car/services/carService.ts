import {ICar} from "../models/ICar"
import collection from "../../config/collections"
import { CustomError } from "../../common/models/custumError"
import {db} from '../../config/db'
import collections from "../../config/collections"
import { ObjectId } from "mongodb"


export const getAllCars = async () => {
    
    try{

        let car =  await db.collection(collection.CAR_COLLECTION).find().toArray()
            if (!car || car.length == 0) {

                throw new CustomError(
                    "No Cars found",
                    400,
                    ""
    
                )
            
        }
        return car
    }catch(error){
        throw error
    }
}






export const getOwnedVehicles = async (userId: ObjectId) => {
    try{
        
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

