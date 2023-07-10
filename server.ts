import express from 'express';
import dotenv from 'dotenv';
import handleError from './src/middlewares/errorHandlingMiddleware';
import { connectToDatabase } from './src/config/dbConnection';

import car from './src/routes/car'

connectToDatabase()
const app:express.Application = express();

/* import { faker } from '@faker-js/faker';
let firstName = faker.vehicle.vehicle();
console.log(firstName) */


// configure express form receive form data
app.use(express.json());

//configure dotenv
dotenv.config({path : './.env'})



const hostName:string | undefined = process.env.HOST_NAME;
const port: string | undefined = process.env.PORT;

app.get('/', (req:express.Request, res:express.Response) =>{
    res.status(200).send(
        `<h1>Welcome</h1>`
    )
})

//router configuration
app.use('/cars', car)

app.use(handleError)


if(port && hostName){
    app.listen(Number(port), hostName, ()=>{
        console.log(`Server is started at http://${hostName}:${port}`)
    });
}
