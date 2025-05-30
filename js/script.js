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

let currentSectionId = 'about-section';
let isAnimating = false;

function showSection(targetId) {
    if (targetId === currentSectionId || isAnimating) return; // ignore if animating or same section

    isAnimating = true; // lock animations

    const oldSection = document.getElementById(currentSectionId);
    const newSection = document.getElementById(targetId);

    // Prepare new section for fade-in
    newSection.classList.remove('hidden', 'opacity-0', '-translate-x-5', 'pointer-events-none');
    newSection.classList.add('opacity-0', '-translate-x-5', 'pointer-events-none');

    // Force reflow
    newSection.offsetHeight;

    // Animate new section in
    newSection.classList.remove('opacity-0', '-translate-x-5', 'pointer-events-none');
    newSection.classList.add('opacity-100', 'translate-x-0');

    // Animate old section out
    oldSection.classList.remove('opacity-100', 'translate-x-0');
    oldSection.classList.add('opacity-0', '-translate-x-5', 'pointer-events-none');

    // Update active state on navbar buttons
    const navButtons = document.querySelectorAll('nav button');
    navButtons.forEach(btn => {
        const btnTarget = btn.dataset.section;
        if (btnTarget === targetId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // After animation ends, hide old section and unlock
    setTimeout(() => {
        oldSection.classList.add('hidden');
        currentSectionId = targetId;
        isAnimating = false; // unlock
    }, 500); // match your CSS duration
}
