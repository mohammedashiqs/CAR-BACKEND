import {ICar} from "../models/ICar"
import collection from "../../config/collections"
import { CustomError } from "../../../commen/custumError"
import {db} from '../../config/db'


export const getAllCars = async () => {
    
    try{

        let car =  await db.collection(collection.CAR_COLLECTION).find().toArray()
        console.log(car)
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