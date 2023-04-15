import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import myResolve from 'vite-plugin-resolve'

export const ConfigResolvePlugin = () => {
  return myResolve({
    'agora-electron-sdk': `
      const { createAgoraRtcEngine } = require("agora-electron-sdk")
      export {
        createAgoraRtcEngine
      }
    `
  })
}

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    // ConfigResolvePlugin()
    plugins: [react(), ConfigResolvePlugin()]
  }
})
