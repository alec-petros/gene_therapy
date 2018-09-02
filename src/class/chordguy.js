var noteScale = [220, 247, 262, 294, 330, 349, 392, 440]
var chordArr = []

class Chordguy {
  constructor(initX, initY, width, height) {
    this.x = initX;
    this.y = initY;
    this.width = width;
    this.height = height;
    this.color = color(map(width, 10, 100, 0, 255), map(height, 10, 100, 0, 255), 200, 200);
    chordArr.push(this)
    this.oscFreq = noteScale[Math.floor(Math.random() * noteScale.length)] / 2;
    this.osc = new p5.Oscillator();
    this.osc.setType('sine');
    this.osc.freq(this.oscFreq);
    this.amp = 0;
    this.osc.amp(0);
    this.osc.disconnect();
    comp.process(this.osc);
    this.osc.start();
    spaceVerb.process(this.osc, 5, 2);
  }

  draw() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    this.amp = max(0, this.amp - 0.01);
    this.osc.amp(this.amp)
  }

  checkColl() {
    circleArr.forEach((circ) => {
      if (circ.loc.x > this.x && circ.loc.x < this.x + this.width && circ.loc.y > this.y && circ.loc.y < this.y + this.height) {
        circ.filterFreq = min(circ.filterFreq + 30, 700);
        this.amp = min(this.amp + 0.05, 0.4)
      }
    })
  }
}
