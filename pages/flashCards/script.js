const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keep track of current card
let currentActiveCard = 0;
// Store DOM cards;
const cardsEl = [];
// Store card data;
const cardsData = getCardsData();
// const cardsData = [
//     {
//         question: 'What must a variable begin with?',
//         answer: 'A letter, $ or _',
//     },
//     {
//         question: 'What is a variable?',
//         answer: 'Container for piece of data',
//     },
//     {
//         question: 'Example of Case Sensitive Variable?',
//         answer: 'thisIsAVariable',
//     },
// ];

function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

function createCards() {
    cardsData.forEach((data, index) => createCard(data, index))
}

function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    if (index == 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
        <div class='inner-card'>
            <div class='inner-card-front'>
                <p>
                    ${data.question}
                </p>
            </div>
            <div class='inner-card-back'>
                <p>
                    ${data.answer}
                </p>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        card.classList.toggle('show-answer');
    })

    // Add to DOM cards
    cardsEl.push(card);
    cardsContainer.appendChild(card);

    updateCurrentText();
}

function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

createCards();



// Event Listeners
nextBtn.addEventListener('click', () => {
    if (currentActiveCard + 1 > cardsEl.length - 1) {
        return;
    }
    cardsEl[currentActiveCard].className = 'card left';
    currentActiveCard += 1;
    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentText();
})
prevBtn.addEventListener('click', () => {
    if (currentActiveCard - 1 < 0) {
        return;
    }
    cardsEl[currentActiveCard].className = 'card right';
    currentActiveCard -= 1;
    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentText();
})
showBtn.addEventListener('click', () => {
    console.log('show');
    addContainer.classList.add('show');
})