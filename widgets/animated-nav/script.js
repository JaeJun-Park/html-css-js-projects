const button = document.querySelector('.nav button');

button.addEventListener('click', () => {
    button.parentElement.classList.toggle('active');
})