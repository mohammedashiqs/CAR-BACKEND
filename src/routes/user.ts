import express, { NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import { userChangePassword, viewAllCars, viewCarsInDealership, viewDealershipsWithCar, viewDealsFromDealership, viewDealsOnCar, viewOwnedVehicles } from '../user/services/userServies';
import { AuthenticateToken, authorizeRole } from '../common/services/common';



const userRouter: express.Router = express.Router();




/* To view all cars */
userRouter.get('/cars', async (req: express.Request, res: express.Response, next) => {
    try {
        
         /* todo get all cars logic */
        let car = await viewAllCars()
       
        res.status(200).json({
            car: car
        })
    } catch (error) {
        next(error)
    }
})




/* To view all cars in a dealership */
userRouter.get('/cars/:dealershipId', async (req: express.Request, res: express.Response, next) => {
    try{
        let dealershipId: ObjectId = new ObjectId(req.params.dealershipId)

        
        let cars= await viewCarsInDealership(dealershipId)

        res.status(200).json({
            cars: cars
        })

    }catch(error){
        next(error)
    }
})





/* To view dealerships with a certain car */
userRouter.get('/dealerships/:carId', AuthenticateToken, authorizeRole('user'), async (req: express.Request, res: express.Response, next) => {
    try{
        let carId: ObjectId = new ObjectId(req.params.carId)

        
        let dealerships= await viewDealershipsWithCar(carId)

        

        res.status(200).json({
            dealerships: dealerships
        })
        
    }catch(error){
        next(error)
    }
})






/* To view all vehicles owned by user */
userRouter.get('/owned-vehicles', AuthenticateToken, authorizeRole('user'), async (req:express.Request, res: express.Response, next: NextFunction) => {
            
    try{
        const userId = req.user.id
        console.log(userId)
        let ownedVehicles = await viewOwnedVehicles(userId)
        
        res.status(200).json({
            ownedVehicles: ownedVehicles
        })

    }catch(error){
        next(error)
    }

})






/* To view all deals on a certain car */
userRouter.get('/deals/:carId', AuthenticateToken, authorizeRole('user'), async (req: express.Request, res: express.Response, next: NextFunction) => {
    try{
        const userId = req.user.id
        let carId = req.params.carId

        
        let deals= await viewDealsOnCar(userId, carId)

        

        res.status(200).json({
            deals: deals
        })
        
    }catch(error){
        next(error)
    }
})




/* To view all deals from a certain dealership */
userRouter.get('/deals/dealership/:dealershipId', AuthenticateToken, authorizeRole('user'), async (req: express.Request, res: express.Response, next) => {
    try{


        const userId = req.user
        let dealershipId = req.params.dealershipId

        
        let deals= await viewDealsFromDealership(userId, dealershipId)

        

        res.status(200).json({
            deals: deals
        })
        
    }catch(error){
        next(error)
    }
})





userRouter.put('/changePassword', AuthenticateToken, async (req: express.Request, res: express.Response, next: NextFunction) => {

    const userId = req.user.id
  
    try {
  
      const { oldPassword, newPassword } = req.body;
  
      const result = await userChangePassword(oldPassword, newPassword, userId)
  
      res.status(200).json({
        msg: result
    })
      
  
    } catch (error) {
      next(error)
    }
  })
  
  


export default userRouter;