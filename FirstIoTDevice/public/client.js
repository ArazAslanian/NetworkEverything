/* 
This is the websocket library which will allow us to send messages
back to the web server 
*/
var socket = io();
var messageonScreen = 'There is no black-and-white situation.';
var counter = 0;

socket.on('event', (data) => {
	console.log('received data from webserver: ' + data);
});

socket.on('buttonPressed', (data) => {
	console.log('received loud noise alert ' + data);
	// document.body.style.backgroundColor = "red";
	messageonScreen = 'You are being too loud, please calm down!!';
	counter++;


});

socket.on('buttonReleased', (data) => {
	console.log('received alert that it is not loud anymore ' + data);
	// document.body.style.backgroundColor = "blue";
	if (counter == 0) {
		messageonScreen = 'There is no black-and-white situation.';
    } else {
		messageonScreen = 'Good job, keep  your arguing healthy';

    }

});

function redLEDOn() {
  socket.emit('redLEDOn'); 
}

function redLEDOff() {
  socket.emit('redLEDOff');
}

function greenLEDOn() {
  socket.emit('greenLEDOn'); 
}

function greenLEDOff() {
  socket.emit('greenLEDOff');
}

function blueLEDOn() {
  socket.emit('blueLEDOn'); 
}

function blueLEDOff() {
  socket.emit('blueLEDOff');
}

let amt, startColor, newColor;
var isWhite = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  

  startColorText = color(0,0,0)
  newColorText = color(255,255,255);
  startColor = color(255,255,255);
  newColor = color(0,0,0);
  white = color(255,255,255);
  black = color(0,0,0);
  amt = 0;

  background(startColor);
   
}

function draw() {
  background(lerpColor(startColor, newColor, amt));
  fill(lerpColor(startColorText,newColorText,amt));
  textAlign(CENTER);
  textSize(70);
  text(messageonScreen, windowWidth/2, windowHeight/2);
  amt += 0.002;
  if(amt >= 1){
    amt = 0.0;
    startColor = newColor;
    startColorText = newColorText;
    if (isWhite) {
        newColor = black;
        newColorText = white;
        fill(255);
        isWhite = false;
    } else {
        newColor = white;
        newColorText = black;
        fill(0);
        isWhite = true;
    }
  }
}
