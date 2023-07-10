import {ICar} from "../models/ICar"
import {db} from "../../config/dbConnection"
import collection from "../../config/collections"
import { CustomError } from "../../../commen/custumError"



export const getAllCars = async () => {

    try{

        let car =  await db.collection(collection.CAR_COLLECTION).find().toArray()
    
            if (!car) {

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