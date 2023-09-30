const { MongoClient } = require('mongodb');

// dotenv config
const dotenv = require('dotenv');

//dotenv path
dotenv.config({ path: './enviroment/.env' })


const db = MongoClient;



module.exports = db;