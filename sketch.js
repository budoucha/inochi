new p5(
  p => {
    class Cells extends Array {
      newCell(posX, posY, hasEye) {
        this.push(new Cell(posX, posY, hasEye));
      }

      update() {
        const fr = p.frameRate();
        if (fr < 25) {
          this.splice(0, this.length / 10);
          this.showInochiNumber();
        }

        for (const cell of this) {
          cell.update();
          if (!cell.isAlive) {
            this.splice(this.indexOf(cell), 1);
            continue;
          }

          //random birth
          if (Math.random() > 0.9 && fr > 30) {
            //random eye
            const hasEye = Math.random() > 0.7;
            this.newCell(cell.posX, cell.posY, hasEye);
            this.showInochiNumber();
          }
          cell.draw();
          // zombie checkeer
          if (!cell.isAlive) { console.log("dead walking!") }
        }
      }

      showInochiNumber() {
        document.getElementById("inochinumber").textContent = "いのちの数： " + this.length;
      }
    }

    const cells = new Cells;
    let isRunning = false;

    class Cell {
      constructor(
        //random()*(max-min)+min
        posX = Math.random() * p.width,
        posY = Math.random() * p.height,
        hasEye = false,
        size = Math.random() * (16 - 8) + 8
      ) {
        this.posX = posX;
        this.posY = posY;
        this.hasEye = hasEye;
        this.size = size;
        this.isAlive = true;
      }

      update() {
        //random size and move
        this.posX += Math.random() * (10 + 10) - 10;
        this.posY += Math.random() * (10 + 10) - 10;
        this.size += Math.random() * (this.size / 15 + this.size / 16) - this.size / 16;

        //position limit
        this.posX = Math.max(0, Math.min(this.posX, p.width));
        this.posY = Math.max(0, Math.min(this.posY, p.height));
        //death
        if (this.size > p.width / 16 || this.size <= 0) { this.isAlive = false }
      }

      draw() {
        p.ellipseMode(p.CENTER);
        p.ellipseMode(p.RADIUS);
        p.noStroke();
        p.fill(255, 0, 0);
        p.ellipse(this.posX, this.posY, this.size, this.size);
        p.ellipse(400, 300);

        if (this.hasEye) {
          p.fill(255);
          p.ellipse(this.posX, this.posY, this.size / 2, this.size / 2);
          p.fill(64, 128, 255);
          p.ellipse(this.posX, this.posY, this.size / 4, this.size / 4);
        }
      }
    }

    const bgColor = 216

    p.setup = () => {
      canvas = p.createCanvas(800, 600);
      canvas.parent("inochi");
      p.background(bgColor);
    }

    p.draw = () => {
      if (isRunning) {
        p.background(bgColor);
        cells.update();
      }
    }

    p.mouseClicked = () => {
      isRunning = !isRunning;
      if (cells.length == 0) {
        //create first cell
        cells.newCell(p.mouseX, p.mouseY, true);
      }
    }
  }
);
