function ledON() {
    console.log ("sending a message to turn on the LED");
}

function ledOFF() {
    console.log ("sending a message to turn off the LED");
}


let amt, startColor, newColor;
var isWhite = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  

  black = color(0,0,0)
  white = color(255,255,255);
  startColor = color(255,255,255);
  newColor = color(0,0,0);
  amt = 0;

  background(startColor);
   
}

function draw() {
  background(lerpColor(startColor, newColor, amt));
  textAlign(CENTER);
  text('There is no black-and-white situation.', windowWidth/2, 100);
  amt += 0.006;
  if(amt >= 1){
    amt = 0.0;
    startColor = newColor;
    if (isWhite) {
        newColor = black;
        textColor = white;
        fill(255);
        isWhite = false;
    } else {
        newColor = white;
        textColor = black;
        fill(0);
        isWhite = true;
    }
  }
}


// let img;
// let offset = 0;
// let easing = 0.05;

// function setup() {
//   createCanvas(720, 400);
//   img = loadImage('.jpg'); // Load an image into the program
// }

// function draw() {
//   image(img, 0, 0); // Display at full opacity
//   fill(0,0,0);
//   console.log(mouseX);

// }