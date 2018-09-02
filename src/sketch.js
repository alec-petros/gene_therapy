function randomInt(scale) {
  return Math.floor(Math.random() * scale) - scale / 2;
}

var initV;
var boy;
var circleArr = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  initV = createVector(randomInt(5), randomInt(5))
  boy = new Ellipse(50, 50, initV)
  for (let i = 0; i < 30; i++) {
    circleArr.push(new Ellipse(randomInt(100), randomInt(100), createVector(randomInt(5), randomInt(5))))
  }
}

function draw() {
  background(255);
  circleArr.forEach((circ) => {
    circ.draw();
  })
}
