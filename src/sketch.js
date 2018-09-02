function randomInt(scale) {
  return Math.floor(Math.random() * scale) - scale / 2;
}

var initV;
var boy;
var spaceVerb

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  initV = createVector(randomInt(1), randomInt(1))
  boy = new Ellipse(50, 50, initV)

  for (let i = 0; i < 10; i++) {
    circleArr.push(new Ellipse(randomInt(window.innerWidth - 100), randomInt(window.innerHeight - 100), createVector(randomInt(5), randomInt(5))))
  }
  background(0);
}

function draw() {
  background(0)

  for (let i = 0; i < circleArr.length; i++) {
    let gravity = createVector(0, 0.1 * circleArr[i].mass);
    circleArr[i].applyForce(gravity);
    circleArr[i].update();
    circleArr[i].draw();
    circleArr[i].checkWall()
  }
}
