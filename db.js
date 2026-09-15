const { MongoClient } = require('mongodb');
const MONGO_URI = process.env.MONGO_URI;
let db;

async function connectDB() {
  try {
    const client = new MongoClient(MONGO_URI, {
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: true
      // ✅ REMOVED the "useUnifiedTopology" line — IT'S NOT NEEDED ANYMORE!
    });
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