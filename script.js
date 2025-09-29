// Test script Andreas
// This is a simple countdown timer script
// by Andreas Fragkopoulos

var timerinterval;
var isRunning = false;

function startTimer() {

    var seconds = document.getElementById('secondsInput').value;

    if (seconds <= 0 || seconds === '') {
        alert('please enter a positive number!');
        return;
    }

    if (isRunning) {
        stopTimer();
    }

    isRunning = true;
    var timeleft = parseInt(seconds);

    updateDisplay(timeleft);

    timerinterval = setInterval(function() {
        timeleft = timeleft - 1;
        updateDisplay(timeleft);

        if (timeleft <= 0) {
            stopTimer();
            showFinished();
        }

    }, 1000);
}

// Stop the timer

function stopTimer() {

    clearInterval(timerinterval);
    isRunning = false;

    document.getElementById('message').innerHTML = '';
    document.getElementById('display').classList.remove('finished');
}

// Update the display

function updateDisplay(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;

    if (minutes < 10) minutes = '0' + minutes;
    if (remainingSeconds < 10) remainingSeconds = '0' + remainingSeconds;

    document.getElementById('display').innerHTML = minutes + ':' + remainingSeconds;
}

function showFinished() {
    document.getElementById('message').innerHTML = '🎉 Time\'s Up! 🎉';
    document.getElementById('display').classList.add('finished');

    // alert('Time is up!');
}