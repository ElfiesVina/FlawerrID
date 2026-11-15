/* Logika khusus halaman Beranda. Hanya dipakai oleh index.html */
import { getSite } from '../core/api.js';
import { esc } from '../core/format.js';
import { mountHeader } from '../components/header.js';
import { mountNav } from '../components/nav.js';

async function mulai() {
  mountHeader({ judul: 'Meteor Itu' });
  mountNav('beranda');
  const app = document.getElementById('app');
  try {
    const s = await getSite();
    app.innerHTML =
      '<section class="hero">' +
        '<div class="avatar" id="avatar"><img id="foto" alt="Foto ' + esc(s.namaPena) + '" src="' + esc(s.foto) + '"></div>' +
        '<h2>' + esc(s.namaPena) + '</h2>' +
        '<p class="mut">' + esc(s.profil) + '</p>' +
      '</section>' +
      '<blockquote class="cuplikan">' + esc(s.cuplikan) + '</blockquote>' +
      '<a class="btn" href="/library/">Library</a>' +
      '<a class="btn alt" href="/about/">About</a>' +
      '<a class="btn alt" href="/kritik-saran/">Kritik dan Saran</a>';
    document.getElementById('foto').addEventListener('error', () => {
      document.getElementById('avatar').textContent = (s.namaPena || '?').charAt(0).toUpperCase();
    });
  } catch (e) {
    app.innerHTML = '<p class="galat">Beranda belum bisa dimuat. Coba lagi nanti.</p>';
  }
}

mulai();
