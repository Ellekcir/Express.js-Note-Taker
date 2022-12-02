const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports = app => {

    // Setup notes variable by reading the db.json file and makes it an object.
    fs.readFile("db/db.json", "utf8", (err, data) => {

        if (err) throw err;

        let notes = JSON.parse(data);
        // ========================================================
        // API ROUTES
        // ========================================================
        // when using the same route use .route 
        // Setup the /api/notes get route
        // app.route("/api/notes") 
        // you can add multiple methods in the app.route for the same 'url' path
        // the get should grab the existing and updated notes list from this path
        app.get("/api/notes", function (req, res) {
            // Let the client know that their GET request was received
            res.json(`${req.method} request received`);
            // Log our request to the terminal
            console.info(`${req.method} request received`);
            // Read the db.json file and return all saved notes as JSON.
            res.json(notes);
            console.log("Server responding with database notes");

        });



        // Setup the /api/notes post route
        // this will allow the user to 'post' notes to the DB/ FE -> BE
        app.post("/api/notes", function (req, res) {
            // Receives a new note from user, adds it to db.json, then returns the new note
            let addNote = req.body;
            notes.push(addNote);
            updateNoteDatabase();
            return console.log("Added new note: " + addNote.title);
        });

        // Retrieves a note with specific id these 
        app.get("/api/notes/:id", function (req, res) {
        console.log(req.body)
        const title = req.body.title;
        const text = req.body.text;
        let notes = {
            id: uuidv4(),
            title: title,
            text: text,
        };

            // display json for the notes array indices of the provided id
            res.json.parse(notes[req.params.id]);
        });

        // Deletes a note with specific id
        app.delete("/api/notes/:id", function (req, res) {
            // slices the note by id out of the object and deletes
            //splice(start, deleteCount)
            notes.splice(req.params.id, 1);
            //updates notes
            updateNoteDatabase();
            console.log("Deleted note with id " + req.params.id);
        });

        // ========================================================
        // HTML ROUTES
        // ========================================================
        // First page loaded will show the front end user index.html
        // using GET and then 
        // "/" is the root of the file (start of your 'url' path)
        // __dirname is the 
        //Route for home page

        app.get('/', (req, res) =>
            req.sendFile(path.join(__dirname, "/public/index.html"))
        );

        // the note.html GET link 
        // Route for notes page
        // Display notes.html when /notes is accessed
        app.get('/notes', function (req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        // Display index.html when all other routes are accessed
        app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        // updates the json file whenever a note is updated by writing it to the db
        function updateNoteDatabase() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }

    });

}