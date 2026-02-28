var audioContext = null;

function playEndSound() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    playTone(740, 0, 0.18, 'triangle');
    playTone(988, 0.22, 0.22, 'triangle');
}

function playTone(frequency, startDelay, duration, type) {
    var oscillator = audioContext.createOscillator();
    var gainNode = audioContext.createGain();
    var startTime = audioContext.currentTime + startDelay;
    var endTime = startTime + duration;

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);

    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.22, startTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, endTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(endTime);
}
