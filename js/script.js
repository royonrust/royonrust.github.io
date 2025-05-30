const lines = ["Game Developer", "3D Artist", "Programmer", "Game Designer", "Generalist"];
let index = 0;

const textEl = document.getElementById("rotating-text");

setInterval(() => {
    index = (index + 1) % lines.length;
    textEl.classList.add("opacity-0");

    setTimeout(() => {
        textEl.textContent = lines[index];
        textEl.classList.remove("opacity-0");
    }, 400);//Duration
}, 3000);