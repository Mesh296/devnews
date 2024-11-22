const express = require("express");
const app = express();

// .env
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT

// Database
const db = require('./src/providers/db.js')

//route
const routes = require('./src/routes/index.js');
app.use('/', routes);

// use routes
app.get('/', (req, res) => {
    res.json('This is home page');
})

// listen
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})