
import { ObjectId } from 'mongodb';
import { IDealership } from '../models/IDealership';
import collections from '../../config/collections';
import { db } from '../../config/db';




const updateDealership = async (dealershipId: ObjectId) => {
        try{
            let updatedDealership = await db.collection(collections.DEALERSHIP_COLLECTION).find()
}