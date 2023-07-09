import { MongoClient, Db } from 'mongodb';


let db: Db; // Create a global variable to store the database connection.

export async function connectToDatabase(): Promise<void> {
  const url = 'mongodb://localhost:27017'; // MongoDB connection string
  const dbName = 'CAR'; // Replace with your actual database name

  const client = await MongoClient.connect(url);
  db = client.db(dbName);
  console.log('Connected to database ' + dbName)
}
