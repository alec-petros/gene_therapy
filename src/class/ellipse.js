var spaceVerb = new p5.Reverb();
var spaceDel = new p5.Delay();
var fft = new p5.FFT();
var comp = new p5.Compressor();
comp.set(0.003, 30, 25, -24, 0.25)
var hipass = new p5.HighPass();
hipass.freq(60);
hipass.res(0);
comp.disconnect();
comp.connect(hipass);
spaceVerb.process(hipass, 7, 1)
spaceDel.process(hipass, 0.7, .5, 400)
hipass.connect(fft)
var circleArr = [];
var index = 0;
var noteScale = [175, 220, 262, 330, 392, 440, 494, 523.25, 587.33]
var maj = [262, 294, 330, 349, 392, 440, 494]


class Ellipse {
  constructor(initX, initY, velocity) {
    this.index = index++;

    this.loc = createVector(initX, initY);
    this.accel = createVector(0, 0.005)
    this.velocity = velocity
    this.scale = map(Math.random(), 0, 1, 20, 60);
    this.mass = map(this.scale, 0, 100, 2, 2)
    this.collided = []

    this.mu = 0.00005;
    this.normal = 1;

    //color stuff
    this.colorScale = 1;
    this.color = {
      r: map(this.velocity.x, -1.5, 1.5, 0, 255),
      g: map(this.scale, 20, 60, 0, 230),
      b: map(this.velocity.y, -1.5, 1.5, 0, 255),
      a: 200
    }

    // osc stuff
    this.osc = new p5.Oscillator();
    this.filter = new p5.LowPass()
    this.filterFreq = 0;
    this.filter.freq(this.filterFreq)
    this.filter.res(0);
    this.osc.disconnect();
    this.osc.connect(this.filter);
    this.osc.setType('triangle');
    this.oscFreq = this.closestNote(map(this.scale, 60, 15, 175, 587), noteScale) * 2;
    // console.log(this.oscFreq)
    this.osc.freq(this.oscFreq);
    this.osc.amp(map(this.scale, 0, 100, 0.05, 0.1));
    this.filter.disconnect();
    comp.process(this.filter);
    this.osc.start();
  }

  closestNote (num, arr) {
    let curr = arr[0]
    for (let i = 0; i < arr.length; i++) {
      if (Math.abs(num - arr[i]) < Math.abs(num - curr)) {
        curr = arr[i]
      }
    }
    return curr
  }

  applyForce(force) {
    var f = p5.Vector.div(force, this.mass)
    this.accel.add(force)
  }

  checkCollision() {
    // this is dumb, needs to be fixed, do not use
    circleArr.forEach((circ) => {
      if (this.index !== circ.index && !this.collided.includes(circ.index)) {
        let distance = dist( this.loc.x, this.loc.y, circ.loc.x, circ.loc.y)
        let testVec = createVector(this.loc.x - circ.loc.x, this.loc.y - circ.loc.y);
        testVec.normalize();
        this.applyForce(testVec.div(distance / 2))
        stroke(255, 255, 255, 50);
        line(this.loc.x, this.loc.y, circ.loc.x, circ.loc.y);
        // if( dist( this.loc.x, this.loc.y, circ.loc.x, circ.loc.y) < (this.scale / 2 + circ.scale / 2) ) {
        //   this.collide(false, false);
        //   this.applyForce(circ.velocity)
        //   circ.applyForce(this.velocity);
        //   circ.collide(false, false);
        //   circ.collided.push(this.index)
        // }
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

  limit(max) {
    this.velocity.x = min(10, this.velocity.x);
    this.velocity.y = min(10, this.velocity.y);
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
    this.filterFreq = max(0, this.filterFreq -= map(this.scale, 100, 0, 0.5, 10))
    this.filter.freq(this.filterFreq)
    this.colorScale -= 0.002;
    this.velocity.add(this.accel)
    this.limit(3);
    this.loc.add(this.velocity)
    this.collided = []
    this.accel.mult(0)
  }

  draw() {
    let expand = map(this.filterFreq, 0, this.oscFreq, this.scale, this.scale * 1.6)
    noStroke();
    fill(this.color.r, this.color.g, this.color.b, expand - this.scale)
    ellipse(this.loc.x, this.loc.y, expand, expand);
    fill(color(this.color.r * this.colorScale, this.color.g * this.colorScale, this.color.b * this.colorScale, this.color.a));
    ellipse(this.loc.x, this.loc.y, this.scale, this.scale)

  }
}
