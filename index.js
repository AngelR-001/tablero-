window.addEventListener('DOMContentLoaded', (event) =>{



    
    let keysPressed = {}

    document.addEventListener('keydown', (event) => {
        keysPressed[event.key] = true;
     });
     
     document.addEventListener('keyup', (event) => {
         delete keysPressed[event.key];
      });

    let tutorial_canvas = document.getElementById("tutorial");
    let tutorial_canvas_context = tutorial_canvas.getContext('2d');

    tutorial_canvas.style.background = "#000000"


    class Rectangle {
        constructor(x, y, height, width, color) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
        }
        draw(){
            tutorial_canvas_context.lineWidth = 1
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.strokeStyle = "black"
            tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
            tutorial_canvas_context.strokeRect(this.x, this.y, this.width, this.height)
        }
        move(){
            this.x+=this.xmom
            this.y+=this.ymom
        }
    }
    class Circle{
        constructor(x, y, radius, color, xmom = 0, ymom = 0){
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.lens = 0
        }       
         draw(){
            tutorial_canvas_context.lineWidth = 0
            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
            tutorial_canvas_context.fillStyle = this.color
           tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke(); 
        }
        move(){
            this.x += this.xmom
            this.y += this.ymom
        }
    }

    class Grid{
        constructor(width, height, color){
            this.width = width
            this.height = height
            this.x = 0
            this.y = 0
            this.blocks = []
            for(let q = 0; this.y<tutorial_canvas.height; q++){
                for(let q = 0; this.x<tutorial_canvas.width; q++){
                    let block
                    if(Math.random() < .91){
                       block = new Rectangle(this.x, this.y, this.height, this.width, color)
                    }else{
                     block = new Rectangle(this.x, this.y, this.height, this.width, "red")
                    }
                    this.blocks.push(block)
                    this.x+=this.width
                }
                this.y+=this.height
                this.x = 0
            }

        }
        draw(){
            for(let b = 0; b<this.blocks.length; b++){
                this.blocks[b].draw()
            }
        }
    }

    class Agent{
        constructor(grid, color){
            this.grid = grid
            this.body = new Circle(10,10,Math.min(this.grid.width/4, this.grid.height/4), color)
            this.location = this.grid.blocks[Math.floor(Math.random()*this.grid.blocks.length)]
        }
        draw(){
            this.control()
            this.body.x = this.location.x + this.location.width/2
            this.body.y = this.location.y + this.location.height/2
            this.body.draw()
        }
        control(){
            if(keysPressed['w']){
                this.body.y -= this.grid.height
            }
            if(keysPressed['a']){
                this.body.x -= this.grid.width
            }
            if(keysPressed['s']){
                this.body.y += this.grid.height
            }
            if(keysPressed['d']){
                this.body.x += this.grid.width
            }

            for(let g = 0;g<this.grid.blocks.length; g++){
                if(this.body.x > this.grid.blocks[g].x){
                    if(this.body.y > this.grid.blocks[g].y){
                        if(this.body.x < this.grid.blocks[g].x+this.grid.blocks[g].width){
                            if(this.body.y < this.grid.blocks[g].y+this.grid.blocks[g].height){
                                if(this.grid.blocks[g].color != "red"){
                                    this.location = this.grid.blocks[g]
                                }
                            }  
                        }  
                    }
                }


            }


        }

    }

    let board = new Grid(70,70, "green")
    let smith = new Agent(board, "white")
   
    window.setInterval(function(){ 

        board.draw()
        smith.draw()
    }, 140) 

    
})