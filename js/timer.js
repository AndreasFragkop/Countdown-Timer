var timerInterval;
var isRunning = false;
var isPaused = false;
var initialDuration = 0;
var timeLeft = 0;

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

function tickTimer() {
    timeLeft = timeLeft - 1;
    updateDisplay(timeLeft);
    updateProgress();

    if (timeLeft <= 0) {
        completeTimer();
    }
}

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

function getTotalSecondsFromInputs() {
    var hours = parseInt(hoursInput.value, 10) || 0;
    var minutes = parseInt(minutesInput.value, 10) || 0;
    var seconds = parseInt(secondsInput.value, 10) || 0;

    minutes = Math.min(Math.max(minutes, 0), 59);
    seconds = Math.min(Math.max(seconds, 0), 59);

    return (hours * 3600) + (minutes * 60) + seconds;
}
