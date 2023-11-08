// Import express and modules
const express = require('express');
const NotesRouter = require('./notes.js');
//make instance of express
const app = express();
// Use our routes
app.use('/notes', NotesRouter);

// Export app
module.exports = app;