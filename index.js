// dotenv config
const dotenv = require('dotenv');
//express Integration
const express = require('express');
// Express Integration
const app = express();

//dotenv path
dotenv.config({ path: './enviroment/.env' })

const db = require("./Models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Routes
require("./Routes/users.route")(app);
app.use('/', require('./routes/auth'));


//const url = process.env.DBSTRING;

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});