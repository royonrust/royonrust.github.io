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

const content = document.getElementById("page-content");
const sections = document.getElementById("sections");

document.querySelectorAll("a[data-section]").forEach(link => {
    link.addEventListener("click", async (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("data-section");
        const newSection = sections.querySelector(`#${targetId}-section`);

        if (!newSection) return;

        // Fade out current content
        content.classList.add("opacity-0");

        // Wait for fade-out transition
        await new Promise(r => setTimeout(r, 300));

        // Replace content
        content.innerHTML = newSection.innerHTML;

        // Fade in new content
        content.classList.remove("opacity-0");
    });
});