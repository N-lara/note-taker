const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

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
          id : uuid(),
        };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`note added successfully`);
    } else {
      res.error('Error in adding note');
    }
})


//future functionality for delete

//checks and deletes array
  function deletednote(id){
    const notesArray = require('../db/db.json')
    let array = notesArray;
    for(let i=0; i<array.length; i++){
      if(array[i].id == id){
        array.splice(i,1);
      }
    }
    console.log(array);
    writeToFile('./db/db.json', array);
  }
    
    notes.delete('/:id', (req, res)=>{
      deletednote(req.params.id);
    })

module.exports = notes;
