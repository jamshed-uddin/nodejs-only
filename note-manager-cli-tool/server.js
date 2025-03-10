#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const notesFile = path.join(__dirname, "notes.json");

console.log(notesFile);

// load all notes
const loadNotes = () => {
  if (!fs.existsSync(notesFile)) return [];
  const data = fs.readFileSync(notesFile, "utf-8");
  return data ? JSON.parse(data) : [];
};

// save notes changes
const saveNotes = (notes) => {
  fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2), "utf-8");
};

// add new note
const addNote = (note) => {
  content = note.replace(/^['"]|['"]$/g, "");
  const notes = loadNotes();
  const id = Math.ceil(Math.random() * 100);
  notes.push({ id, note });

  saveNotes(notes);
  console.log("✅Note added successfully.");
};

// read the note by id
const readNote = (id) => {
  const notes = loadNotes();

  const note = notes.find((note) => note.id == id);

  if (!note) {
    console.log("❌Note not found!");
    return;
  }

  console.log(`${note.id}. ${note.note}`);
};

// list of all notes
const listNotes = () => {
  const notes = loadNotes();

  console.log("\n📄Your notes  \nId ---- Content  ");
  if (notes.length > 0) {
    notes.forEach((note) => {
      console.log(`${note.id}. ${note.note}`);
    });
  } else {
    console.log("No notes to show.");
  }
};

// delete note by id
const deleteNote = (id) => {
  const notes = loadNotes();
  const filteredNotes = notes.filter((note) => note.id != id);
  if (notes.length === filteredNotes.length) {
    console.log("❌Note not found.");
    return;
  }

  saveNotes(filteredNotes);
  console.log("✅Note deleted successfully.");
};

// update note by id
const updateNote = (id, updatedNote) => {
  const notes = loadNotes();

  const note = notes.find((note) => note.id == id);

  if (!note) {
    console.log("❌Note not found.");
    return;
  }

  const updatedNotes = notes.map((note) =>
    note.id == id ? { ...note, note: updatedNote } : note
  );
  console.log(updatedNotes);
  saveNotes(updatedNotes);
  console.log("✅Note updated successfully.");
};

const [, , command, ...args] = process.argv;
const trimQuotes = (str) => {
  if (!str) return;
  return str.replace(/^['"]|['"]$/g, "");
};

const rawNote = args.join(" ");

const newNote = trimQuotes(rawNote);

if (command === "add") {
  if (newNote) {
    addNote(newNote);
  } else {
    console.log("Please provide the note");
  }
} else if (command === "read") {
  console.log(args);
  const id = args[0];

  if (!id) {
    console.log("Please provide note id.");
    return;
  }
  readNote(id);
} else if (command === "update") {
  const id = args[0];
  if (!id) {
    console.log("Please provide note id.");
  }
  args.shift();
  const updatedNote = trimQuotes(args.join(" "));
  updateNote(id, updatedNote);
} else if (command === "delete") {
  const id = args[0];
  if (!id) {
    console.log("Please provide note id.");
  }

  deleteNote(id);
} else if (command === "list") {
  listNotes();
} else if (command === "help") {
  console.log(`
    
    \n Note commands:
    
    - note add <note>                --> Add a new note(e.g. note add 'Get the chips')
    - note read <id>                 --> Read a note by id.
    - note update <id> <updatedNote> --> Update a note by id.
    - note delete <id>               --> Delete a note by id.
    - note list                      --> Read all notes.
    - note help                      --> See all note commands
    `);
} else {
  console.log(`Unknown command - ${command}. Use 'note help' to learn more.`);
}
