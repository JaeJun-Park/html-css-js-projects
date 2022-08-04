const soundDOMs = document.getElementsByTagName('audio');
const soundDOMArray = Array.from(soundDOMs)
const soundNames = soundDOMArray.map(sound => sound.id);

soundNames.forEach((soundName, index) => {
    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.innerText = soundName;
    btn.addEventListener('click', () => {
        stopSongs();
        soundDOMArray[index].play();
    })

    document.getElementById('buttons').appendChild(btn);
})

const body = document.querySelector('body');
body.addEventListener('click', (e) => {
    if (!e.target.classList.contains('btn')) {
        stopSongs();
        console.log('outside of boxes');
    } else {
        console.log('you clicked button')
    }
})

function stopSongs() {
    soundDOMArray.forEach(soundDOM => {
        soundDOM.pause();
        soundDOM.currentTime = 0;
    });
}