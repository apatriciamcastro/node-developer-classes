const fs = require('fs')
const chalk = require('chalk')

const getNotes = function() {
   return 'Your notes...' 
}

const addNote = function (title, body) {
   const notes = loadNotes()
   /**
    * Array method to check for duplicate notes (filter)
    * If it returns true, filter keeps that note in the new array, calling it duplicate
    * If it returns false, filter does not keep that note
    * So as we don't want to type out a booleans explicitly, so we use a conditional logic:
    * we check if the title of the note on the array equals the title of the new note
    * 
    */
   const duplicateNotes = notes.filter(function(note) {
      return note.title === title
   })

   if(duplicateNotes.length === 0) {
      notes.push({
         title: title,
         body: body
      })
      saveNotes(notes)
      console.log(chalk.green.bold.inverse('New note added successfully!'))
   } else {
      console.log(chalk.red.bold.inverse('Note title taken!'))
   }
}

// Challenge Wire up removeNote
// 1. Load existing notes
// 2. Use array filter method to remove the matching note (if any)
// 3. Save the newly created array
// 4. Test your work with a title that exists and a title that does not exist

const removeNote = function(title) {
   const notes = loadNotes()
   const notesToKeep = notes.filter(function(note) {
      return note.title !== title 
   })
   saveNotes(notesToKeep)
   console.log(chalk.green.bold.inverse('Notes saved successfully!'))
}

const saveNotes = function(notes) {
   const dataJSON = JSON.stringify(notes)
   fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function() {
   try {
      const dataBuffer = fs.readFileSync('notes.json')
      const dataJSON = dataBuffer.toString()
      return JSON.parse(dataJSON)
   } catch (e) {
     return []
   }
}

module.exports = {
   getNotes: getNotes,
   addNote: addNote,
   removeNote: removeNote
}
