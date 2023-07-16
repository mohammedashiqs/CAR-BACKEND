# CAR-BACKEND (127.0.0.1:5000)

Backend application in Node.js using the MongoDB native driver to create RESTful APIs with authentication, transactions, and implement asynchronous error handling using promises.

## Appendix

Developed using Node js, Typescript, Express js, MongoDB



## Authors

- [@Mohammed Ashiq](https://github.com/mohammedashiqs)


## Deployment

To deploy this project run

```bash
  npm start
```
## API Reference

## Routing
1. userRouter,
2. carRouter
3. dealershipRouter
4. dealRouter
5. soldVehicleRouter

## I User Module
-------------------

 1. User registration

   usage: User registration
   url: http://127.0.0.1:5000/users/register
   method: post
   fields: password, user_email, user_info, user_location
   access: public
   


 2. User login

   usage: User login
   url: http://127.0.0.1:5000/users/login
   method: post
   fields: password, user_email
   access: public

 3. user logout
 4. forgot password



## II Car Module
-------------------

1. To view all cars

   usage: To view all cars
   url: http://127.0.0.1:5000/cars/cars
   method: get
   fields: no-fields
   access: public


2. To view all vehicles owned by user
   
   usage: To view all vehicles owned by user
   url: http://127.0.0.1:5000/cars/ownedVehicles/userId
   method: get
   fields: no-fields
   access: private






## II Dealership Module
-------------------



 1. To view all cars in a dealership
   
   usage: To view all cars in a dealership
   url: http://127.0.0.1:5000/dealerships/cars/:dealershipId
   method: get
   fields: no-fields
   access: public


 3. To view dealerships with a certain car

   usage: To view dealerships with a certain car
   url: http://127.0.0.1:5000/dealerships/dealership/:carId
   method: get
   fields: no-fields
   access: public


 4. To view the dealerships within a certain range based on user location(use maps api)

   usage: To view the dealerships within a certain range based on user location(use maps api)
   url: http://127.0.0.1:5000/dealerships/dealerships/:userId
   method: get
   fields: no-fields
   access: public

 5. To add cars to dealership

   usage: To add cars to dealership
   url: http://127.0.0.1:5000/dealerships/addCars/:dealershipId
   method: post
   fields: car_info:{mileage, seating_capacity}, model, name, type
   access: private

 6. To add deals to dealership

   usage: To add deals to dealership
   url: http://127.0.0.1:5000/dealerships/addDeals/:dealershipId
   method: post
   fields: car_id, deal_info{dealerShipId, downPayment, financing{month, interest}, monthlyPayments{remainging_bal, monthlyPayment}, negotiatedPrice, userId, vehicle}
   access: private
 


## II Deal Module
-------------------

1. To view all deals from a certain dealership

   usage: To view all deals from a certain dealership
   url: http://127.0.0.1:5000/deals/dealsOnCertainDealership
   method: get
   fields: no-fields
   access: private


2. To view all deals on a certain car

   usage: To view all deals on a certain car
   url: http://127.0.0.1:5000/deals/dealsOnCertainCar/
   method: get
   fields: no-fields
   access: private


3. To view deals provided by dealership

   usage: To view all deals on a certain car
   url: http://127.0.0.1:5000/deals/dealsProvidedByDealership/:dealershipId
   method: get
   fields: no-fields
   access: private
   
## I sold Vehicle Module
------------------------


 1. To view all cars sold by dealership       

   usage: To view all cars sold by dealership
   url: http://127.0.0.1:5000/soldVehicles/soldCars/:dealershipId
   method: get
   fields: no-fields
   access: private

 

2. To add new vehicle to the list of sold vehicles after a deal is made


   usage: To add new vehicle to the list of sold vehicles after a deal is made
   url: 
   method: post
   fields: no-fields
   access: private

3. To view all vehicles dealership has sold

   usage: To view all vehicles dealership has sold
   url: http://127.0.0.1:5000/soldVehicles/vehicles/:dealershipId
   method: get
   fields: no-fields
   access: private