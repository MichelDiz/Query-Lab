const electron = require("electron");
const {
  Menu,
  app,
  shell
} = electron;

const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function setApplicationMenu() {
  if (process.platform === 'darwin') {
      const template = [ {
          label: app.getName(),
          submenu: [ {
              label: 'Quit',
              accelerator: 'Command+Q',
              click() {
                  app.quit();
              }
          } ]
      }, {
          label: 'Edit',
          submenu: [ {
              label: 'Undo',
              accelerator: 'CmdOrCtrl+Z',
              selector: 'undo:'
          },
          {
              label: 'Redo',
              accelerator: 'Shift+CmdOrCtrl+Z',
              selector: 'redo:'
          },
          {
              type: 'separator'
          },
          {
              label: 'Cut',
              accelerator: 'CmdOrCtrl+X',
              selector: 'cut:'
          },
          {
              label: 'Copy',
              accelerator: 'CmdOrCtrl+C',
              selector: 'copy:'
          },
          {
              label: 'Paste',
              accelerator: 'CmdOrCtrl+V',
              selector: 'paste:'
          },
          {
              label: 'Select All',
              accelerator: 'CmdOrCtrl+A',
              selector: 'selectAll:'
          }
          ]
      } ];

      Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  } else {
      Menu.setApplicationMenu(null);
  }
}


function createWindow() {
  // Application menu.
  setApplicationMenu();

  const options = {
    // frame: false,
    titleBarStyle: 'hidden',
    width: 900,
    height: 680,
    // x: windowState.x,
    // y: windowState.y,
    // width: windowState.width,
    // height: windowState.height,
    minWidth: 800,
    minHeight: 600,
    show: true,
    webPreferences: {
        nativeWindowOpen: true
    }
};

  mainWindow = new BrowserWindow(options);

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
