const panels = document.querySelectorAll('.panel');

let activePanel = null;
panels.forEach((panel) => {
    panel.addEventListener('click', (e) => {
        deactiveAllPanels();
        panel.classList.add('active');
    })
})

function deactiveAllPanels() {
    panels.forEach((panel) => {
        panel.classList.remove('active');
    })
}