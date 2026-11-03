1. Scaffold
cd "D:\- Quiz App\FE-Q"
npm create vite@latest . -- --template react-ts
Folder FE-Q kapital → Vite akan minta Package name: isi fe-q. Untuk pertanyaan rolldown-vite, pilih "No."

2. Install dependency
npm install
npm i react-router-dom axios
npm i -D tailwindcss @tailwindcss/vite

3. Konfigurasi Vite (Tailwind + proxy backend)
vite.config.ts — timpa seluruh isinya:
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': { target: 'http://localhost:3000', changeOrigin: true },
    },
  },
})

4. Style global
src/index.css — ganti total:
@import "tailwindcss";
Lalu hapus src/App.css dan src/assets/react.svg. Tambahkan font di index.html (Inter, Plus Jakarta Sans, Material Symbols) karena mockup FE memakainya.

5. Environment variable
- .env.local → VITE_API_URL=/api
- .env.example → VITE_API_URL=/api (ini yang di-commit)
- src/vite-env.d.ts → tambahkan:
interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

6. Axios client
src/lib/api.ts:
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
})

7. Router
src/main.tsx → bungkus <App /> dengan <BrowserRouter>.
src/App.tsx → ganti isi dengan <Routes> berisi placeholder:
/           → Login
/dashboard  → Dashboard
/quiz/:id   → Quiz
/result     → Result
Sisa komponen default template (counter demo, logo) dibuang.

8. Verifikasi
npm run dev     # buka http://localhost:5173
npm run build   # pastikan tsc + vite build lolos
Struktur akhir
FE-Q/
├─ index.html              # <title> + font links
├─ vite.config.ts          # react + tailwind + proxy /api
├─ .env.local / .env.example
├─ public/
└─ src/
   ├─ main.tsx             # BrowserRouter
   ├─ App.tsx              # Routes
   ├─ index.css            # @import "tailwindcss"
   ├─ vite-env.d.ts
   ├─ lib/api.ts           # axios instance
   ├─ pages/               # Login, Dashboard, Quiz, Result
   └─ components/

Yang belum masuk scope (tahap lanjutan)
- Port design dari FE: mockup memakai ~40 custom color token (bg-canvas, text-slate, secondary-container, dst.) yang perlu dipindah ke blok @theme di Tailwind v4 agar class seperti bg-bg-canvas valid.
- Fix backend: BE/index.js masih error (Routes tidak di-import, express.json() belum ada), jadi /api/* belum bisa diuji dari FE sampai itu dibenahi.