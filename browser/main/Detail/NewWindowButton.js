import PropTypes from 'prop-types'
import React from 'react'
import CSSModules from 'browser/lib/CSSModules'
import styles from './FullscreenButton.styl'
import i18n from 'browser/lib/i18n'
import store from 'browser/main/store.js'
const electron = require('electron')
const { shell } = electron
const ipc = electron.ipcRenderer
const BrowserWindow = electron.remote.BrowserWindow
const { ipcMain } = electron
const path = require('path')

function openNewWindow (key) {
  const url = '/home/jk/development/Boostnote/lib/main.html'
  let win = new BrowserWindow({
    // center: true,
    width: 1200,
    height: 400,
    show: false
  })
  win.loadURL('file://' + url, {
    query: {
      newWindow: true,
      key: key
    },
    search: 'sdfsdfsdf',
    hash: 'ffffff'
  })
  // win.loadURL('file://' + url + "?keysdfsdf=" +key + "&newWindow=" + true)
  console.log(5555, key)
  win.setTitle('sdfsdf')
  BrowserWindow.getAllWindows()
  win.show()
  win.webContents.openDevTools()
  const id = win.id
  win.on('closed', () => {
    store.dispatch({
      type: 'REMOVE_WINDOW',
      window: id
    })
    win = null
  })
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('message', 'Hello second window!')
  })
  store.dispatch({
    type: 'ADD_WINDOW',
    window: win
  })
}

console.log(BrowserWindow.getAllWindows())
// win.webContents.send('message', 'Hello second window!');
ipc.send('message', `Send message from second window to renderer via main.`)

ipc.on('message', (event, message) => {
  console.log(message) // logs out "Hello second window!"
})
// https://icons8.com/icons/set/open-in-new-window
const FullscreenButton = ({
  noteKey
}) => {
  const hotkey = 'Open fullscreen'
  return (
    <button styleName='control-fullScreenButton' title={i18n.__('In New Window')} onMouseDown={(e) => openNewWindow(noteKey)}>
      {/* <img styleName='iconInfo' src='https://img.icons8.com/ios/50/000000/new-window.png' /> */}
      asdf
      {/* <img src="https://img.icons8.com/ios/50/000000/new-window.png"></img> */}
      <span lang={i18n.locale} styleName='tooltip'>{i18n.__('In New Window')}</span>
    </button>
  )
}

FullscreenButton.propTypes = {
  noteKey: PropTypes.string.isRequired
}

export default CSSModules(FullscreenButton, styles)
