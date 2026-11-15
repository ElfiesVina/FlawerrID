# FlawerrID - Struktur Proyek (Vite)

FlawerrID adalah platform untuk menerbitkan karya tulis. Meteor Itu merupakan salah satu novel di dalam platform.

## Hierarki novel
Novel -> Bab -> Episode. Halaman baca = episode.
Struktur ada di public/data/novels/ID-NOVEL/struktur.json; isi di episode/NNNN.txt.

## Menambah episode baru (dua langkah)
1. Buat public/data/novels/ID-NOVEL/episode/NNNN.txt (isi saja, tanpa judul). Nomor berlaku untuk seluruh buku (0001-0150).
2. Tambah satu baris episode di struktur.json (judul, file, tanggal).
Lalu commit. Urutan rilis: unggah, tunggu deploy Vercel selesai, baru kirim notifikasi.

## Menambah novel baru
1. Salin folder public/data/novels/meteor-itu menjadi public/data/novels/ID-BARU.
2. Daftarkan ID-BARU di public/data/novels.json.

## Aturan agar tidak bertabrakan
- Satu sumber data: judul hanya di struktur.json, bukan di file .txt.
- Hanya core/storage.js yang menyentuh localStorage; hanya core/api.js yang membaca data; hanya services/supabase.js yang membuat klien Supabase.
- Setiap halaman punya css dan js sendiri di src/css/pages dan src/js/pages.
- Semua kunci localStorage diawali "mi:".
- ID novel tidak boleh berubah setelah terbit; nomor episode tidak boleh dipakai ulang.
- Rahasia (service-role key, kunci Firebase) tidak boleh ada di repo.

## Pemetaan dari file lama (tidak ikut zip ini, pindahkan sendiri)
- feedback.js lama -> src/js/services/feedback.js
- style.css lama -> dipecah ke src/css/base.css, layout.css, components.css
- admin/ -> tetap di admin/ (jangan ditimpa)
- supabase/schema.sql -> tetap
- package.json, .env.example -> tetap (jangan ditimpa)
- vite.config.js -> ganti dengan yang ada di zip ini
- index.html lama -> bagian form feedback pindah ke kritik-saran/index.html

## Catatan
Data dibaca lewat fetch ke /data/..., jadi jalankan dengan npm run dev, bukan klik ganda file.
Folder android/ dan capacitor.config.json dibuat nanti saat fase APK; supabase/functions/ saat fase notifikasi.

## Pengaturan awal
- Edit public/data/site.json: namaPena, profil, cuplikan, foto, dan whatsapp (format 628xxxxxxxxxx, tanpa + atau spasi).
- Kritik dan Saran dikirim lewat WhatsApp. Dari halaman baca, tautkan ke /kritik-saran/?n=JUDUL&e=EPISODE agar pesan memuat konteks.
