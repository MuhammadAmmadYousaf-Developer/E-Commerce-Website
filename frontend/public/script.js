// script.js
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let currentIndex = 0;

    const autoShuffleInterval = 5000; // Adjust the interval in milliseconds (e.g., 5000 for 5 seconds)

    slider.addEventListener('mousedown', startDragging);
    slider.addEventListener('touchstart', startDragging);
    slider.addEventListener('mouseup', endDragging);
    slider.addEventListener('touchend', endDragging);
    slider.addEventListener('mousemove', drag);
    slider.addEventListener('touchmove', drag);

    // Start auto-shuffle on page load
    startAutoShuffle();

    function startDragging(e) {
        stopAutoShuffle();

        if (e.type === 'touchstart') {
            startPos = e.touches[0].clientX;
        } else {
            startPos = e.clientX;
        }

        isDragging = true;

        animationID = requestAnimationFrame(animation);
        slider.style.transition = 'none';
    }

    function endDragging() {
        isDragging = false;
        cancelAnimationFrame(animationID);

        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && currentIndex < 2) {
            currentIndex += 1;
        }

        if (movedBy > 100 && currentIndex > 0) {
            currentIndex -= 1;
        }

        setPositionByIndex();
        slider.style.transition = 'transform 0.5s ease-in-out';

        // Resume auto-shuffle after manual interaction
        startAutoShuffle();
    }

    function drag(e) {
        if (isDragging) {
            const currentPosition = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
        currentTranslate = currentIndex * -100;
        prevTranslate = currentTranslate;
        setSliderPosition();
    }

    function startAutoShuffle() {
        autoShuffleIntervalID = setInterval(() => {
            if (!isDragging) {
                currentIndex = (currentIndex + 1) % 3; // Assuming 3 slides, update accordingly
                setPositionByIndex();
            }
        }, autoShuffleInterval);
    }

    function stopAutoShuffle() {
        clearInterval(autoShuffleIntervalID);
    }
});
