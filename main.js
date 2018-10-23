// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const {autoUpdater} = require("electron-updater");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => app.quit());
  return mainWindow;
}
// when the update is ready, notify the BrowserWindow
autoUpdater.on('update-downloaded', (info) => {
  mainWindow.webContents.send('updateReady')
});
app.on('ready', function() {
createWindow();
autoUpdater.checkForUpdates();
});
ipcMain.on("quitAndInstall", (event, arg) => {
  autoUpdater.quitAndInstall();
})
