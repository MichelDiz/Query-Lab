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

app.setName('Query Lab');

setApplicationMenu => {
  if (process.platform === 'darwin') {
      const template = [ {
          label: app.getName(),
          submenu: [ {
              label: 'Quit',
              accelerator: 'Command+Q',
              click() {
                  app.quit();
              }
          },
          {
            label: 'New Window',
            click() {
              createWindow();
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
      },{
        label: 'Help',
        submenu: [ {
            label: 'About'
        },
        {
            label: 'Dgraph Github',
            click () { require('electron').shell.openExternal('https://github.com/dgraph-io/dgraph') }
        }
        ]
    } ];

      Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  } else {
      Menu.setApplicationMenu(null);
  }
}


( async () => {
  await app.whenReady();

  isDev ? null && console.log(Menu) : setApplicationMenu();

  const options = {
    // frame: false,
    transparent: true,
    titleBarStyle: 'hiddenInset',
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
isDev ? ( async () => { mainWindow.webContents.openDevTools(),
mainWindow.webContents.on('devtools-opened', () => {
  setImmediate(() => {
      // do whatever you want to do after dev tool completely opened here
      mainWindow.focus();
  });
}) })() : null;


  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));

  })();

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

// var screenElectron = electron.screen;
// var mainScreen = screenElectron.getPrimaryDisplay();
// var allScreens = screenElectron.getAllDisplays();

// console.log(mainScreen, allScreens);