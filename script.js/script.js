var config = {
  type: Phaser.AUTO,
  scale: {
    width: 800,
    height: 600,
},
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
 
};

var game = new Phaser.Game(config);

// music, animations...
function preload() {
  //mapa
  this.load.image('mapa', 'assets/mapa3.jpg');

  //personagem
  this.load.image('jack', 'assets/creature-2.png');

  //pipes
  this.load.image('tubo', 'assets/tubo.png');
  this.load.image('tuboInvertido', 'assets/tubo-invertido.png');

  //restart
  this.load.image('restart', "assets/restart-button.png");
  
  //pontuação
  this.load.image("num0","assets/number0.png");
  this.load.image("num1", "assets/number1.png");
  this.load.image("num2", "assets/number2.png");
  this.load.image("num3", "assets/number3.png");
  this.load.image("num4", "assets/number4.png");
  this.load.image("num5", "assets/number5.png");
  this.load.image("num6", "assets/number6.png");
  this.load.image("num7", "assets/number7.png");
  this.load.image("num8", "assets/number8.png");
  this.load.image("num9", "assets/number9.png");

     

}



var score = 0;
var scoreText;
var tubo;
var tubos;
var jack;




// interações
function create() {

  this.add.image(400,300, 'mapa');

//cria os tubos
tubos = this.physics.add.group();

  // movimentação personagem
  jack = this.physics.add.sprite(100,game.config.height/2,'jack');
  jack.setScale(1.8);
  
this.input.on(
  "pointerdown",
  function () {
    jack.setVelocityY(-400);
  },
  this
);


//   this.tubo = this.physics.sprite(400,300, 'tubo');
//   tubo.setScale(0.145);
//   this.tubo.setVelocityX(125);
 
//   // // cria o tubo de cima
//  tuboInvertido = tubos.create(game.config.width / 2, 25, 'tuboInvertido');
//  tuboInvertido.setScale(0.130);
//    tuboInvertido.setOrigin(0.5, 0);
//    tuboInvertido.setCollideWorldBounds(true);

  


   

}

	



function update() {
      
}