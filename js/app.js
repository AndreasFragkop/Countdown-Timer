// Initialize the UI from the default timer state.
setInputsFromDuration(initialDuration);
bindEvents();
updateDisplay(timeLeft);
updateProgress();
updateControls();

// Wire all UI events once after the page has loaded.
function bindEvents() {
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);

    // Presets bypass manual typing and directly load a known duration.
    presetButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var seconds = parseInt(button.dataset.seconds, 10);
            applyDuration(seconds);
        });
    });

    // Keep the timer state synced while the user edits the inputs.
    hoursInput.addEventListener('input', syncDurationFromInputs);
    minutesInput.addEventListener('input', syncDurationFromInputs);
    secondsInput.addEventListener('input', syncDurationFromInputs);

    // Keyboard shortcuts make the timer easier to control quickly.
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
