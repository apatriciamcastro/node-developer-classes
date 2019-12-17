const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')

// Challenge: Add an option to yargs
//
// 1. Setup a body option for the add command
// 2. Configure a description, make it required, and for it to be a string
// 3. Log the body value in the handler function
// 4. Test your work

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body)
    }
})

// Challenge: Setup command option and function
// 1. Setup the remove command to take a required title option
// 2. Create and export a removeNote function from note.js
// 3. Call removeNote in remove command handler
// 4. Have removeNote log the title of the note to be removed
// 5. Test your work using: node app.js remove --title="some title"

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// Challenge: Add two new commands
// 1. Setup command to support read command (placeholder message)
// 2. Setup command to support list command (placeholder message)
// 3. Test your work by running both commands and ensure correct output

// Challenge: Wire up read command
// 1. Setup --title option for read command
// 2. Create readNote in notes.js
// - Search for note by title
// - Find note and print title (styled) and body (plain)
// - No note found? Print error in bundleRenderer.renderToStream
// 3. Have the command handler call the function
// 4. Test your work by running a couple commands

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

// Challenge: Wire up list command
// 1. Create and export listNotes from note.js
// - "Your notes" using chalk
// - Print note title for each note
// 2. Call listNotes from command handler
// 3. Test your work

//Create list command
yargs.command({
    command: 'list',
    describe: 'List the notes',
    handler: () => {
       notes.listNotes()
    }
})

yargs.parse()
// console.log(yargs.argv)