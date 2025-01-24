import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code !== "THIS_IS_UNDEFINED") warn(warning);
      },
    },
  },
});
