/* Modal bersama. Tombol Kembali di HP menutup modal, bukan keluar halaman */
let latar = null;

function lepas() {
  if (!latar) return;
  latar.remove();
  latar = null;
  document.body.classList.remove('modal-buka');
}

export function bukaModal(judul, konten) {
  if (latar) return;
  latar = document.createElement('div');
  latar.className = 'modal-latar';
  latar.innerHTML =
    '<div class="modal" role="dialog" aria-modal="true">' +
      '<div class="modal-kepala"><h3></h3><button class="modal-x" aria-label="Tutup">×</button></div>' +
      '<div class="modal-isi"></div>' +
    '</div>';
  latar.querySelector('h3').textContent = judul;
  latar.querySelector('.modal-isi').appendChild(konten);
  latar.addEventListener('click', (e) => { if (e.target === latar) tutupModal(); });
  latar.querySelector('.modal-x').onclick = () => tutupModal();
  document.body.appendChild(latar);
  document.body.classList.add('modal-buka');
  history.pushState({ modal: true }, '');
}

export function tutupModal() {
  if (latar) history.back();
}

addEventListener('popstate', lepas);
