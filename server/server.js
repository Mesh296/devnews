const express = require("express");
const app = express();
const routes = require('./src/routes/index.js');
const dotenv = require('dotenv')
const db = require('./src/providers/db.js')
const { sequelize } = require('./src/models/index.js')
const cors = require('cors');
app.use(cors());

app.use(express.json()); 

//.env---------------------------------------------------
dotenv.config()
const PORT = process.env.PORT

//route---------------------------------------------------
app.use('/api', routes);
app.get('/', (req, res) => {
    res.json('This is home page');
})

// database---------------------------------------------------
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
});

(async () => {
    try {
        await sequelize.sync({ force: false }); // Set `force: true` to recreate tables if needed
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error("Error synchronizing models:", error);
    }
})();