setInputsFromDuration(initialDuration);
bindEvents();
updateDisplay(timeLeft);
updateProgress();
updateControls();

function bindEvents() {
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);

    presetButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var seconds = parseInt(button.dataset.seconds, 10);
            applyDuration(seconds);
        });
    });

    hoursInput.addEventListener('input', syncDurationFromInputs);
    minutesInput.addEventListener('input', syncDurationFromInputs);
    secondsInput.addEventListener('input', syncDurationFromInputs);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            startTimer();
        } else if (event.code === 'Space') {
            event.preventDefault();
            if (isRunning) {
                pauseTimer();
            } else if (isPaused) {
                resumeTimer();
            }
        } else if (event.key === 'Escape') {
            resetTimer();
        }
    });
}
