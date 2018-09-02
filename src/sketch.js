function randomInt(scale) {
  return Math.floor(Math.random() * scale) - scale / 2;
}

var initV;
var boy;
var spaceVerb;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  initV = createVector(randomInt(1), randomInt(1))
  chordArr.push(new Chordguy(-100, -11, 500, 500));
  chordArr.push(new Chordguy(-500, -100, 300, 50));
  colorMode(RGB, 255, 255, 255, 255)


  for (let i = 0; i < 5; i++) {
    circleArr.push(new Ellipse(randomInt(window.innerWidth - 100), randomInt(window.innerHeight - 100), createVector(randomInt(2), randomInt(2))))
  }
  background(0);
}

function draw() {
  background(0)
  chordArr.forEach(guy => {
    guy.checkColl();
    guy.draw();
  })

  for (let i = 0; i < circleArr.length; i++) {
    let gravity = createVector(0, 0.001 * circleArr[i].mass);
    circleArr[i].applyForce(gravity);
    circleArr[i].friction();
    circleArr[i].checkCollision()
    circleArr[i].update();
    circleArr[i].draw();
    circleArr[i].checkWall()
  }

}

function mousePressed() {
  circleArr.push(new Ellipse(mouseX - window.innerWidth / 2, mouseY - window.innerHeight / 2, createVector(randomInt(2), randomInt(2))))
  console.log(mouseX - window.innerWidth / 2, mouseY)
}
