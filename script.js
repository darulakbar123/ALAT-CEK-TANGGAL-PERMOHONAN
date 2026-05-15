
/* ============================================================
   SPLASH SCREEN — hilang setelah 1 detik
   ============================================================ */
(function() {
  const splash = document.getElementById('splashScreen');
  if (!splash) return;

  // 1000ms tampil → fade out 350ms → remove dari DOM
  setTimeout(() => {
    splash.classList.add('splash-fade');
    setTimeout(() => {
      splash.remove();
    }, 350);
  }, 3500);
})();

/**
 * PEMERIKSA TENGGAT WAKTU SENGKETA INFORMASI PUBLIK
 * script.js — Logika Utama Aplikasi
 *
 * Referensi Hukum:
 *   - UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik (UU KIP)
 *   - PERKI No. 1 Tahun 2013 tentang Prosedur Penyelesaian Sengketa Informasi Publik
 *   - PERKI No. 1 Tahun 2018 tentang Standar Layanan Informasi Publik
 *   - PERKI No. 1 Tahun 2021 (amandemen terbaru)
 *
 * Semua proses berjalan di sisi klien (browser), tanpa database atau server.
 * Data hari libur bersifat statis, mencakup tahun 2023–2027.
 */

'use strict';

/* ============================================================
   1. DATA HARI LIBUR NASIONAL & CUTI BERSAMA INDONESIA
   Sumber: Surat Keputusan Bersama (SKB) 3 Menteri per tahun.
   Format: 'YYYY-MM-DD'
   CATATAN: Data 2026–2027 merupakan estimasi berdasarkan
   kalender Islam dan kalender Gregorian. Mohon verifikasi
   ke sumber resmi jika diperlukan.
   ============================================================ */
const HARI_LIBUR = new Set([

  // ===================================================
  // TAHUN 2023
  // ===================================================
  '2023-01-01', // Tahun Baru Masehi
  '2023-01-22', // Tahun Baru Imlek 2574 Kongzili
  '2023-01-23', // Cuti Bersama Imlek
  '2023-02-18', // Isra Mi'raj Nabi Muhammad SAW 1444 H
  '2023-03-22', // Hari Raya Nyepi 1945 Saka
  '2023-03-23', // Cuti Bersama Nyepi
  '2023-04-07', // Wafat Isa Al Masih (Good Friday)
  '2023-04-18', // Cuti Bersama Idul Fitri
  '2023-04-19', // Hari Raya Idul Fitri 1444 H (1)
  '2023-04-20', // Hari Raya Idul Fitri 1444 H (2)
  '2023-04-21', // Cuti Bersama Idul Fitri
  '2023-04-24', // Cuti Bersama Idul Fitri
  '2023-04-25', // Cuti Bersama Idul Fitri
  '2023-05-01', // Hari Buruh Internasional
  '2023-05-18', // Kenaikan Isa Al Masih
  '2023-05-19', // Cuti Bersama Kenaikan Isa Al Masih
  '2023-05-24', // Hari Raya Waisak 2567 BE
  '2023-06-01', // Hari Lahir Pancasila
  '2023-06-28', // Hari Raya Idul Adha 1444 H
  '2023-06-29', // Cuti Bersama Idul Adha
  '2023-07-19', // Tahun Baru Islam 1445 H
  '2023-08-17', // Hari Kemerdekaan Republik Indonesia
  '2023-09-27', // Maulid Nabi Muhammad SAW 1445 H
  '2023-09-28', // Cuti Bersama Maulid Nabi
  '2023-12-25', // Hari Raya Natal
  '2023-12-26', // Cuti Bersama Natal

  // ===================================================
  // TAHUN 2024
  // ===================================================
  '2024-01-01', // Tahun Baru Masehi
  '2024-02-08', // Cuti Bersama (Pemilu Legislatif)
  '2024-02-10', // Hari Raya Imlek 2575 Kongzili
  '2024-02-14', // Hari Pemungutan Suara Pemilu (Libur Nasional)
  '2024-03-11', // Cuti Bersama Nyepi
  '2024-03-12', // Hari Raya Nyepi 1946 Saka
  '2024-03-29', // Wafat Isa Al Masih (Good Friday)
  '2024-04-08', // Cuti Bersama Idul Fitri
  '2024-04-09', // Cuti Bersama Idul Fitri
  '2024-04-10', // Hari Raya Idul Fitri 1445 H (1)
  '2024-04-11', // Hari Raya Idul Fitri 1445 H (2)
  '2024-04-12', // Cuti Bersama Idul Fitri
  '2024-04-15', // Cuti Bersama Idul Fitri
  '2024-05-01', // Hari Buruh Internasional
  '2024-05-09', // Kenaikan Isa Al Masih
  '2024-05-10', // Cuti Bersama Kenaikan Isa Al Masih
  '2024-05-23', // Hari Raya Waisak 2568 BE
  '2024-05-24', // Cuti Bersama Waisak
  '2024-06-01', // Hari Lahir Pancasila
  '2024-06-17', // Hari Raya Idul Adha 1445 H
  '2024-06-18', // Cuti Bersama Idul Adha
  '2024-06-19', // Cuti Bersama Idul Adha
  '2024-07-07', // Tahun Baru Islam 1446 H
  '2024-08-17', // Hari Kemerdekaan Republik Indonesia
  '2024-09-16', // Maulid Nabi Muhammad SAW 1446 H
  '2024-12-25', // Hari Raya Natal
  '2024-12-26', // Cuti Bersama Natal

  // ===================================================
  // TAHUN 2025
  // ===================================================
  '2025-01-01', // Tahun Baru Masehi
  '2025-01-27', // Isra Mi'raj Nabi Muhammad SAW 1446 H
  '2025-01-28', // Cuti Bersama Isra Mi'raj
  '2025-01-29', // Hari Raya Imlek 2576 Kongzili
  '2025-03-26', // Cuti Bersama Idul Fitri
  '2025-03-27', // Cuti Bersama Idul Fitri
  '2025-03-28', // Hari Raya Nyepi 1947 Saka
  '2025-03-29', // Cuti Bersama Nyepi
  '2025-03-31', // Hari Raya Idul Fitri 1446 H (1)
  '2025-04-01', // Hari Raya Idul Fitri 1446 H (2)
  '2025-04-02', // Wafat Isa Al Masih (Good Friday)
  '2025-04-03', // Cuti Bersama Idul Fitri
  '2025-04-04', // Cuti Bersama Idul Fitri
  '2025-05-01', // Hari Buruh Internasional
  '2025-05-12', // Hari Raya Waisak 2569 BE
  '2025-05-13', // Cuti Bersama Waisak
  '2025-05-29', // Kenaikan Isa Al Masih
  '2025-05-30', // Cuti Bersama Kenaikan Isa Al Masih
  '2025-06-01', // Hari Lahir Pancasila
  '2025-06-06', // Hari Raya Idul Adha 1446 H
  '2025-06-07', // Cuti Bersama Idul Adha
  '2025-06-09', // Cuti Bersama Idul Adha
  '2025-06-27', // Tahun Baru Islam 1447 H
  '2025-08-17', // Hari Kemerdekaan Republik Indonesia
  '2025-09-05', // Maulid Nabi Muhammad SAW 1447 H
  '2025-12-25', // Hari Raya Natal
  '2025-12-26', // Cuti Bersama Natal

  // ===================================================
  // TAHUN 2026 (Estimasi)
  // Idul Fitri 1447 H: sekitar 20–21 Maret 2026
  // Idul Adha 1447 H: sekitar 27–28 Mei 2026
  // Waisak: sekitar 22 Mei 2026
  // Easter: 5 April 2026 → Good Friday: 3 April 2026
  // Kenaikan Isa Al Masih: 39 hari setelah Easter = 14 Mei 2026
  // ===================================================
  '2026-01-01', // Tahun Baru Masehi
  '2026-01-16', // Isra Mi'raj 1447 H (estimasi)
  '2026-01-17', // Cuti Bersama Isra Mi'raj
  '2026-01-28', // Hari Raya Imlek 2577 Kongzili
  '2026-01-29', // Cuti Bersama Imlek
  '2026-03-09', // Hari Raya Nyepi 1948 Saka (estimasi)
  '2026-03-10', // Cuti Bersama Nyepi
  '2026-03-18', // Cuti Bersama Idul Fitri
  '2026-03-19', // Cuti Bersama Idul Fitri
  '2026-03-20', // Hari Raya Idul Fitri 1447 H (1) (estimasi)
  '2026-03-21', // Hari Raya Idul Fitri 1447 H (2) (estimasi)
  '2026-03-22', // Cuti Bersama Idul Fitri
  '2026-03-23', // Cuti Bersama Idul Fitri
  '2026-04-03', // Wafat Isa Al Masih (Good Friday — Easter 5 April)
  '2026-05-01', // Hari Buruh Internasional
  '2026-05-14', // Kenaikan Isa Al Masih (39 hari setelah Easter 5 April)
  '2026-05-22', // Hari Raya Waisak 2570 BE (estimasi)
  '2026-05-23', // Cuti Bersama Waisak
  '2026-05-27', // Hari Raya Idul Adha 1447 H (estimasi)
  '2026-05-28', // Cuti Bersama Idul Adha
  '2026-05-29', // Cuti Bersama Idul Adha
  '2026-06-01', // Hari Lahir Pancasila
  '2026-06-16', // Tahun Baru Islam 1448 H (estimasi)
  '2026-08-17', // Hari Kemerdekaan Republik Indonesia
  '2026-09-24', // Maulid Nabi Muhammad SAW 1448 H (estimasi)
  '2026-12-25', // Hari Raya Natal
  '2026-12-26', // Cuti Bersama Natal

  // ===================================================
  // TAHUN 2027 (Estimasi)
  // Idul Fitri 1448 H: sekitar 9–10 Maret 2027
  // Easter: 28 Maret 2027 → Good Friday: 26 Maret 2027
  // Kenaikan: 6 Mei 2027
  // ===================================================
  '2027-01-01', // Tahun Baru Masehi
  '2027-01-06', // Isra Mi'raj 1448 H (estimasi)
  '2027-01-07', // Cuti Bersama
  '2027-01-16', // Tahun Baru Imlek 2578 Kongzili (estimasi)
  '2027-01-17', // Cuti Bersama Imlek
  '2027-03-09', // Cuti Bersama Idul Fitri
  '2027-03-10', // Hari Raya Idul Fitri 1448 H (1) (estimasi)
  '2027-03-11', // Hari Raya Idul Fitri 1448 H (2) (estimasi)
  '2027-03-12', // Cuti Bersama Idul Fitri
  '2027-03-26', // Wafat Isa Al Masih (Good Friday)
  '2027-03-27', // Hari Raya Nyepi (estimasi)
  '2027-03-28', // Cuti Bersama Nyepi
  '2027-05-01', // Hari Buruh Internasional
  '2027-05-06', // Kenaikan Isa Al Masih (estimasi)
  '2027-05-17', // Hari Raya Idul Adha 1448 H (estimasi)
  '2027-05-18', // Cuti Bersama Idul Adha
  '2027-05-24', // Hari Raya Waisak 2571 BE (estimasi)
  '2027-06-01', // Hari Lahir Pancasila
  '2027-06-06', // Tahun Baru Islam 1449 H (estimasi)
  '2027-08-17', // Hari Kemerdekaan Republik Indonesia
  '2027-09-14', // Maulid Nabi Muhammad SAW 1449 H (estimasi)
  '2027-12-25', // Hari Raya Natal
  '2027-12-26', // Cuti Bersama Natal
]);

