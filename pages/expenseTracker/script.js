const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form'); // why needed
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//     { id: 1, text: 'Flower', amount: -20 },
//     { id: 2, text: 'Salary', amount: 300 },
//     { id: 3, text: 'Book', amount: -10 },
//     { id: 4, text: 'Camera', amount: 150 },
// ];
let transactions = JSON.parse(localStorage.getItem('transactions')) ?? [];

// add transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: Number(amount.value),
        };
        console.log(transaction);
        transactions.push(transaction);

        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value = '';
    }

}

function generateID() {
    return Math.floor(Math.random() * 10000000000);
}

// add transactions to DOM list 
function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    // add class based on value;
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `
    list.appendChild(item);
}

// update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((a, b) => a + b, 0);
    const sign = total < 0 ? '-' : '';
    const income = amounts.reduce((a, b) => b > 0 ? a + b : a, 0);
    const expense = amounts.reduce((a, b) => b < 0 ? a + b : a, 0);

    balance.innerText = `${sign}$${Math.abs(total).toFixed(2)}`;
    money_plus.innerText = `+$${income.toFixed(2)}`;
    money_minus.innerText = `-$${expense.toFixed(2).slice(1)}`;
}

// remove transaction by id
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

// update local storage transaction
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app 
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();


// EventListners

form.addEventListener('submit', addTransaction);