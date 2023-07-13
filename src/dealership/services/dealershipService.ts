
import { ObjectId } from 'mongodb';
import { IDealership } from '../models/IDealership';
import collections from '../../config/collections';
import { CustomError } from "../../../commen/custumError"
import { db } from '../../config/db';




export const getCars = async (dealershipId: ObjectId) => {
        try{
            console.log(dealershipId)
            let cars = await db.collection(collections.DEALERSHIP_COLLECTION).aggregate([
                {
                    $match:{_id: dealershipId}
                },
                {
                    $unwind: '$cars'
                },
                {
                    $project:{
                        carId: '$cars'
                    }
                },
                {
                    $lookup:{
                        from: collections.CAR_COLLECTION,
                        localField:'carId',
                        foreignField: '_id',
                        as: 'car'
                    }
                },
                {
                    $project: {
                        _id: 0,
                        car: { $arrayElemAt: ["$car", 0] }
                    }
                }
            ]).toArray()
            
            
            return cars

        }catch(error){
            throw error
        }
    }




    

export const getDealership = async (carId: ObjectId) => {
    try{
        console.log(carId)
        let dealerships = await db.collection(collections.DEALERSHIP_COLLECTION).aggregate([
            {
                $unwind: '$cars'
            },
            {
                $match: {cars: carId}
            }
        ]).toArray()
        
        if (!dealerships || dealerships.length == 0) {
            throw new CustomError(
                "No Dealerships found",
                400,
                ""
            )
        }
        
        return dealerships

    }catch(error){
        throw error
    }
}



