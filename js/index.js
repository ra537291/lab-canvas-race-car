const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


let mapa = document.createElement('img');
mapa.src = "images/road.png";
let car = document.createElement("img");
car.src = "images/car.png";


window.addEventListener('load', () =>{
  class Player {
    constructor() {
      this.x = canvas.width/2 - 39.5;
      this.y = canvas.height - 162;
      this.width = 79;
      this.height = 160;
      this.velocidadx = 20;
    }
    print() {
      ctx.drawImage(car, this.x, this.y, this.width, this.height);
      /* ctx.drawImage(mapa, 0, 0, canvas.width, canvas.height); */
  
    }
    moveLeft(){
      this.x -= this.velocidadx;
      if(this.x < 0) return this.x = 0;
    }

    moveRight(){
      this.x += this.velocidadx;
      if(this.x + this.width >= canvas.width) return this.x = canvas.width - this.width;
    }

  }
  
  class Obstacle {
    constructor() {
      this.y = -40;
      this.width = Math.floor(Math.random()* (canvas.width/2));
      this.x = Math.floor(Math.random()*(canvas.width - this.width));
      this.height = 40;
      this.color = "red";
      this.velocidady = 5;
  }
    print() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
  
  }
    move(){
      this.y += this.velocidady;
    }
  }

  class Partida {
    constructor(){
      this.player1 = new Player()
      this.enemies = [];
      this.score = 0;
      this.intervalId = undefined;
      this.contador = 0;
    }
    
    start(){
      if (!this.intervalId) {
        this.intervalId = setInterval(() => {
          this.contador ++;
          this.clear();
          this.recalculate();
          this.print();
        },20)
      }
    }

    end(){
      if(this.intervalId) clearInterval(this.intervalId);
    }

    clear(){
      ctx.clearRect(0,0, canvas.width, canvas.height)
    }

    print(){
      //fondo
      ctx.drawImage(mapa, 0, 0, canvas.width, canvas.height);
      //coche
      this.player1.print();
      //obst
      this.enemies.forEach(obstaculo => {
        obstaculo.print();
      });
    }

    recalculate(){
      if(this.contador == 70) {
        //creo obstaculo
        let obstaculo = new Obstacle();
        //lo añado al array
        this.enemies.push(obstaculo);
        this.contador = 0;
      }
      this.enemies.forEach(obstaculo => {
        obstaculo.move();
        if(!( this.player1.x + this.player1.width < obstaculo.x || 
          this.player1.x > obstaculo.x + obstaculo.width || 
          this.player1.y > obstaculo.y + obstaculo.height ||
          this.player1.y + this.player1.height < obstaculo.y)) {
            this.end();
          }
      })
    }
  }
  
  let jugar = new Partida();

  document.getElementById('start-button').onclick = () => {    
    startGame();
  };

  function startGame(){
    jugar.start();
  }

  document.getElementsByTagName("body")[0].addEventListener("keydown",(event) => {
    switch(event.key){
      case "ArrowLeft":
        jugar.player1.moveLeft();
        break;
      case "ArrowRight":
        jugar.player1.moveRight();
        break;
    }
  })

});