new p5(
  p => {
    const cells = [];

    class Cell {
      constructor(
        //random()*(max-min)+min
        posX=Math.random() * p.width, 
        posY=Math.random() * p.height,
        hasEye=false,
        size=Math.random() * (16-8)+8
      ){
        this.posX=posX;
        this.posY=posY;
        this.hasEye=hasEye;
        this.size=size;
        console.log("size: "+this.size);
        console.log(posX,posY);
      }

      update(){
        //random size and position move
        this.posX+=Math.random()*(10+10)-10
        this.posY+=Math.random()*(10+10)-10
        this.size+=Math.random()*(this.size/15 +this.size/16)-this.size/16
      }

      draw(){
        p.ellipseMode(p.CENTER);
        p.ellipseMode(p.RADIUS);
        p.noStroke();
        p.fill(255,0,0);
        p.ellipse(this.posX,this.posY,this.size,this.size);
        p.ellipse(400,300);

        if(this.hasEye==true){
          p.fill(255);
          p.ellipse(this.posX,this.posY,this.size/2,this.size/2);
          p.fill(64,128,255);
          p.ellipse(this.posX,this.posY,this.size/4,this.size/4);
        }
      }
    }

    const bgColor=216

    p.setup = () => {
      canvas = p.createCanvas(800, 600);
      canvas.parent("inochi");
      p.background(bgColor);
    }

    p.draw = () => {
      p.background(bgColor);
      for(const cell in cells){
        cells[cell].update();
        //random birth
        if(Math.random()>0.9 && cells.length<1024){
          //random eye
          const hasEye=Math.random()>0.8? true: false;
          cells.push(new Cell(cell.posX,cell.posY,hasEye))
        }
        cells[cell].draw();
      }
    }

    p.mouseClicked = () =>{
      //clear array if exists
      if(cells.length > 0){
        cells.length = 0;
      }
      else{
      //create first cell
      cells.push(new Cell(p.width/2, p.height/2,true));
      console.log(cells[0]);
      }
    }

  }
);
