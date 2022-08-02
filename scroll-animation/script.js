const boxes = document.querySelectorAll(".box");

const triggerPoint = window.innerHeight * (4 / 5);

function checkBoxes() {
    console.log('check box !!')
    boxes.forEach((box) => {
        const boxTop = box.getBoundingClientRect().top;
        if (boxTop < triggerPoint) {
            box.classList.add("show");
        } else {
            box.classList.remove("show");
        }
    });
}

window.addEventListener("scroll", checkBoxes);
