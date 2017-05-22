var running = 0;
var time = 0;
var startButton = document.getElementById('start');
var output = document.getElementById('output');

var intervalId = null;

function start() {
  if (intervalId !== null) {
      pause();
  }
    intervalId = setInterval(increment, 1000);
}

function pause() {
    clearInterval(intervalId);
}

function reset() {
    pause();
    time = 0;
    output.innerText = '00 : 00 : 00';
}

function increment() {
    time++;
    var mins = Math.floor((time / 60) % 60);
    var secs = Math.floor(time % 60);
    var hours = Math.floor(time / 60 / 60); 

  if (mins < 10) {
    mins = '0' + mins;
  }
  if (secs < 10) {
    secs = '0' + secs;
  }
  if (hours < 10) {
    hours = '0' + hours;
  }

  output.innerHTML = hours + ' : ' + mins + ' : ' + secs;
} 
