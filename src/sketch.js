function randomInt(scale) {
  return Math.floor(Math.random() * scale) - scale / 2;
}

var initV;
var boy;
var spaceVerb;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  initV = createVector(randomInt(1), randomInt(1))

  for (let i = 0; i < 5; i++) {
    chordArr.push(new Chordguy(
      randomInt(window.innerWidth),
      randomInt(window.innerHeight),
      map(Math.random(), 0, 1, 20, 300),
      map(Math.random(), 0, 1, 20, 300))
    )
  }
  // chordArr.push(new Chordguy(-100, -11, 500, 300));
  // chordArr.push(new Chordguy(-500, -100, 300, 50));
  colorMode(RGB, 255, 255, 255, 255)


  for (let i = 0; i < 1; i++) {
    circleArr.push(new Ellipse(randomInt(window.innerWidth - 100), randomInt(window.innerHeight - 100), createVector(randomInt(1), randomInt(1))))
  }
  background(0);
}

function draw() {
  background(0)
  chordArr.forEach(guy => {
    guy.checkColl();
    guy.draw();
  })

  let spectrum = fft.analyze();
  noStroke();
  fill(200,200,200, 10); // spectrum is green
  for (let i = 0; i< 45; i++){
    let x = map(i, 0, 45, window.innerWidth / 2 - window.innerWidth, window.innerWidth / 2);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / 45, h )
  }

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
}
