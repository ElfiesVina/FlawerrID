/* Satu-satunya pintu membaca file data */
import { DATA } from './config.js';

async function ambilJSON(path) {
  const res = await fetch(DATA + path);
  if (!res.ok) throw new Error('Gagal memuat ' + path);
  return res.json();
}

export const getSite = () => ambilJSON('/site.json');
