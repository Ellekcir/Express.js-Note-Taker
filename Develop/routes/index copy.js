
// //===========================================================================

// const db = require('./db/db.json')
// //const { clog } = require('./middleware/clog');

// const { v4: uuidv4 } = require('uuid');
// // id: uuidv4(),



// // Import custom middleware, "cLog"
// //app.use(clog);
// // Custom middleware that logs out the type and path of each request to the server
// // const clog = (req, res, next) => {
// //     const fgCyan = '\x1b[36m';
// //     switch (req.method) {
// //       case 'GET': {
// //         console.info(`📗 ${fgCyan}${req.method} request to ${req.path}`);
// //         break;
// //       }
// //       case 'POST': {
// //         console.info(`📘 ${fgCyan}${req.method} request to ${req.path}`);
// //         break;
// //       }
// //       default:
// //         console.log(`📙${fgCyan}${req.method} request to ${req.path}`);
// //     }

// //     next();
// //   };
// //------------------------------------------------------------------------------------------------------------
// //app.use is always needed to link the assets which will be used for the front-end
// // HTML are static / API are dynamic











// // to add a new note to the json db file (./db/db.json)
// app.post("/api/notes", (req, res) => {
//     console.info(`${req.method} request received to add a new note`);
    
//     if (req.body) {

//         console.log(req.body)
//         const newTitle = req.body.title;
//         const newText = req.body.text;
//         const newNote = {
//             id: uuidv4(),
//             title: newTitle,
//             text: newText
//         };

//         db.push(newNote);
//         res.json(newNote);

//         // fs.writeFile(
//         //     './db/db.json',

//     } else {
//         res.error('Error in adding note');
//     }
// });
// // Let the client know that their POST request was received
// //res.json(`${req.method} request received`);
// // Log our request to the terminal
// //console.info(`${req.method} request received`);






// // module.exports = api;