// dotenv config
const dotenv = require('dotenv');
//dotenv path
dotenv.config({ path: './enviroment/.env' })
const mongo_url = process.env.DBSTRING;
module.exports = {
    url: mongo_url
  };;