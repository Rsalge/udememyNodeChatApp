const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes.js");

const argv = yargs
  .command("add", "Add a new note", {
    title: {
      decribe: "Title of note",
      demand: true,
      alias: "t"
    },
    body: {
      decribe: "Body of note",
      demand: true,
      alias: "b"
    }
  })
  .command("list", "List all notes")
  .command("read", "Read a note", {
    title: {
      decribe: "Title of note",
      demand: true,
      alias: "t"
    }
  })
  .command("remove")
  .command("remove", "removea note")
  .help().argv; //sets up yargs to display command description with the --help flag
let command = argv._[0];

if (command === "add") {
  let note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log("note created");
    notes.logNote(note);
  } else console.log("Note title already exists");
} else if (command === "list") {
  let allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s)`);
  allNotes.forEach(note => notes.logNote(note));
} else if (command === "remove") {
  let noteRemoved = notes.removeNote(argv.title);
  let message = noteRemoved ? "Note was removed" : "Note not found";
  console.log(message);
} else if (command === "read") {
  let note = notes.getNote(argv.title);
  if (note) {
    console.log("note found");
    notes.logNote(note);
  } else console.log("Note does not exist");
} else {
  console.log("Command not recognzed");
}
