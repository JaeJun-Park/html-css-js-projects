const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

function toggleVideoPlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
function toggleVideoIcon() {
    console.log('siii bal?')
    if (video.paused) {
        play.innerHTML = `<i class="fa fa-play fa-2x"></i>`
    } else {
        play.innerHTML = `<i class="fa fa-pause fa-2x"/></i>`
    }
}
function updateProgressbar() {
    progress.value = (video.currentTime / video.duration) * 100;
    // Get minutes
    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }
    // Get seconds
    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }
    timestamp.innerText = `${mins}:${secs}`;
    return true;
}

function setVideoProgress() {
    video.currentTime = (+progress.value / 100) * video.duration;
    return true;
}
function stopVideo() {
    video.currentTime = 0;
    video.pause();
    return true;
}
video.addEventListener('click', toggleVideoPlay);
video.addEventListener('play', toggleVideoIcon);
video.addEventListener('pause', toggleVideoIcon);
video.addEventListener('timeupdate', updateProgressbar);

play.addEventListener('click', toggleVideoPlay);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);