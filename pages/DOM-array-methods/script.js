const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = []; // put all of the ppl [name, money]

// fetch random user and add random money
async function getRandomUser() {
    const resp = await fetch('https://randomuser.me/api');
    const data = await resp.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 10000000 + 1000),
    }
    addData(newUser);
}

// add new obj to data arr
function addData(obj) {
    data.push(obj);
    updateDOM();
}

function updateDOM(providedData = data) {
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `
        <strong>${item.name}</strong>${formatter.format(item.money)}`
        main.appendChild(element);
    })
}
function doubleMoney() {
    data = data.map((user) => {
        user.money *= 2;
        return { ...user };
    })

    updateDOM();
}

function sortUser() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}
function showMillionaires() {
    let millionaires = data.filter(user => user.money >= 1000000);
    updateDOM(millionaires);
}
function calculateWealth() {
    let totalWealth = data.reduce((total, user) => total + user.money, 0);
    const element = document.createElement('h3');
    element.classList.add('person');
    element.innerHTML = `
    <strong>Total Wealth:</strong> ${totalWealth}`;
    main.appendChild(element);
}

// format number as money
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})




// Event Listeners 
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortUser);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);

getRandomUser();
getRandomUser();
getRandomUser();

