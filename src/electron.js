const { app, BrowserWindow ,Menu,ipcMain} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
const Store = require('electron-store');  
const store = new Store();              
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    
    // fullscreen: true,
    webPreferences: {
      nodeIntegration: false,      // ✅ set to false — not needed with contextBridge
      contextIsolation: true,        preload: path.join(__dirname, "preload.js")
    },
  });
    mainWindow.maximize();
    ipcMain.on("close", () => mainWindow.close());
  ipcMain.on("minimize", () => mainWindow.minimize());
    ipcMain.handle('get-topics', () => store.get('topics', []));
  ipcMain.handle('save-topics', (event, topics) => store.set('topics', topics));
  Menu.setApplicationMenu(null);
  const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL('http://localhost:3000');

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