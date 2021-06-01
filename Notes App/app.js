const yargs = require('yargs')
const notes = require('./notes.js')

//yargs is a parser for command line arguements
//console.log(yargs.argv)

//Creating yargs commands visible with --help
yargs.command({
    command: 'add',
    describe: "Add a new Note",
    builder: {
        title:{
            describe:'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe:'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body)
    }
})
yargs.command({
    command: 'remove',
    describe: "Remove a Note",
    builder: {
        title:{
            describe:'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {notes.removeNote(argv.title)}
})
yargs.command({
    command: 'read',
    describe: "Read a note",
    builder: {
        title:{
            describe:'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {notes.readNote(argv.title)}
})
yargs.command({
    command: 'list',
    describe: "List all Notes",
    handler: () => {notes.listNotes()}
})

yargs.parse()