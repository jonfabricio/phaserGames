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

var score = 0;
var scoreText;
var tubo;
var tubos;
var tuboInvertido;
var jack;
var posicao;
var gameOverText;
var tuboAtual = 0;
var music;


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

  // music
  this.load.audio('music', "assets/soundtrack.mp3");
  
}


function gerarTubos() {
  posicao = Math.floor(Math.random() * 250) + 150; // posição aleatória para os tubos

  tubo = tubos.create(game.config.width + 70, posicao - 75, "tubo");
  tubo.setOrigin(0.2, 1);
  tubo.body.setAllowGravity(false);
  tubo.body.setVelocityX(-200);
  tubo.setScale(0.24);

  tuboInvertido = tubos.create(
    game.config.width + 70,
    posicao + 75,
    "tuboInvertido"
  );
  tuboInvertido.setOrigin(0.2, 0);
  tuboInvertido.body.setAllowGravity(false);
  tuboInvertido.body.setVelocityX(-200);
  tuboInvertido.setScale(0.24);

  var conjuntoTubos = this.add.group();
  conjuntoTubos.add(tubo);
  conjuntoTubos.add(tuboInvertido);
  conjuntoTubos.posicaoX = tubo.x;
  conjuntoTubos.tuboAtual = tuboAtual; // adiciona a posição atual do tubo na variável 'tuboAtual'

  conjuntoTubos.passou = false;
}


function aumentarScore() {
  if (tubos.getLength() > 0) {
    var proximoTubo = tubos.getChildren()[tuboAtual];
    if (proximoTubo.getBounds().right < jack.getBounds().left) {
      score++;
      scoreText.setText("Score: " + score);
      tuboAtual++;
    }
  }
}



function gameOver() {

   gameOverText = this.add.text(400, 300, "Game Over", {
     fontSize: "64px",
     fill: "#000",
     align: "center",
   });

   gameOverText.setOrigin(0.5);
   gameOverText.setDepth(1); // torna o texto invisível por padrão
   gameOverText.setVisible(true);
  jack.setTint(0xff0000);
  this.physics.pause();

  
    restartButton = this.add.image(400, 500, "restart").setInteractive();
    restartButton.setVisible(true);
    restartButton.setOrigin(0.5)
    restartButton.setDepth(1);
    restartButton.on(
      "pointerdown",
      function () {
       
           tubos.clear(true, true); // limpa todos os tubos
           tuboAtual = 0; // reinicia a variável 'tuboAtual'
           score = 0; // reinicia a variável 'score'
           this.scene.restart();
      },
      this
    );


}




// interações
function create() {
  this.add.image(400, 300, "mapa");

    music = this.sound.add("music", { loop: true });
    music.play();
  
  // reinicia a pontuação e a posição do jogador
  score = 0;


  // movimentação personagem
  jack = this.physics.add.sprite(100, game.config.height / 2, "jack");
  jack.setScale(1.8);
  jack.setGravityY(800); // adiciona a gravidade no eixo Y

  jack.setSize(34, 24, true);
  jack.setOffset(2, 6);

  this.input.on(
    "pointerdown",
    function () {
      jack.setVelocityY(-400);
    },
    this
  );

  // grupo tubos
  tubos = this.physics.add.group();

  // adiciona tubos a cada 2 segundos
  this.time.addEvent({
    delay: 2000,
    callback: gerarTubos,
    callbackScope: this,
    loop: true,
  });

  this.physics.add.collider(jack, tubos, gameOver, null, this);

  jack.setCollideWorldBounds(true); // adiciona a detecção de colisão com o mundo

  scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "32px",
    fill: "#000",
    stroke: "#fff",
    strokeThickness: 4,
  });
  scoreText.setDepth(1);
}


function update() {

  aumentarScore();
  
    scoreText.setText("Score: " + score);

  
}
