import { MongoClient, Db } from 'mongodb';

interface DatabaseConfig {
  url: string | undefined;
  dbName: string;
}

let db: Db;

// Function to establish database connection
async function connectDB(config: DatabaseConfig): Promise<Db> { 
  try {
    let { url, dbName } = config;
  
    if(url == undefined){
      url = ''
    }

    const client = await MongoClient.connect(url);

    db = client.db(dbName);
    
    console.log('Connected to MongoDB successfully');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export {db}






export async function exampleFunction() {
  try {
    // Configure database connection
    const dbConfig: DatabaseConfig = {
      url: process.env.MONGODB_URI,
      dbName: 'CAR'
    };

    // Establish database connection
    const db: Db = await connectDB(dbConfig);


  } catch (error) {
    // Handle any errors
  }
}




