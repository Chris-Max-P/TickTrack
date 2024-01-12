const { app, BrowserWindow, ipcMain} = require('electron')
const {environment} = require("./environments/environment");
const logger = require('./scripts/logger');
const files = require('./scripts/files');
const {join} = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 900,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    }
  })

  ipcMain.on('close_app', () => app.quit());
  ipcMain.on('log', (event, message, logLevel) => logger.rendererProcessLog(message, logLevel))

  if (environment.production) {
    win.loadFile('web/dist/index.html')
  } else {
    const ngDev = require("./scripts/angular-dev");
    ngDev.runNgDev(win);
  }
}

app.whenReady().then(() => {
  initIpc();
  createWindow();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})





function initIpc() {
  ipcMain.handle('trackTime', (event, data) => files.trackTime(data));
  ipcMain.handle('readTrackedTimes', (event, date) => files.readTrackedTimes(date));
}

