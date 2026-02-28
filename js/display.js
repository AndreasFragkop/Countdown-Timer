function updateDisplay(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;

    if (hours < 10) hours = String(hours);
    if (minutes < 10) minutes = '0' + minutes;
    if (remainingSeconds < 10) remainingSeconds = '0' + remainingSeconds;

    display.textContent = hours + ':' + minutes + ':' + remainingSeconds;
}

function updateProgress() {
    var progress = initialDuration > 0 ? ((initialDuration - timeLeft) / initialDuration) * 100 : 0;
    progressFill.style.width = Math.max(0, Math.min(100, progress)) + '%';
}

function updateControls() {
    startBtn.disabled = isRunning;
    pauseBtn.disabled = !isRunning && !isPaused;
    resetBtn.disabled = isRunning && timeLeft === initialDuration;
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
    pauseBtn.classList.toggle('is-paused', isPaused);
}

function clearMessage() {
    message.textContent = '';
}

function setInputsFromDuration(totalSeconds) {
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    hoursInput.value = hours === 0 ? '' : hours;
    minutesInput.value = minutes === 0 ? '' : minutes;
    secondsInput.value = seconds === 0 ? '' : seconds;
}
