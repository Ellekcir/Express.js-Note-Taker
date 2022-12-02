// Express.js Note Taker
// Dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');
// Initialises and sets up an Express App
// process.env.PORT sets up port Environment so Heruko can use to deploy
const app = express();
const PORT = process.env.PORT || 3001;
// Sets up the data parsing - For all API calls Express will interpret the data and format it as JSON
// Setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));
//Require routes file
// app.use(express.static('public'));
require('./routes/index')(app);
// Listen for connections is the last thing Express should do. 
//This sets up the server
app.listen(PORT, () =>
    console.info(`Note-Taker app listening at http://localhost:${PORT} 🚀`)
);
