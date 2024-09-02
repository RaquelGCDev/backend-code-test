import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals : true,
        env: loadEnv(process.cwd(), ''),
    },
})