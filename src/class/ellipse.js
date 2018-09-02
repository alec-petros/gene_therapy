class Ellipse {
  constructor(initX, initY, vector) {
    this.loc = createVector(initX, initY);
    this.vector = vector
    this.scale = Math.random() * 100;
    this.color = color(map(this.vector.x, -2.5, 2.5, 0, 255), map(this.scale, 0, 100, 0, 255), map(this.vector.y, -2.5, 2.5, 0, 255))
  }

  draw() {
    if (this.loc.x < 0 - canvas.width / 4 || this.loc.x > canvas.width / 4) {
      this.vector.x *= -1
    }
    if (this.loc.y < 0 - canvas.height / 4 || this.loc.y > canvas.height / 4) {
      this.vector.y *= -1
    }
    this.loc.add(this.vector)

    fill(this.color)
    noStroke();
    ellipse(this.loc.x, this.loc.y, this.scale, this.scale)
  }
}
