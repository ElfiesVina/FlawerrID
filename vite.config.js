import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const akar = fileURLToPath(new URL('.', import.meta.url));
const p = (f) => akar + f;

// Daftar halaman. admin/ ikut hanya jika sudah ada di repo.
const halaman = {
  beranda: 'index.html',
  library: 'library/index.html',
  novel: 'novel/index.html',
  baca: 'baca/index.html',
  about: 'about/index.html',
  kritik: 'kritik-saran/index.html',
  admin: 'admin/index.html',
};
const input = {};
for (const [nama, file] of Object.entries(halaman)) {
  if (existsSync(p(file))) input[nama] = p(file);
}

export default defineConfig({
  build: { rollupOptions: { input } },
});
