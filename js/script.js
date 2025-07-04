﻿document.addEventListener("DOMContentLoaded", function () {
    // Open popup
    document.querySelectorAll('[data-popup]').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-popup');
            const popupContainer = document.getElementById('popup-container');
            const targetPopup = document.getElementById(targetId);

            // Show backdrop
            popupContainer.classList.remove('hidden');
            setTimeout(() => {
                popupContainer.classList.add('bg-opacity-50');
            }, 10);

            // Show popup content with animation
            targetPopup.classList.remove('hidden');
            requestAnimationFrame(() => {
                targetPopup.classList.remove('opacity-0', 'scale-95');
                targetPopup.classList.add('opacity-100', 'scale-100');
            });

            document.body.classList.add('overflow-hidden');
        });
    });

// Close popup
    document.querySelectorAll('[data-close]').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const popupContainer = document.getElementById('popup-container');

            // Fade out backdrop
            popupContainer.classList.remove('bg-opacity-50');

            // Animate and hide popup(s)
            popupContainer.querySelectorAll('[id^="popup-"]').forEach(popup => {
                popup.classList.add('opacity-0', 'scale-95');
                popup.classList.remove('opacity-100', 'scale-100');

                // Hide completely after transition
                setTimeout(() => {
                    popup.classList.add('hidden');
                }, 300);
            });

            // Hide the container after the animation
            setTimeout(() => {
                popupContainer.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }, 300);
        });
    });

    const lines = ["Game Developer", "3D Artist", "Programmer", "Game Designer", "Jack of all Trades"];
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
            isAnimating = false;

            const masonryGrid = newSection.querySelector('#masonry-grid');
            if (masonryGrid && masonryGrid.masonryInstance) {
                // Small extra delay before layout
                setTimeout(() => {
                    masonryGrid.masonryInstance.layout();
                }, 50); // 50–100ms usually works well
            }
        }, 500);
    }
    const slides = document.querySelectorAll('#slider > div');
    const buttons = document.querySelectorAll('#navButtons > button');
    const slider = document.getElementById('slider');

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoplayTimeout;
    let isPaused = false;

// Scroll to a specific slide
    function scrollToSlide(index) {
        const slideWidth = slider.clientWidth;
        slider.scrollTo({
            left: index * slideWidth,
            behavior: 'smooth'
        });

        // Pause autoplay for 10 seconds
        pauseAutoplay();
    }

// Pause autoplay and resume after 10s
    function pauseAutoplay() {
        isPaused = true;
        clearTimeout(autoplayTimeout);

        // Resume autoplay after 10 seconds
        setTimeout(() => {
            isPaused = false;
            scheduleAutoplay();
        }, 8000);
    }

// Autoplay loop (runs every 5 seconds unless paused)
    function scheduleAutoplay() {
        if (isPaused) return;
        autoplayTimeout = setTimeout(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            scrollToSlide(currentIndex);
            scheduleAutoplay();
        }, 5000);
    }

// Start autoplay
    scheduleAutoplay();

// Intersection Observer for syncing button highlight
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = parseInt(entry.target.dataset.index);
                currentIndex = index;
                buttons.forEach((btn, i) => {
                    btn.classList.toggle('activefeedback', i === index);
                });
            }
        });
    }, {
        root: slider,
        threshold: 0.6
    });

// Observe each slide
    slides.forEach(slide => observer.observe(slide));
    window.showSection = showSection;
    window.scrollToSlide = scrollToSlide;
});

const video = document.getElementById('backgroundVideo');
const button = document.getElementById('toggleVideo');

button.addEventListener('click', () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
});

