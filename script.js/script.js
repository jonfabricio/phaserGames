var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
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
  scoreboard: {
    width: 25,
    base: "number",
    number0: "number0",
    number1: "number1",
    number2: "number2",
    number3: "number3",
    number4: "number4",
    number5: "number5",
    number6: "number6",
    number7: "number7",
    number8: "number8",
    number9: "number9",
  },
};

var game = new Phaser.Game(config);
var tubo;
var tubos;

function preload() {
  //mapa
  this.load.image('mapa', 'assets/mapa3.jpg');

  //personagem
  this.load.image('jack', 'assets/creature-2.png');

  //pipes
  this.load.image('tubo', 'assets/tubo.png');
  this.load.image('tuboInvertido', 'assets/tubo-invertido.png');

  //restart
  this.load.image("restart", "assets/restart-button.png");
  
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

function create() {
  this.add.image(400,300, 'mapa');
  this.add.image(400,300, 'jack');
  
  this.physics.world.setBounds(0,0,game.config.width,game.config.height);

  tubos = this.physics.add.group();
  // cria o tubo de baixo
  tubo = tubos.create(game.config.width / 2, game.config.height - 25, 'tubo');
  tubo.setScale(0.145);
  // setOrigin(0, 1) é importante para definir o ponto de ancoragem do sprite no canto inferior esquerdo, para que a posição do tubo seja definida pelo seu canto inferior esquerdo
  tubo.setOrigin(0.5, 1);
  // setImmovable(true) também é importante para que o tubo não se mova quando colidir com outros objetos.
  tubo.setCollideWorldBounds(true);
  tubo.setImmovable(true);	
  tubo.body.setAllowGravity(true);
  

  // cria o tubo de cima
  tuboInvertido = tubos.create(game.config.width / 2, 25, 'tuboInvertido');
  tuboInvertido.setScale(0.130);
  tuboInvertido.setOrigin(0.5, 0);
  tuboInvertido.setCollideWorldBounds(true);
  tuboInvertido.setImmovable(true);
  tuboInvertido.body.setAllowGravity(true);
  

  // adiciona os tubos ao grupo
  tubos.add(tubo);
  tubos.add(tuboInvertido);
}

	



function update() {}