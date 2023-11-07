const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

//GET route for retrieving notes
notes.get('/', (req,res)=>{
    console.info(`${req.method} request recieved for notes`)
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

// POST Route for a new UX/UI tip
notes.post('/', (req,res)=>{
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;
  
    if (req.body) {
        const newNote = {
          title,
          text,
          //tip_id: uuid(),
        };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`note added successfully`);
    } else {
      res.error('Error in adding note');
    }
})
module.exports = notes;
