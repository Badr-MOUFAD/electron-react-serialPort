const { BrowserWindow, app } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;


if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  })
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    webPreferences: {
      //worldSafeExecuteJavaScript: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  win.autoHideMenuBar = true;
  win.menuBarVisible = false;
  win.loadFile('index.html');
}

app.allowRendererProcessReuse = false;

app.whenReady().then(createWindow);