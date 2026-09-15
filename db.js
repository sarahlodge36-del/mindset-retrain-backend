const { MongoClient } = require('mongodb');

const MONGO_URI = "mongodb+srv://admin:Deniselewis1949%40@cluster0.dkjhctg.mongodb.net/?appName=Cluster0";

let db;

async function connectDB() {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db('mindset-retrain');
    console.log("Connected to MongoDB!");
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };