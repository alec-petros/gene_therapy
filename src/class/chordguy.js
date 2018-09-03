var noteScale = [220, 262, 330, 349, 392]
var chordArr = []

class Chordguy {
  constructor(initX, initY, width, height) {
    this.x = initX;
    this.y = initY;
    this.width = width;
    this.height = height;
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y - this.height / 2;
    this.r = map(width, 10, 300, 0, 255);
    this.g = map(height, 10, 300, 0, 255);
    this.b = 200;
    chordArr.push(this)
    this.oscFreq = noteScale[Math.floor(Math.random() * noteScale.length)] / 2;
    this.currentFreq = 0;
    this.osc = new p5.Oscillator();
    this.filter = new p5.LowPass();
    this.filterFreq = -100;
    this.filter.freq(-100);
    this.filter.res(0);
    this.filter.disconnect();
    this.osc.disconnect();
    this.osc.connect(this.filter);
    this.osc.setType('sawtooth');
    this.osc.freq(this.oscFreq);
    this.amp = 0.6;
    this.osc.amp(this.amp);
    comp.process(this.filter);
    this.osc.start();
    // spaceVerb.process(this.filter, 5, 2);
  }

  draw() {
    fill(this.r, this.g, this.b, map(this.filterFreq, -100, this.oscFreq, 10, 150));
    rect(this.x, this.y, this.width, this.height);
    this.filterFreq = max(-100, this.filterFreq - 1);
    this.filter.freq(this.filterFreq)
    if (!this.collide) {
      this.currentFreq = max(0, this.currentFreq - 1);
      this.osc.freq(this.currentFreq);
    }
    this.collide = false;
  }

  checkColl() {
    circleArr.forEach((circ) => {
      if (circ.loc.x > this.x && circ.loc.x < this.x + this.width && circ.loc.y > this.y && circ.loc.y < this.y + this.height) {
        this.filterFreq = min(this.oscFreq, this.filterFreq + 3);
        this.currentFreq = this.oscFreq;
        this.osc.freq(this.currentFreq);
        this.collide = true;
      }
      if (((circ.oscFreq / 2) / (this.oscFreq * 2)).toFixed(1) == 1.2 || ((this.oscFreq * 2) / (circ.oscFreq * 2)).toFixed(1) === 1.2) {
        let distance = dist(this.centerX, this.centerY, circ.loc.x, circ.loc.y);
        let vec = createVector(circ.loc.x - this.centerX, circ.loc.y - this.centerY);
        vec.normalize();
        vec.mult(map(distance, 0, window.innerWidth, 0, -0.02))
        circ.applyForce(vec)
      }
    })
  }
}
