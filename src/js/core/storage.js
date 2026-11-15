/* Satu-satunya pintu ke localStorage. Semua kunci diawali PREFIX dan dibungkus try/catch */
import { PREFIX } from './config.js';

export function ambil(kunci) {
  try { return localStorage.getItem(PREFIX + kunci); } catch (e) { return null; }
}

export function simpan(kunci, nilai) {
  try { localStorage.setItem(PREFIX + kunci, String(nilai)); } catch (e) { /* abaikan */ }
}
