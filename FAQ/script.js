const btns = document.querySelectorAll('.faq button');

console.log(btns);

btns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        btn.parentNode.classList.toggle('active');
    })
})