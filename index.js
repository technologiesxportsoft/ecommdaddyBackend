// dotenv config
const dotenv = require('dotenv');

// Dabase config
const db = require('./Database/db');

//express Integration
const express = require('express');

//dotenv path
dotenv.config({ path: './enviroment/.env' })

// Express Integration
const app = express();


// Routes
app.use('/', require('./routes/auth'));


const url = process.env.DBSTRING;



app.listen(3001, async (err) => {
    if (err) {
        console.log('error', err);
        throw err;
    } else {
        console.log('Server is integrated succesfully');
        let result = await db.connect(url);
        console.log(result, result.db('ecommdaddy').collection('users'));
        result.close();

    }
});
