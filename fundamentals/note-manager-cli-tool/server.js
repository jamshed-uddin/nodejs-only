#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const notesFile = path.join(__dirname, "notes.json");

console.log(notesFile);

const loadNotes = () => {
  if (!fs.existsSync(notesFile)) return [];
  const data = fs.readFileSync(notesFile, "utf-8");
  return data ? JSON.parse(data) : [];
};

const saveNotes = (notes) => {
  fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2), "utf-8");
};

const addNote = (title, content) => {
  title = title.replace(/^['"]|['"]$/g, "");
  content = content.replace(/^['"]|['"]$/g, "");
  const notes = loadNotes();
  const id = notes.length === 0 ? 1 : notes.length + 1;
  notes.push({ id, title, content });

  saveNotes(notes);
  console.log("✅Note added successfully.");
};

const listNotes = () => {
  const notes = loadNotes();

  console.log("\n📄Your notes  \nId --- Title ---- Content  ");
  if (notes.length > 0) {
    notes.forEach((note) => {
      console.log(`${note.id}. ${note.title} - ${note.content}`);
    });
  } else {
    console.log("No notes to show.");
  }
};

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

const readNote = (titleOrId) => {
  const notes = loadNotes();
  console.log("title from read", title);

  const note = notes.find(
    (note) =>
      note.title.toLowerCase() === title.toLowerCase() || note.id === titleOrId
  );

  if (!note) {
    console.log("❌Note not found!");
    return;
  }

  console.log(
    `\n${note.title} \n${"-".repeat(note.title.length)} \n${note.content}`
  );
};

const [, , command, ...args] = process.argv;
const trimQuotes = (str) => {
  if (!str) return;
  return str.replace(/^['"]|['"]$/g, "");
};

const title = args.join(" ").split("-").at(0);
const content = args.join(" ").split("-").at(1);
const noteTitle = trimQuotes(title);
const noteContent = trimQuotes(content);

if (command === "add") {
  if (noteTitle && noteContent) {
    addNote(noteTitle, noteContent);
  } else {
    console.log("Please provide both title and content");
  }
} else if (command === "read") {
  if (!noteTitle) {
    console.log("Please provide title");
    return;
  }
  readNote(noteTitle);
} else if (command === "delete") {
  if (!noteTitle) {
    console.log("Please provide the title to delete");
    return;
  }

  deleteNote(noteTitle);
} else if (command === "list") {
  listNotes();
} else if (command === "-help") {
  console.log(`
    
    \n Note commands:
    
    - note add <title>-<content>   --> Add a new note with title and content(e.g. note add Meeting-Meeting scheduled at 9:00pm)
    - note read <title or id>      --> Read a note by title or id(Find note accurately)
    - note list                    --> Read all notes
    - note delete <id>             --> Delete a note by id(number)
    - note -help or note help      --> Show this help message
    `);
} else {
  console.log("Unknown command. Use note -help for help.");
}
