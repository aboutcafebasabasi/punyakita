// === UTILITAS: Smooth Scroll ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// === UTILITAS: Scroll To Section ===
function scrollToSection(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// === PLAYLIST MUSIK CINTA ===
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');

const playlist = [
  'asset/music/suratcinta.mp3',
  'asset/music/nempek.mp3'
];
let currentTrackIndex = 0;
let isPlaying = false;

// Fungsi putar lagu berdasarkan indeks
function playTrack(index) {
  if (!bgMusic || index < 0 || index >= playlist.length) return;

  bgMusic.src = playlist[index];
  bgMusic.load(); // Pastikan sumber dimuat ulang
  bgMusic.play()
    .then(() => {
      isPlaying = true;
      updateMusicButton();
    })
    .catch(err => {
      console.warn("Gagal memutar audio:", err);
      isPlaying = false;
      updateMusicButton();
    });
}

// Saat lagu selesai → lanjut atau ulang
if (bgMusic) {
  bgMusic.addEventListener('ended', () => {
    if (currentTrackIndex < playlist.length - 1) {
      // Lanjut ke lagu berikutnya
      currentTrackIndex++;
      playTrack(currentTrackIndex);
    } else {
      // Opsional: ULANG dari awal (lebih romantis!)
      currentTrackIndex = 0;
      playTrack(currentTrackIndex);
    }
  });
}

// Update ikon tombol
function updateMusicButton() {
  if (!musicToggle) return;
  musicToggle.innerHTML = isPlaying 
    ? '<i class="fas fa-pause"></i>' 
    : '<i class="fas fa-music"></i>';
}

// Toggle play/pause
if (musicToggle) {
  musicToggle.addEventListener('click', () => {
    if (!bgMusic) return;

    if (isPlaying) {
      bgMusic.pause();
      isPlaying = false;
    } else {
      // Jika belum pernah main, mulai dari lagu pertama
      if (!bgMusic.src || bgMusic.src === window.location.href) {
        currentTrackIndex = 0;
      }
      playTrack(currentTrackIndex);
    }
    updateMusicButton();
  });
}

// === FORM: Surat Cinta ===
const loveForm = document.getElementById('loveForm');
if (loveForm) {
  loveForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Suratmu telah dikirim ke hatiku — dan akan kusimpan selamanya. 💖');
    loveForm.reset();
  });
}

// === FORM: Ganti Video ===
const videoForm = document.getElementById('videoForm');
const videoUrlInput = document.getElementById('videoUrl');
const loveVideo = document.getElementById('loveVideo');

if (videoForm && loveVideo) {
  videoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = videoUrlInput?.value.trim();
    if (!url) {
      alert('Masukkan URL video terlebih dahulu!');
      return;
    }
    if (url.includes('.mp4')) {
      loveVideo.innerHTML = `<source src="${url}" type="video/mp4">`;
      loveVideo.load();
      loveVideo.play().catch(() => {});
    } else {
      alert('Saat ini hanya mendukung file .mp4 (misal: asset/video/cintaku.mp4)');
    }
  });
}

// === ANIMASI: Bintang & Hati ===
function createStars() {
  const starsContainer = document.getElementById('stars');
  if (!starsContainer) return;
  for (let i = 0; i < 120; i++) {
    const star = document.createElement('div');
    Object.assign(star.style, {
      position: 'absolute',
      width: `${Math.random() * 2 + 1}px`,
      height: 'auto',
      backgroundColor: 'white',
      borderRadius: '50%',
      opacity: `${Math.random() * 0.7 + 0.3}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animation: `twinkle ${Math.random() * 4 + 2}s infinite`
    });
    starsContainer.appendChild(star);
  }
}

function createFloatingHearts() {
  const container = document.getElementById('floating-hearts');
  if (!container) return;
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.innerHTML = '❤️';
      Object.assign(heart.style, {
        position: 'absolute',
        fontSize: `${Math.random() * 14 + 10}px`,
        color: 'rgba(255, 158, 194, 0.7)',
        left: `${Math.random() * 100}%`,
        top: '100vh',
        pointerEvents: 'none',
        zIndex: '1',
        animation: `floatHeart ${Math.random() * 8 + 8}s linear forwards`
      });
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 16000);
    }, i * 1200);
  }
}

// === INJEKSI ANIMASI CSS ===
(function injectAnimations() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes twinkle {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 1; }
    }
    @keyframes floatHeart {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0.7;
      }
      100% {
        transform: translateY(-100vh) rotate(${(Math.random() - 0.5) * 360}deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
})();

// === LOADING SCREEN ===
function hideLoader() {
  const loader = document.getElementById('romanticLoader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 1500);
  }
}

// === INISIALISASI ===
window.addEventListener('load', () => {
  hideLoader();
  createStars();
  createFloatingHearts();
  setInterval(createFloatingHearts, 10000);
});

// === Daftar lagu & judulnya ===
const trackTitles = [
  'suraticnta',
  'nempek'
];
// Ambil elemen penampil judul
const nowPlayingEl = document.getElementById('nowPlaying');

// Fungsi update tampilan judul
function updateNowPlaying() {
  if (!nowPlayingEl) return;
  
  if (isPlaying && currentTrackIndex < trackTitles.length) {
    nowPlayingEl.textContent = `🎵 Sedang diputar: ${trackTitles[currentTrackIndex]}`;
    nowPlayingEl.classList.remove('empty');
  } else {
    nowPlayingEl.textContent = '';
    nowPlayingEl.classList.add('empty');
  }
}

// Fungsi putar lagu
function playTrack(index) {
  if (!bgMusic || index < 0 || index >= playlist.length) return;

  bgMusic.src = playlist[index];
  bgMusic.load();
  bgMusic.play()
    .then(() => {
      currentTrackIndex = index;
      isPlaying = true;
      updateMusicButton();
      updateNowPlaying(); // 🔥 Tampilkan judul
    })
    .catch(err => {
      console.warn("Gagal memutar audio:", err);
      isPlaying = false;
      updateMusicButton();
      updateNowPlaying();
    });
}

// Saat lagu selesai
if (bgMusic) {
  bgMusic.addEventListener('ended', () => {
    if (currentTrackIndex < playlist.length - 1) {
      playTrack(currentTrackIndex + 1);
    } else {
      // Ulang dari awal
      playTrack(0);
    }
  });
}