# CAR-BACKEND (127.0.0.1:5000)

Backend application in Node.js using the MongoDB native driver, RESTful APIs with authentication, transactions, and synchronous error handling using promises.

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
1. authRouter
2. userRouter,
3. dealershipRouter

## I User Module
-------------------

1. To view all cars  - Done

   description: Fetches a list of all cars available
   url: http://127.0.0.1:5000/user/cars
   method: get
   fields: no-fields
   access: public


2. To view all cars in a dealership   - Done
   
   description: Fetches a list of all cars available in a specific dealership.
   url: http://127.0.0.1:5000/user/cars/:dealershipId
   method: get
   fields: no-fields
   access: public

3. To view dealerships with a certain car - Done

   description: Fetches a list of dealerships that have a certain car in their inventory.
   url: http://127.0.0.1:5000/user/dealerships/:carId
   method: get
   fields: no-fields
   access: public

4. To view all vehicles owned by user - Done
   
   description: Fetches a list of vehicles owned by the current user.
   url: http://127.0.0.1:5000/user/owned-vehicles
   method: get
   fields: no-fields
   access: private

5. To view all deals on a certain car - Done

   description: Fetches all deals available for a specific car.
   url: http://127.0.0.1:5000/user/deals/:carId
   method: get
   fields: no-fields
   access: private

6. To view all deals from a certain dealership - Done

   description: Fetches all deals offered by a specific dealership.
   url: http://127.0.0.1:5000/user/deals/dealership/:dealershipId
   method: get
   fields: no-fields
   access: private


## II Auth Module


 1. User registration

   description: User registration
   url: http://127.0.0.1:5000/users/register
   method: post
   fields: password, user_email, user_info, user_location
   access: public
   


 2. User login

   description: User login
   url: http://127.0.0.1:5000/users/login
   method: post
   fields: password, user_email
   access: public

 3. user logout
 4. forgot password





## II Dealership Module
-------------------

1. To view all cars

   description: To view all cars
   url: http://127.0.0.1:5000/dealership/cars
   method: get
   fields: no-fields
   access: public


 2. To view all cars sold by dealership - Done

   description:  Fetches a list of vehicles sold by the dealership.
   url: http://127.0.0.1:5000/dealership/sold-cars/:dealershipId
   method: get
   fields: no-fields
   access: private

 3. To add cars to dealership - Done

   description: Adds a new car to the dealership's inventory.
   url: http://127.0.0.1:5000/dealership/add-car/:dealershipId
   method: post
   fields: car_info:{mileage, seating_capacity}, model, name, type
   access: private


4. To view deals provided by dealership - Done

   description: Fetches all deals provided by the dealership.
   url: http://127.0.0.1:5000/dealership/deals/:dealershipId
   method: get
   fields: no-fields
   access: private
   


 5. To add deals to dealership - Done

   description: Adds a new deal to the dealership's offers.
   url: http://127.0.0.1:5000/dealership/add-deal/:dealershipId
   method: post
   fields: car_id, deal_info{dealerShipId, downPayment, financing{month, interest}, monthlyPayments{remaining_bal, monthlyPayment}, negotiatedPrice, userId, vehicle}
   access: private


6. 1. Dealership registration

   description: Dealership registration
   url: http://127.0.0.1:5000/dealership/register
   method: post
   fields: dealership_email, dealership_name, dealership_location, password, dealership_info
   access: public
 
