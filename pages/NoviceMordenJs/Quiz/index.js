const correctAnswers = ['B', 'B', 'B', 'B'];
const form = document.querySelector('.quiz-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let score = 0;
    const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value];

    console.log(userAnswers);

    userAnswers.forEach((answer, index) => {
        if (correctAnswers[index] == answer) {
            score += 25;
        }
    })

    updateScore(score);

    // automatically scroll up the window
    scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
})


function updateScore(score) {
    const result = document.querySelector('.result');
    result.classList.remove('d-none');

    if (score == 0) {
        result.querySelector('span').innerText = `${score}%`;
        return;
    } else {
        console.log(score);
    }

    let result_delay = 1000;
    let cur_score = 0;
    const id = window.setInterval(() => {
        result.querySelector('span').innerText = `${cur_score++}%`;
        if (cur_score - 1 == score) {
            clearInterval(id);
        }
    }, 20); //result_delay / score
}
