/* Navigasi bawah bersama, disuntik ke #nav di semua halaman */
const MENU = [
  ['beranda', 'Beranda', '/'],
  ['library', 'Library', '/library/'],
  ['about', 'About', '/about/'],
  ['saran', 'Saran', '/kritik-saran/'],
];

export function mountNav(aktif) {
  const el = document.getElementById('nav');
  if (!el) return;
  el.className = 'nav';
  el.innerHTML = MENU.map(([id, nama, href]) =>
    '<a href="' + href + '"' + (id === aktif ? ' class="aktif"' : '') + '>' + nama + '</a>'
  ).join('');
}
