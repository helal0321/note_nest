# NoteNest

A simple offline note-taking app built with Electron + React. Lightweight and completely local — no cloud, no accounts, just your data on your machine.

## Features

- Create, edit, and delete notes
- Global password lock for sensitive topics
- Notes stored locally using `electron-store`
- Clean text formatting (trims whitespace, collapses extra spaces)
- Modal UI for creating and editing notes
- Redux for state management
- Export and import topics and notes as JSON files

## Tech Stack

- Electron — desktop app shell
- React — UI
- Redux — state management
- Tailwind CSS — styling
- `electron-store` — local persistence

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/yourusername/note-nest.git
cd note-nest
npm install
```

## Running Locally

To run in development mode:

1. In `electron.js`, make sure the app loads from `http://localhost:3000`.
2. Run:

```bash
npm run dev
```

This starts both the React dev server and Electron together.

## Packaging the App

To build a distributable desktop app:

1. Build the React app:

```bash
npm run build
```

2. In `electron.js`, update the load path to point to the build folder:

```js
mainWindow.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);
```

3. Package with Electron Forge:

```bash
npm run make
```

This generates a platform-specific installer in the `out/` directory.

## Export and Import

NoteNest lets you back up and restore your data using JSON files.

**Export:** Select a topic or all notes and export them to a `.json` file saved anywhere on your machine.

**Import:** Load a previously exported `.json` file to restore topics and notes. Imported data is merged with your existing notes.

This is useful for backups, moving data between machines, or sharing a set of notes with someone else.

## Contributing

Pull requests are welcome. If you have ideas for features or improvements, open an issue and let's discuss.
