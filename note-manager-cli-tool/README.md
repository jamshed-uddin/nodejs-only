# Note manager cli tool

A command line Interface application to manage notes.

## Features

- Add note with auto generated id, note.
- Read a note by id.
- Delete a note by id.
- Update a note by id.
- View note list.
- View note commands

## Prerequisities

Node installed

## Installation

```
git clone https://github.com/jamshed-uddin/nodejs-only.git
```

```
cd notejs-only/note-manager-cli-tool
```

```
npm link
```

`npm link` to create a global symbolic link between the local directory and global node_modules, so we don't need to run `node server.js` to run the app. Instead, we can just run `note add <note>` as we added a shebang `#!/usr/bin/env node` on top of the script that tells the OS which interpreter to use and added a `bin` field in package.json, which maps the command `note` to the script `server.js`, making it executable globally.

## Uses

- ### Add a note

```
note add 'Meeting at 9'
```

- ### See notes list

```
note list
```

- ### Read a note

```
note read 2
```

- ### Update a note

```
note update 2
```

- ### Delete a note

```
note delete 2
```

- ### Note commands

```
note help
```

## Sample note

```json
{
  "id": 3,
  "note": "Meeting at 9"
}
```
