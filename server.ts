import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './db';

connectToDatabase()
const app:express.Application = express();


// configure express form receive form data
app.use(express.json());

//configure dotenv
dotenv.config({path : './.env'})

const url = 'mongodb://localhost:27017';


const hostName:string | undefined = process.env.HOST_NAME;
const port: string | undefined = process.env.PORT;

app.get('/', (req:express.Request, res:express.Response) =>{
    res.status(200).send(
        `<h1>Welcome</h1>`
    )
})

if(port && hostName){
    app.listen(Number(port), hostName, ()=>{
        console.log(`Server is started at http://${hostName}:${port}`)
    });
}
