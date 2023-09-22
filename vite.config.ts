import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import vitePluginStylusAlias from 'vite-plugin-stylus-alias'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vitePluginStylusAlias()],
    base: './',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            'common': fileURLToPath(new URL('./common', import.meta.url))
        }
    }
})

