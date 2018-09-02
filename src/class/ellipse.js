var spaceVerb = new p5.Reverb();
var circleArr = [];
var index = 0;

class Ellipse {
  constructor(initX, initY, velocity) {
    this.index = index++;

    this.loc = createVector(initX, initY);
    this.accel = createVector(0, 0.005)
    this.velocity = velocity
    this.scale = Math.random() * 100;
    this.mass = map(this.scale, 0, 100, 1, 1)
    this.collided = []

    this.mu = 0.01;
    this.normal = 1;

    //color stuff
    this.colorScale = 1;
    this.color = {
      r: map(this.velocity.x, -2.5, 2.5, 0, 255),
      g: map(this.scale, 0, 100, 0, 255),
      b: map(this.velocity.y, -2.5, 2.5, 0, 255)
    }

    // osc stuff
    this.osc = new p5.Oscillator();
    this.filter = new p5.LowPass()
    this.filterFreq = 0;
    this.filter.freq(this.filterFreq)
    this.filter.res(2);
    this.osc.disconnect();
    this.osc.connect(this.filter);
    this.osc.setType('triangle');
    this.oscFreq = map(this.scale, 100, 0, 150, 1000)
    this.osc.freq(this.oscFreq);
    this.osc.amp(map(this.scale, 0, 100, 0.05, 0.5));
    spaceVerb.process(this.filter, 5, 2)
    this.osc.start();
  }

  applyForce(force) {
    var f = p5.Vector.div(force, this.mass)
    this.accel.add(f)
  }

  checkCollision() {
    circleArr.forEach((circ) => {
      if (this.index !== circ.index && !this.collided.includes(circ.index)) {
        if( dist( this.loc.x, this.loc.y, circ.loc.x, circ.loc.y) < (this.scale / 2 + circ.scale / 2) ) {
          this.collide(false, false);
          this.applyForce(circ.velocity)
          circ.applyForce(this.velocity);
          circ.collide(false, false);
          circ.collided.push(this.index)
        }
      }
    })
  }

  beep() {
    this.filterFreq = this.oscFreq;
    this.colorScale = 1;
  }

  collide(x, y) {
    this.beep()
  }

  checkWall() {
    if (this.loc.x - this.scale / 2 < -this.velocity.x - canvas.width / 4 || this.loc.x + this.scale / 2 > canvas.width / 4 - this.velocity.x) {
      this.collide(false, false)
      this.velocity.x *= -1
    }
    if (this.loc.y - this.scale / 2 < -this.velocity.y - canvas.height / 4 || this.loc.y + this.scale / 2 > canvas.height / 4 - this.velocity.y) {
      this.collide(false, true)
      this.velocity.y *= -1
    }
  }

  friction() {
    let frictionMag = this.mu * this.normal;
    let friction = this.velocity.copy();
    friction.normalize();
    friction.mult(-1);
    friction.mult(frictionMag);
    this.applyForce(friction);
  }

  update() {
    this.filter.freq(max(0, this.filterFreq -= map(this.scale, 100, 0, 0.5, 15)))
    this.colorScale -= 0.002;
    this.velocity.add(this.accel)
    this.loc.add(this.velocity)
    this.accel.mult(0)
  }

  draw() {
    fill(color(this.color.r * this.colorScale, this.color.g * this.colorScale, this.color.b * this.colorScale));
    noStroke();
    ellipse(this.loc.x, this.loc.y, this.scale, this.scale)
  }
}
