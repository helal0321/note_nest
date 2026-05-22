const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("minimize"),
  close: () => ipcRenderer.send("close"),
  getTopics: () => ipcRenderer.invoke('get-topics'),       // ✅ async via IPC
  saveTopics: (topics) => ipcRenderer.invoke('save-topics', topics),
});