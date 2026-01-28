import { app, shell, BrowserWindow, ipcMain, globalShortcut } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import https from 'https'

let desktopWindow: BrowserWindow | null = null
let overlayWindow: BrowserWindow | null = null

function createDesktopWindow(): void {
  desktopWindow = new BrowserWindow({
    width: 900,
    height: 670,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  desktopWindow.on('ready-to-show', () => {
    desktopWindow?.show()
  })

  desktopWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    desktopWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    desktopWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  desktopWindow.on('closed', () => {
    desktopWindow = null
  })
}

function createOverlayWindow(): void {
  overlayWindow = new BrowserWindow({
    width: 900,
    height: 670,
    x: 20,
    y: 20,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  overlayWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    overlayWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    overlayWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  overlayWindow.on('closed', () => {
    overlayWindow = null
  })
}

app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+X', () => {
    if (overlayWindow) {
      if (overlayWindow.isVisible()) {
        overlayWindow.hide()
      } else {
        overlayWindow.show()
      }
    }
  })

  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  createDesktopWindow()
  createOverlayWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createDesktopWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

// Handle game state changes
ipcMain.on('game-state-changed', (_event, isInGame: boolean) => {
  if (isInGame) {
    if (!overlayWindow) {
      createOverlayWindow()
    }
    overlayWindow?.show()
    desktopWindow?.hide()
  } else {
    overlayWindow?.hide()
    desktopWindow?.show()
  }
})

// Handle League API requests
ipcMain.handle('get-game-data', async () => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '127.0.0.1',
      port: 2999,
      path: '/liveclientdata/allgamedata',
      method: 'GET',
      rejectUnauthorized: false
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch (e) {
          reject(e)
        }
      })
    })

    req.on('error', (error) => reject(error))
    req.setTimeout(3000, () => {
      req.destroy()
      reject(new Error('Timeout'))
    })
    req.end()
  })
})