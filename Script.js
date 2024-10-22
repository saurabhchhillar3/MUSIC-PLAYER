const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const playPauseIcon = document.getElementById('play-pause-icon');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('current-time');
const totalDuration = document.getElementById('total-duration');
const shuffleBtn = document.getElementById('shuffle');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const loopBtn = document.getElementById('loop');
const coverImg = document.getElementById('cover-img');
const trackName = document.getElementById('track-name');
const trackArtist = document.getElementById('track-artist');

let isPlaying = false;
let isShuffle = false;
let isLoop = false;
let currentTrackIndex = 0;

// Playlist data (for each song, the associated .webp image is used)
const tracks = [
    { src: 'Badnam.mp3', title: 'Badnam', artist: 'Punjabi Track', cover: 'Badnam.webp' },
    { src: 'Bapu Zimidar.mp3', title: 'Bapu Zimidar', artist: 'Punjabi Track', cover: 'Bapu Zimidar.webp' },
    { src: 'Gaal Ni Kadni.mp3', title: 'Gaal Ni Kadni', artist: 'Punjabi Track', cover: 'Gaal Ni Kadni.webp' },
    { src: 'Lamberghini.mp3', title: 'Lamberghini', artist: 'Punjabi Track', cover: 'Lamberghini.webp' },
    { src: 'Palazzo.mp3', title: 'Palazzo', artist: 'Punjabi Track', cover: 'Palazzo.webp' }
];

function loadTrack(track) {
    audioPlayer.src = track.src;
    trackName.innerText = track.title;
    trackArtist.innerText = track.artist;
    coverImg.src = track.cover;
}

function playTrack() {
    audioPlayer.play();
    isPlaying = true;
    playPauseIcon.classList.remove('fa-play');
    playPauseIcon.classList.add('fa-pause');
}

function pauseTrack() {
    audioPlayer.pause();
    isPlaying = false;
    playPauseIcon.classList.remove('fa-pause');
    playPauseIcon.classList.add('fa-play');
}

function updateProgress() {
    const current = Math.floor(audioPlayer.currentTime);
    const total = Math.floor(audioPlayer.duration);
    progress.value = (current / total) * 100;
    currentTime.innerText = formatTime(current);
    totalDuration.innerText = formatTime(total);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
});

audioPlayer.addEventListener('timeupdate', updateProgress);

progress.addEventListener('input', () => {
    const newTime = (audioPlayer.duration / 100) * progress.value;
    audioPlayer.currentTime = newTime;
});

nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(tracks[currentTrackIndex]);
    playTrack();
});

prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(tracks[currentTrackIndex]);
    playTrack();
});

loopBtn.addEventListener('click', () => {
    isLoop = !isLoop;
    audioPlayer.loop = isLoop;
    loopBtn.classList.toggle('active');
});

shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active');
    if (isShuffle) {
        currentTrackIndex = Math.floor(Math.random() * tracks.length);
    }
    loadTrack(tracks[currentTrackIndex]);
    playTrack();
});
