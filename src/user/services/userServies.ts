import collections from '../../config/collections';
import { CustomError } from "../../common/models/custumError"
import { db } from '../../config/db';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt'




export const viewAllCars = async () => {

    try {

        let car = await db.collection(collections.CAR_COLLECTION).find().toArray()
        if (!car || car.length == 0) {

            throw new CustomError(
                "No Cars found",
                400,
                ""

            )

        }
        return car
    } catch (error) {
        throw error
    }
}




export const viewCarsInDealership = async (dealershipId: ObjectId) => {
    try {
        console.log(dealershipId)
        let cars = await db.collection(collections.DEALERSHIP_COLLECTION).aggregate([
            {
                $match: { _id: dealershipId }
            },
            {
                $unwind: '$cars'
            },
            {
                $project: {
                    carId: '$cars'
                }
            },
            {
                $lookup: {
                    from: collections.CAR_COLLECTION,
                    localField: 'carId',
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

        if (!cars || cars.length == 0) {
            throw new CustomError(
                "No cars found",
                400,
                ""
            )
        }


        return cars

    } catch (error) {
        throw error
    }
}




export const viewDealershipsWithCar = async (carId: ObjectId) => {
    try {
        console.log(carId)
        let dealerships = await db.collection(collections.DEALERSHIP_COLLECTION).aggregate([
            {
                $unwind: '$cars'
            },
            {
                $match: { cars: carId }
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

    } catch (error) {
        throw error
    }
}




export const viewOwnedVehicles = async (userId: ObjectId) => {
    try {

        let ownedVehicles = await db.collection(collections.USER_COLLECTION).aggregate([
            {
                $match: { _id: userId }
            },
            {
                $unwind: '$vehicle_info'
            },
            {
                $lookup: {
                    from: collections.SOLDVEHICLES_COLLECTION,
                    localField: 'vehicle_info',
                    foreignField: '_id',
                    as: 'carId'
                }
            },
            {
                $lookup: {
                    from: collections.CAR_COLLECTION,
                    localField: 'carId.car_id',
                    foreignField: '_id',
                    as: 'cars'
                }
            },
            {
                $project: {
                    _id: 0,
                    cars: 1
                }
            }


        ]).toArray()


        return ownedVehicles

    } catch (error) {
        throw error
    }
}





export const viewDealsOnCar = async (userId: ObjectId, carId: any) => {
    try {

        carId = new ObjectId(carId)

        let deals = await db.collection(collections.DEAL_COLLECTION).aggregate([
            {
                $match: { "deal_info.userId": userId, car_id: carId }
            }
        ]).toArray()
        console.log(deals)

        if (!deals || deals.length == 0) {
            throw new CustomError(
                "No deals found",
                400,
                ""
            )
        }

        return deals

    } catch (error) {
        throw error
    }
}




export const viewDealsFromDealership = async (userId: any, dealershipId: any) => {
    try {


        dealershipId = new ObjectId(dealershipId)

        let deals = await db.collection(collections.DEALERSHIP_COLLECTION).aggregate([
            {
                $match: { _id: dealershipId }
            },
            {
                $unwind: '$deals'
            },
            {
                $lookup: {
                    from: collections.DEAL_COLLECTION,
                    localField: 'deals',
                    foreignField: '_id',
                    as: 'deals'
                }

            },
            {
                $match: { "deals.deals.deal_info.userId": userId }
            }
        ]).toArray()
        console.log(deals)

        if (!deals || deals.length == 0) {
            throw new CustomError(
                "No deals found",
                400,
                ""
            )
        }

        return deals

    } catch (error) {
        throw error
    }
}







export const userChangePassword = async (oldPassword: string, newPassword: string, userId: ObjectId) => {

    try {

        const user = await db.collection(collections.USER_COLLECTION).findOne({ _id: userId })

        const isPasswordValid = await bcrypt.compare(oldPassword, user?.password)

        if (!isPasswordValid) {
            throw new CustomError(
                "Invalid old password",
                401,
                ""
            )
        }
        let salt = await bcrypt.genSalt(10)
        let changedPassword = await bcrypt.hash(newPassword, salt)

        await db.collection(collections.USER_COLLECTION).updateOne({ _id: userId }, { $set: { password: changedPassword } })

        return "Password changed successfully"

    } catch (error) {
        throw error
    }
}