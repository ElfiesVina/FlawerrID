/* Pembantu format teks yang dipakai banyak halaman */
export function esc(teks) {
  return String(teks).replace(/[&<>"]/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]
  ));
}
