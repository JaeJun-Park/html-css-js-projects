const settings = document.getElementById('settings')
const settingsBtn = document.getElementById('settings-btn')
const settingsForm = document.getElementById('settings-form')
const difficultySelect = document.getElementById('difficulty')
const word = document.getElementById('word')
const text = document.getElementById('text')
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')
const endgameEl = document.getElementById('end-game-container')
const loading = document.getElementById('loader')

let randomWord;
// init score
let score = 0;
// init time
let time = 10;
let addedTime = 5;
let difficulty = localStorage.getItem('difficulty') ?? 'medium';

difficultySelect.value = difficulty;

text.focus()

let timeInterval = setInterval(updateTime, 1000)

async function getRandomWord() {
    const resp = await fetch('https://random-word-api.herokuapp.com/word')
    const data = await resp.json()
    const randomWord = data[0]
    return randomWord
}

async function addNewRandomWordToDOM() {
    loading.classList.add('show')
    clearInterval(timeInterval)
    randomWord = await getRandomWord()
    word.innerText = randomWord
    loading.classList.remove('show')
    timeInterval = setInterval(updateTime, 1000)
}

function updateScore() {
    score += 10
    scoreEl.innerText = score
}

function updateTime() {
    time--
    timeEl.innerText = `${time}s`

    if (time <= 0) {
        clearInterval(timeInterval)
        gameOver()
    }
}

// Game over, show end screen
function gameOver() {
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick='window.location.reload()'>Reload</button>
    `;

    endgameEl.style.display = 'flex';
}

addNewRandomWordToDOM()

text.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        if (e.target.value == randomWord) {
            addNewRandomWordToDOM()
            updateScore()

            //clear
            word.innerText = ''
            text.value = ''
            time += addedTime;
            updateTime();
        } else {
            console.log('false')
        }
    }
})

settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
})

difficultySelect.addEventListener('change', (e) => {
    difficulty = e.target.value;
    console.log(difficulty)
    switch (difficulty) {
        case 'easy': addedTime = 7;
        case 'medium': addedTime = 5;
        case 'hard': addedTime = 3;
    }

    localStorage.setItem('difficulty', difficulty);
})