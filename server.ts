import express from 'express';
import dotenv from 'dotenv';
//configure dotenv
dotenv.config({path : './.env'})
import handleError from './src/middlewares/errorHandlingMiddleware';


import {exampleFunction} from './src/config/db'

exampleFunction();

import user from './src/routes/user'
import dealership from './src/routes/dealership'
import auth from './src/routes/auth'


const app:express.Application = express();


// configure express form receive form data
app.use(express.json());





const hostName:string | undefined = process.env.HOST_NAME;
const port: string | undefined = process.env.PORT;

app.get('/', (req:express.Request, res:express.Response) =>{
    res.status(200).send(
        `<h1>Welcome to the car</h1>`
    )
})

//router configuration
app.use('/user', user)
app.use('/dealerships', dealership)
app.use('/auth', auth)

app.use(handleError)


if(port && hostName){
    app.listen(Number(port), hostName, ()=>{
        console.log(`Server is started at http://${hostName}:${port}`)
    });
}
