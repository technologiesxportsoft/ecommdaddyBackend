//  IMPORT EXPRESS AND INTIATE ROUTES USING APP.
const express = require('express');
const app = express();

//  IMPORT ROUTES FROM CONTROLLERS

//  RIGISTER ROUTE
app.post('/register', (req, res) => {
    console.log('register route called')
})

//  LOGIN ROUTE
app.post('/login', (req, res) => {
    console.log('login route called')
})


//  Index ROUTE
app.get('/', (req, res) => {
    res.send('Welcome on ecommdaddy.com')
})


module.exports = app;