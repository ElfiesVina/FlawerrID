/* Header bersama, disuntik ke #header di semua halaman */
import { terapkanTema, gantiTema } from '../core/tema.js';
import { esc } from '../core/format.js';

export function mountHeader({ judul, kembali = false } = {}) {
  terapkanTema();
  const el = document.getElementById('header');
  if (!el) return;
  el.className = 'header';
  el.innerHTML =
    (kembali
      ? '<button id="btn-kembali" aria-label="Kembali">‹</button>'
      : '<span class="spasi"></span>') +
    '<h1>' + esc(judul || 'Meteor Itu') + '</h1>' +
    '<button id="btn-tema" aria-label="Ganti tema">◐</button>';
  document.getElementById('btn-tema').onclick = gantiTema;
  const b = document.getElementById('btn-kembali');
  if (b) b.onclick = () => history.back();
}
