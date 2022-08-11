const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); // NodeList
const count = document.getElementById('count');
const total = document.getElementById('total');
const moiveSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +moiveSelect.value;
// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Get data from LocalStorage and populate UI;
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }
    let selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        moiveSelect.selectedIndex = selectedMovieIndex;
    } else {
        setMovieData(moiveSelect.selectedIndex, moiveSelect.value);
    }

}

// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    count.innerText = selectedSeats.length;
    total.innerText = selectedSeats.length * ticketPrice;
}

// Movie select event
moiveSelect.addEventListener('change', (event) => {
    ticketPrice = +moiveSelect.value;
    setMovieData(event.target.selectedIndex, event.target.value);
    updateSelectedCount();
})


// Seat click event
container.addEventListener('click', (event) => {
    if (event.target.classList.contains('seat') &&
        !event.target.classList.contains('occupied')) {
        event.target.classList.toggle('selected');

        updateSelectedCount();
    }
})

// Initial count event and total set 
updateSelectedCount();