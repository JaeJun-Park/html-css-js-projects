// for .music-container.play
const musicContainer = document.getElementById('music-container');
// buttons
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
// audio and progress bar
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
// title and cover;
const title = document.getElementById('title');
const cover = document.getElementById('cover');
// song titles
const songs = ['hey', 'summer', 'ukulele'];

let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex])

function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong()
}

function prevSong() {
    songIndex = songsIndex - 1 < 0 ? songs.length - 1 : songIndex - 1;
    loadSong(songs[songIndex]);
    playSong()
}

function updateProgress(e) {
    const { duration, currentTime } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const duration = audio.duration;
    const width = this.clientWidth;
    const clientX = e.offsetX;
    audio.currentTime = (clientX / width) * duration;
    updateProgress(e);
}

// EventListeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
audio.addEventListener('timeupdate', updateProgress);
//click on progress bar
progressContainer.addEventListener('click', setProgress);
// song ends
audio.addEventListener('ended', nextSong);