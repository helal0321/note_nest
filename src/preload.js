const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("minimize"),
  close: () => ipcRenderer.send("close"),
  getTopics: () => ipcRenderer.invoke("get-topics"),
  saveTopics: (topics) => ipcRenderer.invoke("save-topics", topics),
  exportData: () => ipcRenderer.invoke("export-data"),
  importData: () => ipcRenderer.invoke("import-data"),
  openExternalLink: (url) => ipcRenderer.invoke("open-external-link", url),
  setGlobalPassword: (password) => ipcRenderer.invoke("set-global-password",password),
  getGlobalPassword: () => ipcRenderer.invoke("get-global-password"),

});
