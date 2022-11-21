// Express.js Note Taker
// Dependencies

const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json')

// Sets up an Express App
// process.env.PORT sets up port Environment so Heruko can use to deploy

const app = express();
const PORT = process.env.PORT || 3001

//------------------------------------------------------------------------------------------------------------
//app.use is always needed to link the assets which will be used for the front-end
// HTML are static / API are dynamic

app.use(express.static('public'));

// Sets up the data parsing - For all API calls Express will interpret the data and format it as JSON

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//------------------------------------------------------------------------------------------------------------
// First page loaded will show the front end user index.html
// using GET and then 
// "/" is the root of the file (start of your 'url' path)
// __dirname is the 

app.get('/', (req, res) =>
    req.sendFile(path.join(__dirname, "/public/index.html"))
);

// the note.html GET link - 
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//------------------------------------------------------------------------------------------------------------
// when using the same route use 

app.route("/api/notes") 
    //you can add multiple methods in the app.route for the same 'url' path
    // the get should grab the updated notes list 
    .get(function (req, res) {
        res.json(db);
        console.log("Server responding with database in JSON");
    })
    // to add a new note to the json db file (./db/db.json)
    .post(function (req, res) {
    // Let the client know that their POST request was received
    res.json(`${req.method} request received`);
    // Log our request to the terminal
    console.info(`${req.method} request received`);
    })


    // Listen for connections is the last thing Express should do. This sets up the server
app.listen(PORT, () =>
console.info(`Note-Taker app listening at http://localhost:${PORT} 🚀`)
);