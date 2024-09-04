const { MongoClient } = require('mongodb');
require('dotenv').config(); 

const url = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'sklep';

let db;

async function connectToDB() {
  if (db) {
    return db;
  }

  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
}

module.exports = connectToDB;
