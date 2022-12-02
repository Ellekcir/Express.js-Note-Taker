const fs = require('fs');
const path = require('path');

module.exports = app => {


    // Setup notes variable
    fs.readFile("db/db.json", "utf8", (err, data) => {

        if (err) throw err;

        let notes = JSON.parse(data);

        // API ROUTES
        // ========================================================
        // when using the same route use .route 
        // Setup the /api/notes get route
        // app.route("/api/notes") 
        //you can add multiple methods in the app.route for the same 'url' path
        // the get should grab the updated notes list 
        app.get("/api/notes", function (req, res) {
                // Let the client know that their GET request was received
            //res.json(`${req.method} request received`);
            // Read the db.json file and return all saved notes as JSON.
         res.json(notes); //res.json(db);
            console.log("Server responding with database in JSON");
            // Log our request to the terminal
            console.info(`${req.method} request received`);
        });


        
        // Setup the /api/notes post route
        app.post("/api/notes", function (req, res) {
            // Receives a new note, adds it to db.json, then returns the new note
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: " + newNote.title);
        });

        // Retrieves a note with specific id
        app.get("/api/notes/:id", function (req, res) {
            // display json for the notes array indices of the provided id
            res.json(notes[req.params.id]);
        });

        // Deletes a note with specific id
        app.delete("/api/notes/:id", function (req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id " + req.params.id);
        });

        // VIEW ROUTES
        // ========================================================
        //---------------------------------HTML ROUTE---------------------------------------------------------------------------
        // First page loaded will show the front end user index.html
        // using GET and then 
        // "/" is the root of the file (start of your 'url' path)
        // __dirname is the 
        //Route for home page

        app.get('/', (req, res) =>
            req.sendFile(path.join(__dirname, "/public/index.html"))
        );

        // the note.html GET link 
        //Route for notes page
        // Display notes.html when /notes is accessed
        app.get('/notes', function (req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        // Display index.html when all other routes are accessed
        app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        //updates the json file whenever a note is added or deleted
        function updateDb() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }

    });

}