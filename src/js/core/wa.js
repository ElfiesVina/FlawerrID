/* Satu-satunya tempat membuat tautan WhatsApp */
export function nomorValid(nomor) {
  return /^62\d{8,13}$/.test(String(nomor || '').replace(/\D/g, ''));
}

export function urlWA(nomor, teks) {
  return 'https://wa.me/' + String(nomor).replace(/\D/g, '') + '?text=' + encodeURIComponent(teks);
}
