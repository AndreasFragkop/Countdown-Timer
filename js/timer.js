// Shared timer state for the running countdown.
var timerInterval;
var isRunning = false;
var isPaused = false;
var initialDuration = 0;
var timeLeft = 0;

// Start a new countdown or resume an already paused one.
function startTimer() {
    if (isPaused) {
        resumeTimer();
        return;
    }

    var seconds = getTotalSecondsFromInputs();

    if (Number.isNaN(seconds) || seconds <= 0) {
        alert('Please enter a positive number.');
        return;
    }

    clearInterval(timerInterval);
    initialDuration = seconds;
    timeLeft = seconds;
    isRunning = true;
    isPaused = false;
    timerCard.classList.remove('completed');
    display.classList.remove('finished');
    clearMessage();
    updateDisplay(timeLeft);
    updateProgress();
    updateControls();

    timerInterval = setInterval(tickTimer, 1000);
}

// Advance the timer by one second and complete it at zero.
function tickTimer() {
    timeLeft = timeLeft - 1;
    updateDisplay(timeLeft);
    updateProgress();

    if (timeLeft <= 0) {
        completeTimer();
    }
}

// Pause a running timer, or resume if the button is pressed again while paused.
function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        isPaused = true;
        message.textContent = 'Timer paused';
        updateControls();
        return;
    }

    if (isPaused) {
        resumeTimer();
    }
}

// Resume the countdown without resetting its remaining time.
function resumeTimer() {
    if (!isPaused || timeLeft <= 0) {
        return;
    }

    isRunning = true;
    isPaused = false;
    clearMessage();
    updateControls();
    timerInterval = setInterval(tickTimer, 1000);
}

// Stop the active interval and restore the last configured duration.
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isPaused = false;
    timeLeft = initialDuration;
    display.classList.remove('finished');
    timerCard.classList.remove('completed');
    clearMessage();
    updateDisplay(timeLeft);
    updateProgress();
    updateControls();
}

// Finalize the timer state and trigger the completion feedback.
function completeTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isPaused = false;
    timeLeft = 0;
    display.classList.add('finished');
    timerCard.classList.add('completed');
    message.textContent = 'Time is up';
    updateDisplay(timeLeft);
    updateProgress();
    updateControls();
    playEndSound();
}

// Apply one of the preset durations to the timer.
function applyDuration(seconds) {
    if (seconds <= 0) {
        return;
    }

    clearInterval(timerInterval);
    isRunning = false;
    isPaused = false;
    initialDuration = seconds;
    timeLeft = seconds;
    setInputsFromDuration(seconds);
    display.classList.remove('finished');
    timerCard.classList.remove('completed');
    clearMessage();
    updateDisplay(timeLeft);
    updateProgress();
    updateControls();
}

// Mirror manual input changes into the internal timer state when idle.
function syncDurationFromInputs() {
    var nextValue = getTotalSecondsFromInputs();

    if (!isRunning && nextValue > 0) {
        initialDuration = nextValue;
        timeLeft = nextValue;
        updateDisplay(timeLeft);
        updateProgress();
        clearMessage();
    }
}

// Convert hours, minutes, and seconds fields into one total-second value.
function getTotalSecondsFromInputs() {
    var hours = parseInt(hoursInput.value, 10) || 0;
    var minutes = parseInt(minutesInput.value, 10) || 0;
    var seconds = parseInt(secondsInput.value, 10) || 0;

    minutes = Math.min(Math.max(minutes, 0), 59);
    seconds = Math.min(Math.max(seconds, 0), 59);

    return (hours * 3600) + (minutes * 60) + seconds;
}
