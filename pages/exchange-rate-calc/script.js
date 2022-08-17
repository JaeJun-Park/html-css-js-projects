const currencyOne_El = document.getElementById('currency-one');
const currencyTwo_El = document.getElementById('currency-two');
const amountOne_El = document.getElementById('amount-one');
const amountTwo_El = document.getElementById('amount-two');
const swap_El = document.getElementById('swap');
const rate_El = document.getElementById('rate');

function calculate() {
    const currencyOne = currencyOne_El.value;
    const currencyTwo = currencyTwo_El.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[currencyTwo];
            amountTwo_El.value = (amountOne_El.value * rate).toFixed(2);
            rate_El.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
        });

    localStorage.setItem('currencyOne', currencyOne);
    localStorage.setItem('currencyTwo', currencyTwo);
    localStorage.setItem('amountOne', amountOne_El.value);
    localStorage.setItem('amountTwo', amountTwo_El.value);
}

function swapCurrency() {
    const temp = currencyOne_El.value;
    currencyOne_El.value = currencyTwo_El.value;
    currencyTwo_El.value = temp;
    calculate();
}


// Event Listeners
currencyOne_El.addEventListener('change', calculate);
currencyTwo_El.addEventListener('change', calculate);
amountOne_El.addEventListener('input', calculate);
amountOne_El.addEventListener('input', calculate);
swap_El.addEventListener('click', swapCurrency);

calculate();