/* ============================================================
   2. KONSTANTA HUKUM
   Semua satuan dalam HARI KERJA.
   ============================================================ */
const BATAS_JAWAB_PPID         = 10; // Hari kerja (Pasal 22 ayat 1 UU KIP)
const BATAS_PERPANJANG_PPID    = 7;  // Hari kerja (Pasal 22 ayat 2 UU KIP) — informasional
const BATAS_AJUKAN_KEBERATAN   = 30; // Hari kerja (Pasal 35 ayat 1 UU KIP)
const BATAS_JAWAB_ATASAN_PPID  = 30; // Hari kerja (Pasal 36 ayat 2 UU KIP)
const BATAS_AJUKAN_SENGKETA    = 14; // Hari kerja (Pasal 13 ayat 1 PERKI 1/2013)

/* ============================================================
   3. UTILITAS TANGGAL
   ============================================================ */

/**
 * Memformat objek Date ke string 'YYYY-MM-DD' untuk lookup di Set.
 * Menggunakan zona waktu lokal agar tidak bergeser saat midnight.
 */
function formatKunci(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Memformat Date ke format Indonesia: "5 Januari 2026"
 */
function formatTanggal(date) {
  const bulan = [
    'Januari','Februari','Maret','April','Mei','Juni',
    'Juli','Agustus','September','Oktober','November','Desember'
  ];
  return `${date.getDate()} ${bulan[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Mengonversi string 'YYYY-MM-DD' dari input[type=date] menjadi
 * objek Date pada awal hari (lokal), mencegah offset timezone.
 */
function parseInputDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/**
 * Memeriksa apakah suatu tanggal adalah hari akhir pekan.
 * Sabtu = 6, Minggu = 0.
 */
function adalahAkhirPekan(date) {
  const hari = date.getDay();
  return hari === 0 || hari === 6;
}

/**
 * Memeriksa apakah suatu tanggal adalah hari libur nasional
 * atau cuti bersama berdasarkan dataset statis HARI_LIBUR.
 */
function adalahLiburNasional(date) {
  return HARI_LIBUR.has(formatKunci(date));
}

/**
 * Memeriksa apakah suatu tanggal adalah HARI KERJA
 * (bukan akhir pekan DAN bukan hari libur nasional).
 */
function adalahHariKerja(date) {
  return !adalahAkhirPekan(date) && !adalahLiburNasional(date);
}

/**
 * Menambahkan sejumlah hari kerja ke suatu tanggal.
 * Penghitungan dimulai SETELAH tanggal awal (eksklusif).
 *
 * Contoh: tambahHariKerja(new Date('2026-05-01'), 1)
 *   → Jika 2026-05-04 (Senin) adalah hari kerja, hasilnya adalah 2026-05-04.
 *
 * @param {Date} tanggalAwal - Tanggal referensi.
 * @param {number} n - Jumlah hari kerja yang ditambahkan.
 * @returns {Date} Tanggal setelah n hari kerja.
 */
function tambahHariKerja(tanggalAwal, n) {
  const tgl = new Date(tanggalAwal);
  let hitungan = 0;
  while (hitungan < n) {
    tgl.setDate(tgl.getDate() + 1);
    if (adalahHariKerja(tgl)) {
      hitungan++;
    }
  }
  return tgl;
}

/**
 * Mencari hari kerja berikutnya setelah tanggal yang diberikan.
 * Jika tanggal itu sendiri adalah hari kerja, tetap mencari hari BERIKUTNYA.
 *
 * @param {Date} tanggal
 * @returns {Date}
 */
function hariKerjaBerikutnya(tanggal) {
  const tgl = new Date(tanggal);
  do {
    tgl.setDate(tgl.getDate() + 1);
  } while (!adalahHariKerja(tgl));
  return tgl;
}

/**
 * Menghitung jumlah hari kerja antara dua tanggal.
 * Eksklusif terhadap tanggalAwal, inklusif terhadap tanggalAkhir.
 * Jika tanggalAkhir <= tanggalAwal, hasilnya 0.
 *
 * @param {Date} tanggalAwal
 * @param {Date} tanggalAkhir
 * @returns {number}
 */
function hitungHariKerja(tanggalAwal, tanggalAkhir) {
  if (tanggalAkhir <= tanggalAwal) return 0;
  let hitungan = 0;
  const tgl = new Date(tanggalAwal);
  while (tgl < tanggalAkhir) {
    tgl.setDate(tgl.getDate() + 1);
    if (adalahHariKerja(tgl)) {
      hitungan++;
    }
  }
  return hitungan;
}

/* ============================================================
   4. LOGIKA PEMERIKSAAN HUKUM UTAMA
   ============================================================ */

/**
 * Fungsi utama untuk memeriksa tenggat waktu sengketa informasi.
 * Menerima data dari form dan mengembalikan objek hasil.
 *
 * Dua skenario utama:
 *   A) Tidak ada jawaban keberatan dari Atasan PPID
 *   B) Ada jawaban keberatan dari Atasan PPID
 *
 * @param {Object} data - Data tanggal dari form.
 * @returns {Object} - { status, penjelasan, timeline, dasarHukum, peringatanKeberatan }
 */
function periksaTenggat(data) {
  const {
    tglPermohonan,
    tglDiterimaTermohon,
    adaTanggapanPPID,       // boolean
    tglTanggapanPPID,       // Date | null
    tglKeberatan,
    adaJawabanKeberatan,    // boolean
    tglJawabanKeberatan,    // Date | null
    tglSengketa,
  } = data;

  // Array untuk menyusun timeline kronologis
  const timeline = [];

  // Array untuk menyusun dasar hukum yang relevan
  const dasarHukum = [];

  // Variabel hasil utama
  let status, penjelasan, awalWindow, akhirWindow, batasJawabAtasanPPID;

  // ----------------------------------------------------------
  // LANGKAH 1: Tambahkan titik awal ke timeline
  // ----------------------------------------------------------
  timeline.push({
    tanggal: tglDiterimaTermohon,
    label: 'Permohonan informasi diterima oleh PPID/Termohon',
    tipe: 'normal',
  });

  // ----------------------------------------------------------
  // LANGKAH 2: Hitung batas waktu PPID merespons (informatif)
  // Pasal 22 UU KIP: 10 hari kerja (+ opsi perpanjangan 7 HK)
  // ----------------------------------------------------------
  const batasJawabPPID = tambahHariKerja(tglDiterimaTermohon, BATAS_JAWAB_PPID);

  if (adaTanggapanPPID && tglTanggapanPPID) {
    timeline.push({
      tanggal: tglTanggapanPPID,
      label: `Tanggapan PPID diterima pemohon (dalam ${BATAS_JAWAB_PPID} hari kerja sejak permohonan diterima)`,
      tipe: 'normal',
    });
  } else {
    // PPID tidak merespons dalam batas waktu
    timeline.push({
      tanggal: batasJawabPPID,
      label: `Batas akhir PPID merespons (${BATAS_JAWAB_PPID} hari kerja) — tidak ada tanggapan`,
      tipe: 'batas',
    });
  }

  // ----------------------------------------------------------
  // LANGKAH 3: Periksa apakah keberatan masih dalam tenggat
  // Pasal 35 UU KIP: 30 hari kerja sejak alasan keberatan
  // Ini bersifat informatif (peringatan), tidak memblokir cek sengketa.
  // ----------------------------------------------------------
  let batasKeberatan;
  if (adaTanggapanPPID && tglTanggapanPPID) {
    // Jika ada tanggapan, 30 HK dihitung sejak tanggapan diterima
    batasKeberatan = tambahHariKerja(tglTanggapanPPID, BATAS_AJUKAN_KEBERATAN);
  } else {
    // Jika tidak ada tanggapan, 30 HK dihitung sejak berakhirnya batas jawab PPID
    batasKeberatan = tambahHariKerja(batasJawabPPID, BATAS_AJUKAN_KEBERATAN);
  }
  const keberatanTerlambat = tglKeberatan > batasKeberatan;

  // Tambahkan pengajuan keberatan ke timeline
  timeline.push({
    tanggal: tglKeberatan,
    label: 'Keberatan diajukan kepada Atasan PPID',
    tipe: 'normal',
  });

  // ----------------------------------------------------------
  // LANGKAH 4: Tentukan status berdasarkan skenario
  // ----------------------------------------------------------

  if (!adaJawabanKeberatan) {
    // ===========================================================
    // SKENARIO A: Tidak ada jawaban keberatan dari Atasan PPID
    // Acuan: Pasal 36 ayat (2) UU KIP + Pasal 13 PERKI 1/2013
    // ===========================================================

    // Hitung batas waktu Atasan PPID menjawab (30 HK sejak keberatan)
    batasJawabAtasanPPID = tambahHariKerja(tglKeberatan, BATAS_JAWAB_ATASAN_PPID);

    // Window pengajuan sengketa:
    //   - Mulai: hari kerja pertama setelah batas 30 HK Atasan PPID
    //   - Akhir: 14 hari kerja setelah batas 30 HK tersebut
    awalWindow = batasJawabAtasanPPID; // hari ke-30 = zona kuning (batas PPID)
    const hijauMulai = hariKerjaBerikutnya(batasJawabAtasanPPID); // hari ke-31 = zona hijau aman
    akhirWindow = tambahHariKerja(batasJawabAtasanPPID, BATAS_AJUKAN_SENGKETA);

    // Tambahkan ke timeline
    timeline.push({
      tanggal: batasJawabAtasanPPID,
      label: `Batas akhir Atasan PPID menjawab keberatan (${BATAS_JAWAB_ATASAN_PPID} hari kerja sejak keberatan) — tidak ada jawaban`,
      tipe: 'batas',
    });
    timeline.push({
      tanggal: awalWindow,
      label: `Awal jendela waktu: pemohon DAPAT mulai mengajukan sengketa`,
      tipe: 'window-start',
    });
    timeline.push({
      tanggal: akhirWindow,
      label: `Batas akhir pengajuan sengketa informasi (${BATAS_AJUKAN_SENGKETA} hari kerja sejak batas jawab Atasan PPID)`,
      tipe: 'window-end',
    });

    // --- Penentuan Status ---
    if (tglSengketa < batasJawabAtasanPPID) {
      // Diajukan sebelum 30 HK Atasan PPID berakhir → PREMATUR
      status = 'PREMATUR';
      const hkKurang = hitungHariKerja(tglSengketa, batasJawabAtasanPPID);
      penjelasan =
        `Permohonan sengketa informasi diajukan <strong>terlalu cepat (prematur)</strong>. ` +
        `Pemohon hanya dapat mengajukan sengketa setelah melewati batas waktu ${BATAS_JAWAB_ATASAN_PPID} hari kerja ` +
        `Atasan PPID untuk menjawab keberatan, yaitu mulai tanggal <strong>${formatTanggal(awalWindow)}</strong>. ` +
        `Permohonan Anda diajukan <strong>${hkKurang} hari kerja</strong> sebelum jendela waktu tersebut dibuka.`;

    } else if (tglSengketa > akhirWindow) {
      // Diajukan setelah 14 HK berakhir → KADALUWARSA
      status = 'KADALUWARSA';
      const hkLewat = hitungHariKerja(akhirWindow, tglSengketa);
      penjelasan =
        `Permohonan sengketa informasi diajukan <strong>melewati batas waktu</strong> 14 hari kerja ` +
        `sejak berakhirnya tenggat jawaban Atasan PPID. ` +
        `Batas akhir pengajuan adalah <strong>${formatTanggal(akhirWindow)}</strong>, ` +
        `sedangkan permohonan Anda diajukan <strong>${hkLewat} hari kerja</strong> setelah batas tersebut.`;

    } else {
      // Dalam jendela waktu → MEMENUHI SYARAT
      status = 'MEMENUHI SYARAT';
      const hkSisa = hitungHariKerja(tglSengketa, akhirWindow);
      penjelasan =
        `Permohonan sengketa informasi diajukan <strong>dalam jendela waktu yang ditetapkan</strong>, ` +
        `yaitu setelah berakhirnya batas 30 hari kerja Atasan PPID dan sebelum batas akhir 14 hari kerja. ` +
        (hkSisa > 0
          ? `Masih tersisa <strong>${hkSisa} hari kerja</strong> hingga batas akhir pengajuan.`
          : `Permohonan diajukan <strong>tepat pada hari terakhir</strong> batas waktu.`);
    }

    // Dasar hukum untuk Skenario A
    dasarHukum.push({
      pasal: `Pasal 36 ayat (2) UU No. 14 Tahun 2008 (UU KIP)`,
      isi: `Atasan PPID wajib memberikan tanggapan atas keberatan yang diajukan pemohon dalam jangka waktu 30 (tiga puluh) hari kerja sejak diterimanya pengajuan keberatan.`,
    });
    dasarHukum.push({
      pasal: `Pasal 13 ayat (1) PERKI No. 1 Tahun 2013`,
      isi: `Pemohon dapat mengajukan permohonan penyelesaian sengketa informasi kepada Komisi Informasi dalam jangka waktu paling lambat 14 (empat belas) hari kerja setelah lewatnya jangka waktu Atasan PPID untuk menjawab keberatan.`,
    });

  } else {
    // ===========================================================
    // SKENARIO B: Ada jawaban keberatan dari Atasan PPID
    // Acuan: Pasal 13 ayat (2) PERKI 1/2013
    // ===========================================================

    // 14 hari kerja dihitung sejak jawaban keberatan diterima pemohon
    akhirWindow = tambahHariKerja(tglJawabanKeberatan, BATAS_AJUKAN_SENGKETA);

    timeline.push({
      tanggal: tglJawabanKeberatan,
      label: 'Jawaban keberatan diterima pemohon dari Atasan PPID',
      tipe: 'normal',
    });
    timeline.push({
      tanggal: akhirWindow,
      label: `Batas akhir pengajuan sengketa (${BATAS_AJUKAN_SENGKETA} hari kerja sejak jawaban keberatan diterima)`,
      tipe: 'window-end',
    });

    // --- Penentuan Status ---
    if (tglSengketa > akhirWindow) {
      status = 'KADALUWARSA';
      const hkLewat = hitungHariKerja(akhirWindow, tglSengketa);
      penjelasan =
        `Permohonan sengketa informasi diajukan <strong>melewati batas waktu</strong> 14 hari kerja ` +
        `sejak diterimanya jawaban keberatan dari Atasan PPID. ` +
        `Batas akhir pengajuan adalah <strong>${formatTanggal(akhirWindow)}</strong>, ` +
        `sedangkan permohonan Anda diajukan <strong>${hkLewat} hari kerja</strong> setelah batas tersebut.`;
    } else {
      status = 'MEMENUHI SYARAT';
      const hkSisa = hitungHariKerja(tglSengketa, akhirWindow);
      penjelasan =
        `Permohonan sengketa informasi diajukan <strong>dalam tenggat waktu yang ditetapkan</strong>, ` +
        `yaitu dalam 14 hari kerja sejak diterimanya jawaban keberatan dari Atasan PPID. ` +
        (hkSisa > 0
          ? `Masih tersisa <strong>${hkSisa} hari kerja</strong> hingga batas akhir pengajuan.`
          : `Permohonan diajukan <strong>tepat pada hari terakhir</strong> batas waktu.`);
    }

    dasarHukum.push({
      pasal: `Pasal 13 ayat (2) PERKI No. 1 Tahun 2013`,
      isi: `Dalam hal Pemohon mendapat jawaban atas keberatannya, Pemohon dapat mengajukan permohonan penyelesaian sengketa informasi kepada Komisi Informasi paling lambat 14 (empat belas) hari kerja sejak diterimanya jawaban atas keberatan.`,
    });
  }

  // ----------------------------------------------------------
  // LANGKAH 5: Tambahkan titik sengketa ke timeline
  // ----------------------------------------------------------
  let tipeSengketa;
  if (status === 'MEMENUHI SYARAT') tipeSengketa = 'ok';
  else if (status === 'PREMATUR')    tipeSengketa = 'premature';
  else                               tipeSengketa = 'problem';

  timeline.push({
    tanggal: tglSengketa,
    label: 'Permohonan sengketa informasi diajukan ke Komisi Informasi',
    tipe: tipeSengketa,
    badge: status,
  });

  // ----------------------------------------------------------
  // LANGKAH 6: Tambahkan dasar hukum umum (berlaku di semua skenario)
  // ----------------------------------------------------------
  dasarHukum.unshift({
    pasal: `Pasal 35 ayat (1) UU No. 14 Tahun 2008 (UU KIP)`,
    isi: `Pemohon informasi publik dapat mengajukan keberatan kepada Atasan PPID dalam jangka waktu 30 (tiga puluh) hari kerja setelah ditemukannya alasan keberatan, antara lain karena permohonan informasi ditolak, tidak ditanggapi, atau tidak dipenuhi.`,
  });
  dasarHukum.unshift({
    pasal: `Pasal 22 ayat (1)–(7) UU No. 14 Tahun 2008 (UU KIP)`,
    isi: `PPID wajib merespons permohonan informasi paling lambat 10 (sepuluh) hari kerja sejak diterimanya permohonan, dengan kemungkinan perpanjangan 7 (tujuh) hari kerja dengan pemberitahuan tertulis kepada pemohon.`,
  });

  // ----------------------------------------------------------
  // LANGKAH 7: Urutkan timeline berdasarkan tanggal (asc)
  // ----------------------------------------------------------
  timeline.sort((a, b) => a.tanggal - b.tanggal);

  // ----------------------------------------------------------
  // LANGKAH 8: Siapkan peringatan jika keberatan terlambat
  // ----------------------------------------------------------
  const peringatanKeberatan = keberatanTerlambat
    ? {
        pesan:
          `⚠ Peringatan: Berdasarkan data yang diinput, keberatan tampak diajukan <strong>setelah batas waktu 30 hari kerja</strong> ` +
          `(batas: <strong>${formatTanggal(batasKeberatan)}</strong>). ` +
          `Hal ini dapat mempengaruhi kelayakan keseluruhan permohonan sengketa Anda. ` +
          `Harap klarifikasikan dengan petugas Komisi Informasi setempat.`,
      }
    : null;

  return {
    status,
    penjelasan,
    timeline,
    dasarHukum,
    awalWindow: awalWindow || null,
    akhirWindow,
    batasJawabAtasanPPID: batasJawabAtasanPPID || null,
    peringatanKeberatan,
  };
}

/* ============================================================
   5. FUNGSI RENDERING UI
   ============================================================ */

/**
 * Memetakan status ke ikon, kelas CSS, dan teks icon pada card.
 */
function petaStatus(status) {
  switch (status) {
    case 'MEMENUHI SYARAT':
      return { ikon: '✅', kelas: 'memenuhi-syarat' };
    case 'PREMATUR':
      return { ikon: '⏳', kelas: 'prematur' };
    case 'KADALUWARSA':
      return { ikon: '❌', kelas: 'kadaluwarsa' };
    default:
      return { ikon: '❓', kelas: '' };
  }
}

/**
 * Menentukan ikon kecil pada dot timeline berdasarkan tipe.
 */
function ikonDot(tipe) {
  const map = {
    normal:       '●',
    batas:        '⏱',
    'window-start': '▶',
    'window-end': '⏹',
    ok:           '✓',
    problem:      '✕',
    premature:    '⏳',
  };
  return map[tipe] || '●';
}

/**
 * Merender semua item timeline ke dalam kontainer HTML.
 *
 * @param {Array} items - Array item timeline dari periksaTenggat()
 * @param {string} statusAkhir - Status untuk menentukan badge pada item sengketa
 */
function renderTimeline(items, statusAkhir) {
  const container = document.getElementById('timelineContainer');
  container.innerHTML = '';

  items.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'timeline-item';
    div.setAttribute('role', 'listitem');

    // Tentukan badge jika item adalah titik sengketa
    let badgeHtml = '';
    if (item.badge) {
      let kelasB = item.badge === 'MEMENUHI SYARAT' ? 'ok'
                 : item.badge === 'PREMATUR'        ? 'warn'
                 :                                    'danger';
      badgeHtml = `<span class="timeline-badge ${kelasB}">${item.badge}</span>`;
    }

    div.innerHTML = `
      <div class="timeline-dot ${item.tipe}" aria-hidden="true">
        ${ikonDot(item.tipe)}
      </div>
      <div class="timeline-content">
        <div class="timeline-date">${formatTanggal(item.tanggal)}</div>
        <div class="timeline-label">${item.label}</div>
        ${badgeHtml}
      </div>
    `;
    container.appendChild(div);
  });
}

/**
 * Merender daftar dasar hukum ke dalam kontainer HTML.
 *
 * @param {Array} items - Array dasarHukum dari periksaTenggat()
 */
function renderDasarHukum(items) {
  const container = document.getElementById('legalList');
  container.innerHTML = '';

  items.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'legal-item';
    div.innerHTML = `
      <div class="legal-item-icon" aria-hidden="true">📜</div>
      <div>
        <div class="legal-pasal">${item.pasal}</div>
        <div class="legal-isi">${item.isi}</div>
      </div>
    `;
    container.appendChild(div);
  });
}

/**
 * Menampilkan hasil pemeriksaan ke UI.
 *
 * @param {Object} hasil - Hasil dari periksaTenggat()
 */
function tampilkanHasil(hasil, data) {
  const { status, penjelasan, timeline, dasarHukum, peringatanKeberatan } = hasil;
  const { ikon, kelas } = petaStatus(status);

  // Tampilkan section hasil, sembunyikan form section
  document.getElementById('formSection').style.display = 'none';
  const resultSection = document.getElementById('resultSection');
  resultSection.style.display = 'block';

  // Scroll halus ke section hasil
  resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // --- Status Card ---
  const statusCard = document.getElementById('statusCard');
  statusCard.className = `status-card ${kelas}`;
  document.getElementById('statusIcon').textContent = ikon;
  document.getElementById('statusValue').textContent = status;
  document.getElementById('statusPenjelasan').innerHTML = penjelasan;

  // --- Peringatan Keberatan ---
  const elPeringatan = document.getElementById('peringatanKeberatan');
  if (peringatanKeberatan) {
    elPeringatan.innerHTML = peringatanKeberatan.pesan;
    elPeringatan.style.display = 'flex';
  } else {
    elPeringatan.style.display = 'none';
  }

  // --- Timeline ---
  renderTimeline(timeline, status);

  // --- Dasar Hukum ---
  renderDasarHukum(dasarHukum);

  // --- Kalender ---
  renderKalender(data, hasil);
}

/* ============================================================
   6. VALIDASI FORM
   ============================================================ */

/**
 * Memvalidasi semua input form sebelum diproses.
 * Mengembalikan array string pesan kesalahan (kosong jika valid).
 *
 * @param {Object} nilai - Nilai mentah dari form
 * @returns {string[]}
 */
function validasiForm(nilai) {
  const kesalahan = [];

  if (!nilai.tglPermohonan) {
    kesalahan.push('Tanggal permohonan informasi diajukan wajib diisi.');
  }
  if (!nilai.tglDiterimaTermohon) {
    kesalahan.push('Tanggal diterima oleh PPID/Termohon wajib diisi.');
  }
  if (nilai.tglPermohonan && nilai.tglDiterimaTermohon) {
    const p = parseInputDate(nilai.tglPermohonan);
    const t = parseInputDate(nilai.tglDiterimaTermohon);
    if (t < p) {
      kesalahan.push('Tanggal diterima PPID tidak boleh lebih awal dari tanggal permohonan diajukan.');
    }
  }
  if (!nilai.adaTanggapanPPID) {
    kesalahan.push('Mohon pilih apakah PPID memberikan tanggapan atau tidak.');
  }
  if (nilai.adaTanggapanPPID === 'ya' && !nilai.tglTanggapanPPID) {
    kesalahan.push('Tanggal tanggapan PPID diterima pemohon wajib diisi jika ada tanggapan.');
  }
  if (nilai.adaTanggapanPPID === 'ya' && nilai.tglTanggapanPPID && nilai.tglDiterimaTermohon) {
    const t = parseInputDate(nilai.tglDiterimaTermohon);
    const r = parseInputDate(nilai.tglTanggapanPPID);
    if (r < t) {
      kesalahan.push('Tanggal tanggapan PPID tidak boleh lebih awal dari tanggal permohonan diterima PPID.');
    }
  }
  if (!nilai.tglKeberatan) {
    kesalahan.push('Tanggal pengajuan keberatan wajib diisi.');
  }
  if (!nilai.adaJawabanKeberatan) {
    kesalahan.push('Mohon pilih apakah Atasan PPID memberikan jawaban keberatan atau tidak.');
  }
  if (nilai.adaJawabanKeberatan === 'ya' && !nilai.tglJawabanKeberatan) {
    kesalahan.push('Tanggal jawaban keberatan diterima pemohon wajib diisi jika ada jawaban.');
  }
  if (nilai.adaJawabanKeberatan === 'ya' && nilai.tglJawabanKeberatan && nilai.tglKeberatan) {
    const k = parseInputDate(nilai.tglKeberatan);
    const j = parseInputDate(nilai.tglJawabanKeberatan);
    if (j < k) {
      kesalahan.push('Tanggal jawaban keberatan tidak boleh lebih awal dari tanggal keberatan diajukan.');
    }
  }
  if (!nilai.tglSengketa) {
    kesalahan.push('Tanggal pengajuan permohonan sengketa wajib diisi.');
  }
  if (nilai.tglSengketa && nilai.tglKeberatan) {
    const k = parseInputDate(nilai.tglKeberatan);
    const s = parseInputDate(nilai.tglSengketa);
    if (s < k) {
      kesalahan.push('Tanggal sengketa tidak boleh lebih awal dari tanggal keberatan diajukan.');
    }
  }

  return kesalahan;
}

/* ============================================================
   7. EVENT LISTENERS & INISIALISASI
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // --- Referensi Elemen DOM ---
  const form                = document.getElementById('checkForm');
  const rowTanggapanPPID    = document.getElementById('rowTanggapanPPID');
  const rowJawabanKeberatan = document.getElementById('rowJawabanKeberatan');
  const validasiErrorEl     = document.getElementById('validationError');
  const resultSection       = document.getElementById('resultSection');
  const formSection         = document.getElementById('formSection');
  const btnReset            = document.getElementById('btnReset');
  const btnKembali          = document.getElementById('btnKembali');
  const btnCetak            = document.getElementById('btnCetak');

  // ----------------------------------------------------------
  // A) Tampilkan/sembunyikan field kondisional
  // ----------------------------------------------------------

  /**
   * Toggle visibilitas field kondisional (tanggapan PPID).
   * Menambahkan atribut aria-hidden dan disabled sesuai kondisi.
   */
  document.querySelectorAll('input[name="adaTanggapanPPID"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      const tampil = this.value === 'ya';
      rowTanggapanPPID.classList.toggle('visible', tampil);
      rowTanggapanPPID.setAttribute('aria-hidden', String(!tampil));
      const inputTgl = document.getElementById('tglTanggapanPPID');
      inputTgl.disabled = !tampil;
      if (!tampil) inputTgl.value = '';
    });
  });

  /**
   * Toggle visibilitas field kondisional (jawaban keberatan).
   */
  document.querySelectorAll('input[name="adaJawabanKeberatan"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      const tampil = this.value === 'ya';
      rowJawabanKeberatan.classList.toggle('visible', tampil);
      rowJawabanKeberatan.setAttribute('aria-hidden', String(!tampil));
      const inputTgl = document.getElementById('tglJawabanKeberatan');
      inputTgl.disabled = !tampil;
      if (!tampil) inputTgl.value = '';
    });
  });

  // Inisialisasi: nonaktifkan field kondisional di awal
  document.getElementById('tglTanggapanPPID').disabled = true;
  document.getElementById('tglJawabanKeberatan').disabled = true;

  // ----------------------------------------------------------
  // B) Submit Form
  // ----------------------------------------------------------
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Kumpulkan nilai dari form
    const nilai = {
      tglPermohonan:      form.tglPermohonan.value,
      tglDiterimaTermohon: form.tglDiterimaTermohon.value,
      adaTanggapanPPID:   form.adaTanggapanPPID
                            ? [...form.querySelectorAll('input[name="adaTanggapanPPID"]')]
                                .find(r => r.checked)?.value || ''
                            : '',
      tglTanggapanPPID:   form.tglTanggapanPPID.value,
      tglKeberatan:       form.tglKeberatan.value,
      adaJawabanKeberatan: [...form.querySelectorAll('input[name="adaJawabanKeberatan"]')]
                            .find(r => r.checked)?.value || '',
      tglJawabanKeberatan: form.tglJawabanKeberatan.value,
      tglSengketa:        form.tglSengketa.value,
    };

    // Validasi
    const kesalahan = validasiForm(nilai);

    if (kesalahan.length > 0) {
      validasiErrorEl.innerHTML =
        `<strong>Mohon perbaiki kesalahan berikut:</strong>` +
        `<ul>${kesalahan.map(k => `<li>${k}</li>`).join('')}</ul>`;
      validasiErrorEl.style.display = 'block';
      validasiErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Hapus pesan error jika valid
    validasiErrorEl.style.display = 'none';
    validasiErrorEl.innerHTML = '';

    // Konversi string ke objek Date
    const data = {
      tglPermohonan:       parseInputDate(nilai.tglPermohonan),
      tglDiterimaTermohon: parseInputDate(nilai.tglDiterimaTermohon),
      adaTanggapanPPID:    nilai.adaTanggapanPPID === 'ya',
      tglTanggapanPPID:    nilai.tglTanggapanPPID ? parseInputDate(nilai.tglTanggapanPPID) : null,
      tglKeberatan:        parseInputDate(nilai.tglKeberatan),
      adaJawabanKeberatan: nilai.adaJawabanKeberatan === 'ya',
      tglJawabanKeberatan: nilai.tglJawabanKeberatan ? parseInputDate(nilai.tglJawabanKeberatan) : null,
      tglSengketa:         parseInputDate(nilai.tglSengketa),
    };

    // Jalankan pemeriksaan dan tampilkan hasil
    try {
      const hasil = periksaTenggat(data);
      tampilkanHasil(hasil, data);
    } catch (err) {
      console.error('Kesalahan saat memeriksa tenggat:', err);
      validasiErrorEl.innerHTML =
        `<strong>Terjadi kesalahan teknis.</strong> Mohon periksa kembali data yang diinput. ` +
        `<br>Detail: ${err.message}`;
      validasiErrorEl.style.display = 'block';
    }
  });

  // ----------------------------------------------------------
  // C) Tombol Reset Form
  // ----------------------------------------------------------
  btnReset.addEventListener('click', function () {
    form.reset();
    validasiErrorEl.style.display = 'none';
    validasiErrorEl.innerHTML = '';

    // Sembunyikan kembali field kondisional
    rowTanggapanPPID.classList.remove('visible');
    rowTanggapanPPID.setAttribute('aria-hidden', 'true');
    rowJawabanKeberatan.classList.remove('visible');
    rowJawabanKeberatan.setAttribute('aria-hidden', 'true');
    document.getElementById('tglTanggapanPPID').disabled = true;
    document.getElementById('tglJawabanKeberatan').disabled = true;
  });

  // ----------------------------------------------------------
  // D) Tombol Kembali (dari hasil ke form)
  // ----------------------------------------------------------
  btnKembali.addEventListener('click', function () {
    resultSection.style.display = 'none';
    formSection.style.display = 'block';
    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // ----------------------------------------------------------
  // E) Tombol Cetak / Simpan PDF
  // ----------------------------------------------------------
  btnCetak.addEventListener('click', function () {
    window.print();
  });

});
/* ============================================================
   AKHIR script.js
   ============================================================ */

/* ============================================================
   FITUR KALENDER HARI KERJA
   Menampilkan kalender mini untuk setiap bulan yang dilalui
   dalam perhitungan, dengan kode warna:
     🔴 Merah  = libur nasional / cuti bersama / kadaluwarsa
     ⬜ Abu    = akhir pekan
     🟡 Kuning = hari ke-30 (batas Atasan PPID — zona hati-hati)
     🟢 Hijau  = hari ke-31 hingga akhir window (zona aman)
   ============================================================ */

const NAMA_BULAN_KAL = [
  'Januari','Februari','Maret','April','Mei','Juni',
  'Juli','Agustus','September','Oktober','November','Desember'
];

const NAMA_HARI_KAL = ['Sen','Sel','Rab','Kam','Jum','Sab','Min'];

/**
 * Menentukan daftar bulan yang perlu ditampilkan kalender.
 * Rentang: dari bulan tglKeberatan hingga bulan tglSengketa/akhirWindow.
 */
function hitungBulanTerlibat(data, hasil) {
  const tglMulai = new Date(data.tglKeberatan.getFullYear(), data.tglKeberatan.getMonth(), 1);

  let tglAkhirRef = hasil.akhirWindow || data.tglSengketa;
  if (data.tglSengketa > tglAkhirRef) tglAkhirRef = data.tglSengketa;
  const tglSelesai = new Date(tglAkhirRef.getFullYear(), tglAkhirRef.getMonth(), 1);

  const list = [];
  const cur = new Date(tglMulai);
  while (cur <= tglSelesai) {
    list.push({ tahun: cur.getFullYear(), bulan: cur.getMonth() });
    cur.setMonth(cur.getMonth() + 1);
  }
  return list;
}

/**
 * Menentukan kelas warna dan tooltip untuk setiap tanggal di kalender.
 */
function getStatusTanggal(date, data, hasil) {
  const dayOfWeek = date.getDay();
  const dk = formatKunci(date);
  let kelas = '';
  let tooltip = '';
  let marker = '';

  // Tandai tanggal-tanggal penting dari timeline
  if (dk === formatKunci(data.tglDiterimaTermohon)) {
    marker = '●'; tooltip = 'Permohonan diterima PPID';
  }
  if (dk === formatKunci(data.tglKeberatan)) {
    marker = '●'; tooltip = (tooltip ? tooltip + ' · ' : '') + 'Keberatan diajukan';
  }
  if (hasil.batasJawabAtasanPPID && dk === formatKunci(hasil.batasJawabAtasanPPID)) {
    tooltip = 'Hari ke-30: Batas Atasan PPID — Zona Kuning';
  }
  if (hasil.akhirWindow && dk === formatKunci(hasil.akhirWindow)) {
    tooltip = (tooltip ? tooltip + ' · ' : '') + 'Batas akhir pengajuan sengketa';
  }
  if (dk === formatKunci(data.tglSengketa)) {
    marker = '★'; tooltip = (tooltip ? tooltip + ' · ' : '') + 'Sengketa diajukan';
  }

  // Akhir pekan
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return { kelas: 'cal-weekend', tooltip: tooltip || 'Akhir pekan', marker };
  }

  // Hari libur nasional / cuti bersama
  if (adalahLiburNasional(date)) {
    return { kelas: 'cal-libur', tooltip: tooltip || 'Libur nasional / cuti bersama', marker };
  }

  // Zona PREMATUR: hari kerja dari hari ke-1 s/d ke-29
  // (setelah tanggal keberatan, sebelum hari ke-30)
  if (hasil.batasJawabAtasanPPID && data.tglKeberatan) {
    const hariAwalPrematur = new Date(data.tglKeberatan);
    hariAwalPrematur.setDate(hariAwalPrematur.getDate() + 1);
    if (date >= hariAwalPrematur && date < hasil.batasJawabAtasanPPID) {
      return { kelas: 'cal-merah-prematur', tooltip: tooltip || 'Zona prematur — belum dapat ajukan sengketa', marker };
    }
  }

  // Hari ke-30 → KUNING (zona batas)
  if (hasil.batasJawabAtasanPPID && dk === formatKunci(hasil.batasJawabAtasanPPID)) {
    return { kelas: 'cal-kuning', tooltip, marker };
  }

  // Hari ke-31 s/d ke-44 → HIJAU (zona aman)
  if (hasil.batasJawabAtasanPPID && hasil.akhirWindow) {
    const hijauMulai = hariKerjaBerikutnya(hasil.batasJawabAtasanPPID);
    if (date >= hijauMulai && date <= hasil.akhirWindow) {
      return { kelas: 'cal-hijau', tooltip: tooltip || 'Zona aman — dapat ajukan sengketa', marker };
    }
  }

  // Setelah kadaluwarsa → MERAH
  if (hasil.akhirWindow && date > hasil.akhirWindow) {
    return { kelas: 'cal-merah-lewat', tooltip: tooltip || 'Kadaluwarsa', marker };
  }

  // Hari kerja biasa
  return { kelas: '', tooltip, marker };
}

/**
 * Membuat HTML untuk satu kalender bulan.
 */
function buatKalenderBulan(tahun, bulan, data, hasil) {
  const firstDay   = new Date(tahun, bulan, 1);
  const totalDays  = new Date(tahun, bulan + 1, 0).getDate();
  // Kolom mulai: Senin = 0 … Minggu = 6
  const startCol   = (firstDay.getDay() + 6) % 7;

  let html = `<div class="mini-calendar">
    <div class="cal-header">${NAMA_BULAN_KAL[bulan]} ${tahun}</div>
    <div class="cal-grid">`;

  // Header nama hari
  NAMA_HARI_KAL.forEach((h, i) => {
    html += `<span class="cal-wh${i >= 5 ? ' cal-wh-we' : ''}">${h}</span>`;
  });

  // Sel kosong sebelum hari pertama
  for (let i = 0; i < startCol; i++) {
    html += `<span class="cal-day cal-empty"></span>`;
  }

  // Isi hari
  for (let d = 1; d <= totalDays; d++) {
    const date = new Date(tahun, bulan, d);
    const { kelas, tooltip, marker } = getStatusTanggal(date, data, hasil);
    html += `<span class="cal-day${kelas ? ' ' + kelas : ''}"${tooltip ? ` title="${tooltip}"` : ''}>
      ${d}${marker ? `<i class="cal-dot">${marker}</i>` : ''}
    </span>`;
  }

  html += `</div></div>`;
  return html;
}

/**
 * Fungsi utama: render semua kalender yang relevan ke DOM.
 */
function renderKalender(data, hasil) {
  const section   = document.getElementById('kalenderSection');
  const container = document.getElementById('kalenderContainer');
  if (!section || !container) return;

  const bulanList = hitungBulanTerlibat(data, hasil);
  container.innerHTML = bulanList
    .map(({ tahun, bulan }) => buatKalenderBulan(tahun, bulan, data, hasil))
    .join('');

  section.style.display = 'block';
}

/* ============================================================
   PWA INSTALL PROMPT
   Android: pakai beforeinstallprompt event
   iOS: deteksi Safari + belum standalone → tampilkan hint
   ============================================================ */
(function() {
  let deferredPrompt = null;
  const DISMISS_KEY = 'pwa_install_dismissed';

  // Jangan tampilkan kalau sudah pernah dismiss
  const dismissed = sessionStorage.getItem(DISMISS_KEY);

  /* ── ANDROID / CHROME ── */
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();   // simpan event, jangan tampilkan prompt native
    deferredPrompt = e;
    if (dismissed) return;
    // Tampilkan banner custom setelah 1.5 detik (beri waktu splash selesai)
    setTimeout(() => {
      const banner = document.getElementById('installBanner');
      if (banner) banner.style.display = 'flex';
    }, 1500);
  });

  window.addEventListener('appinstalled', () => {
    const banner = document.getElementById('installBanner');
    if (banner) banner.style.display = 'none';
    deferredPrompt = null;
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Tombol Install (Android)
    const btnInstall = document.getElementById('btnInstall');
    if (btnInstall) {
      btnInstall.addEventListener('click', async () => {
        const banner = document.getElementById('installBanner');
        if (banner) banner.style.display = 'none';
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        deferredPrompt = null;
      });
    }

    // Tombol Dismiss (Android)
    const btnDismiss = document.getElementById('btnDismiss');
    if (btnDismiss) {
      btnDismiss.addEventListener('click', () => {
        const banner = document.getElementById('installBanner');
        if (banner) banner.style.display = 'none';
        sessionStorage.setItem(DISMISS_KEY, '1');
      });
    }

    /* ── iOS Safari ── */
    const isIos    = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isSafari = /safari/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
                      || window.navigator.standalone === true;

    if (isIos && isSafari && !isStandalone && !dismissed) {
      const iosBanner = document.getElementById('iosBanner');
      if (iosBanner) {
        setTimeout(() => { iosBanner.style.display = 'flex'; }, 1500);
      }
    }

    const btnIosDismiss = document.getElementById('btnIosDismiss');
    if (btnIosDismiss) {
      btnIosDismiss.addEventListener('click', () => {
        const iosBanner = document.getElementById('iosBanner');
        if (iosBanner) iosBanner.style.display = 'none';
        sessionStorage.setItem(DISMISS_KEY, '1');
      });
    }
  });
})();

/* ============================================================
   CATATAN DINAMIS — Real-time hints per tahap
   Muncul langsung saat tanggal diisi, berkembang seiring
   pengguna mengisi field berikutnya.
   ============================================================ */

const BATAS_PPID_MERESPONS   = 10;  // HK
const BATAS_KEBERATAN        = 30;  // HK (Pasal 36 ayat (2) UU KIP)
const BATAS_SENGKETA_HK      = 14;  // HK (Pasal 13 PERKI 1/2013)

/** Buat satu baris catatan */
function buatItem(tipe, icon, labelText, tanggal) {
  const tglHtml = tanggal
    ? `<span class="tgl-value">${formatTanggal(tanggal)}</span>`
    : '';
  return `<div class="catatan-item tipe-${tipe}">
    <span class="catatan-icon">${icon}</span>
    <span class="catatan-text">${labelText}${tglHtml}</span>
  </div>`;
}

/** Render catatan ke container */
function renderCatatan(idContainer, items) {
  const el = document.getElementById(idContainer);
  if (!el) return;
  if (!items.length) { el.style.display = 'none'; el.innerHTML = ''; return; }
  el.innerHTML = `
    <div class="catatan-header">💡 Catatan Otomatis</div>
    <div class="catatan-list">${items.join('')}</div>`;
  el.style.display = 'block';
}

/* ── UPDATE CATATAN BLOK A (Tahap 1 — Permohonan ke PPID) ── */
function updateCatatanA() {
  const valDiterima   = document.getElementById('tglDiterimaTermohon')?.value;
  const adaTanggapan  = document.querySelector('input[name="adaTanggapanPPID"]:checked')?.value;
  const valTanggapan  = document.getElementById('tglTanggapanPPID')?.value;

  const items = [];

  if (!valDiterima) { renderCatatan('catatanBlokA', []); return; }

  const tglDiterima = parseInputDate(valDiterima);
  const batasPPID   = tambahHariKerja(tglDiterima, BATAS_PPID_MERESPONS);

  // ① Selalu muncul begitu tanggal PPID diisi
  items.push(buatItem('info', '📅',
    'Batas PPID merespons paling lambat:', batasPPID));

  if (adaTanggapan === 'tidak') {
    // Tidak ada tanggapan → keberatan bisa diajukan setelah batas PPID
    const awalKeberatan = hariKerjaBerikutnya(batasPPID);
    items.push(buatItem('ok', '✅',
      'Keberatan dapat diajukan mulai:', awalKeberatan));
    items.push(buatItem('info', 'ℹ',
      'Pengajuan keberatan ditujukan kepada <strong>Atasan PPID</strong> badan publik yang bersangkutan.', null));

  } else if (adaTanggapan === 'ya') {
    items.push(buatItem('ok', '✅',
      'PPID telah merespons — silakan ajukan keberatan kepada <strong>Atasan PPID</strong>.', null));

    if (valTanggapan) {
      const tglTanggapan  = parseInputDate(valTanggapan);
      const batasKeberatan = tambahHariKerja(tglTanggapan, BATAS_KEBERATAN);
      items.push(buatItem('warn', '⏰',
        'Batas akhir pengajuan keberatan (30 HK):', batasKeberatan));
    } else {
      items.push(buatItem('warn', '⏰',
        'Isi tanggal tanggapan PPID untuk melihat batas akhir keberatan.', null));
    }
  }

  renderCatatan('catatanBlokA', items);
}

/* ── UPDATE CATATAN BLOK B (Tahap 2 — Keberatan ke Atasan PPID) ── */
function updateCatatanB() {
  const valKeberatan  = document.getElementById('tglKeberatan')?.value;
  const adaJawaban    = document.querySelector('input[name="adaJawabanKeberatan"]:checked')?.value;
  const valJawaban    = document.getElementById('tglJawabanKeberatan')?.value;

  const items = [];

  if (!valKeberatan) { renderCatatan('catatanBlokB', []); return; }

  const tglKeberatan    = parseInputDate(valKeberatan);
  const batasAtasanPPID = tambahHariKerja(tglKeberatan, BATAS_KEBERATAN);

  // ① Selalu muncul begitu tanggal keberatan diisi
  items.push(buatItem('info', '📅',
    'Batas Atasan PPID menjawab (30 HK):', batasAtasanPPID));

  if (adaJawaban === 'tidak') {
    // Tidak ada jawaban → window sengketa dihitung dari hari ke-30
    const hijauMulai  = hariKerjaBerikutnya(batasAtasanPPID);  // hari ke-31 = zona hijau
    const akhirWindow = tambahHariKerja(batasAtasanPPID, BATAS_SENGKETA_HK);

    items.push(buatItem('warn', '🟡',
      'Zona hati-hati (hari ke-30) — bisa diajukan tapi berisiko:', batasAtasanPPID));
    items.push(buatItem('ok', '🟢',
      'Zona aman — sengketa dapat diajukan mulai:', hijauMulai));
    items.push(buatItem('danger', '⏰',
      'Batas akhir pengajuan sengketa (hari ke-44):', akhirWindow));

  } else if (adaJawaban === 'ya') {
    items.push(buatItem('ok', '✅',
      'Atasan PPID telah menjawab — silakan ajukan sengketa ke Komisi Informasi.', null));

    if (valJawaban) {
      const tglJawaban   = parseInputDate(valJawaban);
      const awalSengketa = hariKerjaBerikutnya(tglJawaban);
      const akhirSengketa = tambahHariKerja(tglJawaban, BATAS_SENGKETA_HK);

      items.push(buatItem('ok', '🟢',
        'Sengketa dapat diajukan mulai:', awalSengketa));
      items.push(buatItem('danger', '⏰',
        'Batas akhir pengajuan sengketa (14 HK):', akhirSengketa));
    } else {
      items.push(buatItem('warn', '⏰',
        'Isi tanggal jawaban keberatan untuk melihat batas pengajuan sengketa.', null));
    }
  }

  renderCatatan('catatanBlokB', items);
}

/* ── PASANG EVENT LISTENERS ── */
document.addEventListener('DOMContentLoaded', () => {
  // Tahap 1
  ['tglDiterimaTermohon', 'tglTanggapanPPID'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', updateCatatanA);
    document.getElementById(id)?.addEventListener('input', updateCatatanA);
  });
  document.querySelectorAll('input[name="adaTanggapanPPID"]').forEach(el =>
    el.addEventListener('change', updateCatatanA)
  );

  // Tahap 2
  ['tglKeberatan', 'tglJawabanKeberatan'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', updateCatatanB);
    document.getElementById(id)?.addEventListener('input', updateCatatanB);
  });
  document.querySelectorAll('input[name="adaJawabanKeberatan"]').forEach(el =>
    el.addEventListener('change', updateCatatanB)
  );
});
