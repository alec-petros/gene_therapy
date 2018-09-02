class Ellipse {
  constructor(initX, initY, vector) {
    this.loc = createVector(initX, initY);
    this.accel = createVector(0, 0.005)
    this.vector = vector
    this.scale = Math.random() * 100;
    this.color = color(map(this.vector.x, -2.5, 2.5, 0, 255), map(this.scale, 0, 100, 0, 255), map(this.vector.y, -2.5, 2.5, 0, 255))
    this.osc = new p5.Oscillator();
    this.osc.setType('sine');
    this.osc.freq(map(this.scale, 100, 0, 150, 1000));
    this.osc.amp(0);
    this.osc.start();
  }

  beep() {
    this.osc.amp(map(this.scale, 0, 100, 0.2, 0.5), 0.05)
    this.osc.amp(0, 3);
  }

  draw() {
    this.vector.x += this.accel.x;
    this.vector.y += this.accel.y
    if (this.loc.x < -this.vector.x - canvas.width / 4 || this.loc.x > canvas.width / 4 - this.vector.x) {
      this.vector.x *= -1
      this.beep()
    }
    if (this.loc.y < -this.vector.y - canvas.height / 4 || this.loc.y > canvas.height / 4 - this.vector.y) {
      this.vector.y *= -1
      this.beep()
    }
    this.loc.add(this.vector)

    fill(this.color)
    noStroke();
    ellipse(this.loc.x, this.loc.y, this.scale, this.scale)
  }
}
