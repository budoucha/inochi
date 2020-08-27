new p5(
  p => {
    class Cells extends Array {
      newCell(posX, posY, hasEye) {
        this.push(new Cell(posX, posY, hasEye));
      }

      update() {
        for (const cell of this) {
          cell.update();
          //random birth
          if (Math.random() > 0.9 && this.length < 1024) {
            //random eye
            const hasEye = Math.random() > 0.7;
            this.newCell(cell.posX, cell.posY, hasEye);
          }
          cell.draw();
        }
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
      }

      update() {
        //random size and position move
        this.posX += Math.random() * (10 + 10) - 10;
        this.posX = Math.max(this.posX, 0);
        this.posX = Math.min(this.posX, p.width);
        this.posY += Math.random() * (10 + 10) - 10;
        this.posY = Math.max(this.posY, 0);
        this.posY = Math.min(this.posY, p.height);
        this.size += Math.random() * (this.size / 15 + this.size / 16) - this.size / 16
        if (this.size > p.width / 16) { this.size /= 4; }
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
