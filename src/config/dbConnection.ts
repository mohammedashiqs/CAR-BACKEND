import { MongoClient, Db } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'CAR';

let db: Db;

export async function connectToDatabase(): Promise<void> {

  
  try {
  const client = await MongoClient.connect(url);
  console.log('Connected to database ' + dbName)
  
  db = client.db(dbName);
  }catch(error){
    console.log('Error connecting to MongoDB:', error)
  }
}




export  {db};
