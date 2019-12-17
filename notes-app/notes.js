const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
   const notes = loadNotes()
   /**
    * Array method to check for duplicate notes (filter)
    * If it returns true, filter keeps that note in the new array, calling it duplicate
    * If it returns false, filter does not keep that note
    * So as we don't want to type out a booleans explicitly, so we use a conditional logic:
    * we check if the title of the note on the array equals the title of the new note
    * 
    */
   
   // this method goes through every element in the array
   // const duplicateNotes = notes.filter((note) => note.title === title)
   
   // this method goes through the array until it finds a match and it stops
   // returns undefined if it does not find a match
   const duplicateNote = notes.find((note) => note.title === title)

   if(!duplicateNote) {
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

// Challenge: Use chalk to provide useful logs for remove
// 1. If a note is removed, print "Note removed!" with a green background
// 2. If no note is removed, print "No note found!" with a red background

const removeNote = (title) => {
   const notes = loadNotes()
   const notesToKeep = notes.filter((note) => note.title !== title)
   if(notes.length > notesToKeep.length) {
      saveNotes(notesToKeep)
      console.log(chalk.green.bold.inverse('Note removed successfully!'))
   } else {
      console.log(chalk.red.bold.inverse('No note with that title was found!'))
   }
  
}

const readNote = (title) => {
   const notes = loadNotes()
   const noteToRead = notes.find((note) => note.title === title)

   if(noteToRead){
      console.log(chalk.blue.inverse(noteToRead.title))
      console.log(noteToRead.body)
   } else {
      console.log(chalk.red.inverse('No note with that title!'))
   }

}

const listNotes = () => {
   const notes = loadNotes()
   console.log(chalk.bold.inverse('Your notes:'))
   notes.forEach(note => console.log(note.title))
}

const saveNotes = (notes) => {
   const dataJSON = JSON.stringify(notes)
   fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
   try {
      const dataBuffer = fs.readFileSync('notes.json')
      const dataJSON = dataBuffer.toString()
      return JSON.parse(dataJSON)
   } catch (e) {
     return []
   }
}

module.exports = {
   addNote: addNote,
   removeNote: removeNote,
   listNotes: listNotes,
   readNote: readNote
}
