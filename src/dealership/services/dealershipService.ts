
import { ObjectId } from 'mongodb';
import { IDealership } from '../models/IDealership';
import collections from '../../config/collections';
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

