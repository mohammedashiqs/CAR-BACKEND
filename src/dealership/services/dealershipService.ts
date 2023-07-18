
import { ObjectId } from 'mongodb';
import { IDealership } from '../models/IDealership';
import collections from '../../config/collections';
import { CustomError } from "../../common/models/custumError"
import { db } from '../../config/db';
import { ICar } from '../../user/models/ICar';
import { IDeal } from '../models/IDeal';







export const viewAllCars = async () => {
    
    try{

        let car =  await db.collection(collections.CAR_COLLECTION).find().toArray()
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




export const viewSoldCars = async (dealershipId: ObjectId)=>{
     
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

 




export const viewDeals = async (dealershipId: any) => {
    try{

        
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
                $project:{
                    _id:0,
                    deals:1
                }
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






export const addDeal = async (dealershipId: ObjectId, deal:IDeal)=> {

    try{

        //check if the deal is exists

        //register the deal
        deal.createdAt = new Date()
    let insertedDeal = await db.collection(collections.DEAL_COLLECTION).insertOne(deal)

        //update in dealership collection
    if(insertedDeal.insertedId){
                        await db.collection(collections.DEALERSHIP_COLLECTION).updateOne({_id:dealershipId}, {
                            $push:{deals: insertedDeal.insertedId}, $set:{updatedAt: new Date()}
                        })
    }

    return insertedDeal


    }catch(error){
        throw error
    }
}






export const createCar = async (dealershipId: ObjectId, car:ICar)=> {

    try{

        //check if the car is exists

        //register the car
    car.createdAt = new Date()
    let insertedCar = await db.collection(collections.CAR_COLLECTION).insertOne(car)

        //update in dealership collection
    if(insertedCar.insertedId){
                        await db.collection(collections.DEALERSHIP_COLLECTION).updateOne({_id:dealershipId}, {
                            $push:{cars: insertedCar.insertedId}, $set:{updatedAt: new Date()}
                        })
    }

    return insertedCar


    }catch(error){
        throw error
    }
}



