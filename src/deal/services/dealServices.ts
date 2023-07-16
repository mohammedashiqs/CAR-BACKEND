import { ObjectId } from "mongodb"
import { CustomError } from "../../common/models/custumError"
import { db } from "../../config/db"
import collections from "../../config/collections"
import { IDeal } from "../models/IDeal"









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







export const getDeals = async (dealershipId: any) => {
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


export const createDeals = async (dealershipId: ObjectId, deal:IDeal)=> {

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

