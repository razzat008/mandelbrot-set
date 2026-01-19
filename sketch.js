let mandelbrot;

let centreX, centreY;
let sideLength;
let sideLengthRatio;

function preload() {
  mandelbrot = loadShader('fractal.vert', 'fractal.frag');
}

function setup() {
  createCanvas(800, 600, WEBGL);

  // default view region
  centreX = -0.7;
  centreY = 0;

  sideLength = 3.0;
  sideLengthRatio = width / height;
  shader(mandelbrot);
}

function draw() {
  // recalculate new region on mouse drag
  drag();

  // passing the uniforms to the shader
  mandelbrot.setUniform("minx", centreX - (sideLength / 2) * sideLengthRatio);
  mandelbrot.setUniform("maxx", centreX + (sideLength / 2) * sideLengthRatio);
  mandelbrot.setUniform("miny", centreY - (sideLength / 2));
  mandelbrot.setUniform("maxy", centreY + (sideLength / 2));

  // surface to drawon
  rect(-width / 2, -height / 2, width, height);
}

function drag() {
  if (mouseIsPressed) {
    let dx = (pmouseX - mouseX) / width * sideLength * sideLengthRatio;
    let dy = (pmouseY - mouseY) / height * sideLength;

    centreX += dx;
    centreY += dy;
  }
}

function mouseWheel(event) {
  if (event.delta < 0) {
    sideLength *= 10 / 11;
  } else {
    sideLength *= 11 / 10;
  }

  sideLength = constrain(sideLength, 0, 3);

}
