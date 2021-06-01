const fs = require('fs')
const chalk = require('chalk')

const loadNotes = () => {
    try{
        const databuffer = JSON.parse(fs.readFileSync('notes.json').toString())
        return databuffer
    } catch(error) {
        return []
    }    
}
const saveNotes = (notes) => {
    const datanew = JSON.stringify(notes)
    fs.writeFileSync('notes.json', datanew)
}
const getNotes = () => {
    return "Your Notes..."
}

const addNote = (title,body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note)=>{return note.title === title})
    if(duplicateNote){
        console.log(chalk.red("Note title taken"))
    }
    else{
        notes.push({title:title, body:body})
        saveNotes(notes)
        console.log(chalk.green('Added Note ') + chalk.yellow.inverse(title))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const newNotes = notes.filter((note)=>{return note.title !== title})
    if(newNotes.length === notes.length){
        console.log(chalk.red('Note not found'))
    }
    else {
        saveNotes(newNotes)
        console.log(chalk.green('Removeded Note ') + chalk.yellow.inverse(title))
    }
}
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green('Your Notes'))

    //FOREACH function !!!!!
    // for(note of notes){console.log(chalk.yellow.inverse(note.title))}

    notes.forEach(note => {console.log(chalk.yellow.inverse(note.title))})
}
const readNote = (title) => {
    const notes = loadNotes()
    const requestedNote = notes.find((note)=>{return note.title === title})
    if(requestedNote){
        console.log(chalk.green('Reading Note ') + chalk.yellow.inverse(title))
        console.log(chalk.yellow(requestedNote.body))
    }
    else{
        console.log(chalk.red('Note not found'))
    }
}


module.exports = {
    readNote: readNote,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
}