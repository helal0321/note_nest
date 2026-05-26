const { app, BrowserWindow ,Menu,ipcMain,dialog,shell} = require('electron');
const fs = require("fs");
const path = require('path');
let mainWindow;
const Store = require('electron-store');  
const store = new Store();              
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    icon: path.join(__dirname, "public/noteNestIcon.ico"),
    // fullscreen: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,        
      preload: path.join(__dirname, "preload.js")
    },
  });
    mainWindow.maximize();
    ipcMain.on("close", () => mainWindow.close());
  ipcMain.on("minimize", () => mainWindow.minimize());
  ipcMain.handle('get-topics', () => store.get('topics', []));
  ipcMain.handle('save-topics', (event, topics) => store.set('topics', topics));
  ipcMain.handle("export-data", async () => {
  const topics = store.get("topics", []);
  const savePath = dialog.showSaveDialogSync({
    title: "Export Notes",
    defaultPath: "notes.json",
    filters: [{ name: "JSON", extensions: ["json"] }],
  });

  if (savePath) {
    fs.writeFileSync(savePath, JSON.stringify(topics, null, 2));
    return { success: true, path: savePath };
  }
  return { success: false };
});
ipcMain.handle("import-data", async () => {
  const result = dialog.showOpenDialogSync({
    title: "Import Notes",
    filters: [{ name: "JSON", extensions: ["json"] }],
    properties: ["openFile"]
  });

  if (result && result[0]) {
    const filePath = result[0];
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const importedTopics = JSON.parse(fileContent);
    return importedTopics;
  }
  return { success: false };
});
  ipcMain.handle('open-external-link', (event, url) =>{
    shell.openExternal(url)
  } );
  Menu.setApplicationMenu(null);
  // const startURL = isDev
  //   ? 'http://localhost:3000'
  //   : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
  // mainWindow.loadURL('http://localhost:3000');
  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});