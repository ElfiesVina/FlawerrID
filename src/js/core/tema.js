/* Tema terang/gelap. Disimpan lewat storage.js */
import { ambil, simpan } from './storage.js';

export function terapkanTema() {
  const t = ambil('tema');
  if (t === 'terang' || t === 'gelap') document.documentElement.dataset.tema = t;
}

export function gantiTema() {
  const sekarang = document.documentElement.dataset.tema
    || (matchMedia('(prefers-color-scheme: dark)').matches ? 'gelap' : 'terang');
  const baru = sekarang === 'gelap' ? 'terang' : 'gelap';
  document.documentElement.dataset.tema = baru;
  simpan('tema', baru);
}
