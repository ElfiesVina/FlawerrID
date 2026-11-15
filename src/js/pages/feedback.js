/* Logika khusus halaman Kritik dan Saran. Hanya dipakai oleh kritik-saran/index.html */
import { getSite } from '../core/api.js';
import { urlWA, nomorValid } from '../core/wa.js';
import { mountHeader } from '../components/header.js';
import { mountNav } from '../components/nav.js';
import { bukaModal, tutupModal } from '../components/modal.js';

const KATEGORI = {
  Kritik: ['Alur cerita', 'Karakter', 'Gaya bahasa', 'Typo atau salah tulis', 'Tampilan aplikasi', 'Lainnya'],
  Saran: ['Ide cerita', 'Fitur aplikasi', 'Jadwal rilis', 'Tampilan', 'Lainnya'],
};

let nomor = '';
let info = null;

// Konteks dari halaman baca: /kritik-saran/?n=Meteor%20Itu&e=Episode%2012
function konteks() {
  const q = new URLSearchParams(location.search);
  return [q.get('n'), q.get('e')]
    .map((s) => (s || '').slice(0, 80))
    .filter(Boolean)
    .join(' | ');
}

function susun(jenis, kategori, isi) {
  const k = konteks();
  return '*' + jenis + '*' + (kategori ? ' - ' + kategori : '') +
    (k ? '\nTentang: ' + k : '') +
    (isi ? '\n\n' + isi : '');
}

function siapKirim() {
  if (nomorValid(nomor)) return true;
  info.textContent = 'Nomor WhatsApp belum diatur. Isi "whatsapp" di public/data/site.json.';
  return false;
}

function kirimWA(teks) {
  window.open(urlWA(nomor, teks), '_blank', 'noopener');
}

function formModal(jenis) {
  const wadah = document.createElement('div');
  let pilih = '';

  const chips = document.createElement('div');
  chips.className = 'chips';
  const ta = document.createElement('textarea');
  ta.placeholder = 'Tulis penjelasan (boleh dikosongkan)';
  ta.maxLength = 1000;
  const kirim = document.createElement('button');
  kirim.className = 'btn';
  kirim.textContent = 'Kirim lewat WhatsApp';
  kirim.disabled = true;

  KATEGORI[jenis].forEach((nama) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.textContent = nama;
    b.onclick = () => {
      pilih = nama;
      chips.querySelectorAll('.chip').forEach((c) => c.classList.toggle('on', c === b));
      kirim.disabled = false;
    };
    chips.appendChild(b);
  });

  kirim.onclick = () => {
    kirimWA(susun(jenis, pilih, ta.value.trim()));
    tutupModal();
  };

  wadah.append(chips, ta, kirim);
  return wadah;
}

function bukaForm(jenis) {
  info.textContent = '';
  if (!siapKirim()) return;
  bukaModal(jenis, formModal(jenis));
}

async function mulai() {
  mountHeader({ judul: 'Kritik dan Saran', kembali: true });
  mountNav('saran');
  const app = document.getElementById('app');
  app.innerHTML =
    '<h2>Kritik dan Saran</h2>' +
    '<p class="mut">Pilih jenis masukanmu. Pesan akan dikirim lewat WhatsApp.</p>' +
    '<p class="konteks" id="konteks" hidden></p>' +
    '<button class="btn" id="btn-kritik">Kritik</button>' +
    '<button class="btn alt" id="btn-saran">Saran</button>' +
    '<h3 class="komentar-judul">Komentar</h3>' +
    '<textarea id="isi-komentar" maxlength="1000" placeholder="Tulis komentarmu di sini"></textarea>' +
    '<button class="btn" id="btn-komentar">Kirim lewat WhatsApp</button>' +
    '<p class="mut" id="info"></p>';
  info = document.getElementById('info');

  const k = konteks();
  if (k) {
    const el = document.getElementById('konteks');
    el.textContent = 'Tentang: ' + k;
    el.hidden = false;
  }

  try { nomor = (await getSite()).whatsapp || ''; } catch (e) { nomor = ''; }

  document.getElementById('btn-kritik').onclick = () => bukaForm('Kritik');
  document.getElementById('btn-saran').onclick = () => bukaForm('Saran');
  document.getElementById('btn-komentar').onclick = () => {
    info.textContent = '';
    const isi = document.getElementById('isi-komentar').value.trim();
    if (!isi) { info.textContent = 'Tulis komentarmu dulu.'; return; }
    if (!siapKirim()) return;
    kirimWA(susun('Komentar', '', isi));
  };
}

mulai();
