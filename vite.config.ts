import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:5126", // URL вашого бекенду
//         changeOrigin: true,
//       },
//     },
//   },
// });

