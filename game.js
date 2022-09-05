// aqui temos a classe game que vai receber todas as propriedades do jogo
class Game {
    constructor() {
      document.addEventListener("keydown", this.keyEvents.bind(this)); // comando para ativar quando a tecla for pressionada
      // aqui temos o som para quando a cobra morrer que pegamos de um link no dropbox
      this.a_dead = new Audio(
        "https://www.dropbox.com/s/r7o9las1ki6tr0u/fail.wav?dl=1"
      );
      // aqui temos o som para quando a cobra comer a maçã que pegamos de um link no dropbox
      this.a_eat = new Audio(
        "https://www.dropbox.com/s/qukhjmxog6h3we8/crunch.wav?dl=1"
      );
      // aqui temos o som para quando o jogo começar que pegamos de um link no dropbox
      this.a_start = new Audio(
        "https://www.dropbox.com/s/xff36yvnh2zsxzh/start.wav?dl=1"
      );
    }
  
    // código tamanho da tela
    gameWindow() {
      this.winWidth = 400; // aqui definimos a largura da tela
      this.winHeight = 400; // aqui definimos a altura da tela
      createCanvas(this.winWidth, this.winHeight).parent("gameBox"); // aqui fazemos a criação da tela com a altura e largura setadas acima
    }
  
    // código para desenhar na tela
    draw() {
      background("rgb(73, 95, 105)"); // cor da tela de fundo do jogo
      stroke("rgba(255, 255, 255,.5)"); // cor da borda da tela do jogo
      // colunas principais do jogo
  
      this.snake(); // chamar função 
      this.apple(); // chamar função 
      this.scoreBoard(); // chamar função 
      this.bestScore(); // chamar função 
    }
  
    // aqui temos a função para atualizar o jogo a cada frame
    update() {
        //frame é um quadro
      this.frame = false; // aqui definimos para parar de ter atualização de frame
      this.draw(); // chamando a função que fizemos acima
    }
  
    start() {
      this.positionX = 15; // posição X da cobra
      this.positionY = 10; // posição Y da cobra
      this.appleX = this.appleY = 10; // Primeira localização da maçã
      this.trail = []; // A matriz em que as coordenadas do corpo da Serpente são mantidas
      this.trailSize = 5; // o tamanho inicial da cobra
      this.speedX = this.speedY = 0; // a velocidade inicial da cobra
      this.gridSize = this.tileCount = 20; // o número de quadros da tela
      this.fps = 1000 / 18; // número de imagens por segundo(FPS)
      this.timer = setInterval(this.update.bind(this), this.fps);
      this.score = 0; // o valor do score inicial
    }
  
    reset() {
      clearInterval(this.timer); // redefine o tempo
      this.a_dead.play(); // aqui reproduz o som de quando a cobra morre
      this.start(); // reinicia o jogo
    }
  
    keyEvents(e) {
      // código para ir para esquerda
      if (e.keyCode === LEFT_ARROW && this.speedX !== 1) {
        // aqui definimos a velocidade da cobra e a tecla que vamos apertar nesse caso é a seta para esquerda
        this.a_start.play();
        // aqui reproduzimos o som de quando a cobra começar
        this.speedX = -1;
        // aqui definimos a velocidade X da cobra
        this.speedY = 0;
        // aqui definimos a velocidade Y da cobra
        this.frame = true;
        // aqui definimos para ter atualização de frame
      }
      // condição para a cobra ir para direita
      if (e.keyCode === RIGHT_ARROW && this.speedX !== -1) {
        // aqui definimos a velocidade da cobra e a tecla que vamos apertar nesse caso é a seta para direita
        this.a_start.play();
        // aqui soltamos o som de quando a cobra começar
        this.speedX = 1;
        // aqui definimos a velocidade X da cobra
        this.speedY = 0;
        // aqui definimos a velocidade Y da cobra
        this.frame = true;
        // aqui definimos para ter atualização de frame
      }
      // condição para a cobra ir para baixo
      if (e.keyCode === DOWN_ARROW && this.speedY !== -1) {
        // aqui definimos a velocidade da cobra e a tecla que vamos apertar nesse caso é a seta para baixo
        this.a_start.play();
        // aqui soltamos o som de quando a cobra começar
        this.speedX = 0;
        // aqui definimos a velocidade X da cobra
        this.speedY = 1;
        // aqui definimos a velocidade Y da cobra
        this.frame = true;
        // aqui definimos para ter atualização de frame
      }
      // condição para a cobra ir para cima
      if (e.keyCode === UP_ARROW && this.speedY !== 1) {
        // aqui definimos a velocidade da cobra e a tecla que vamos apertar nesse caso é a seta para cima
        this.a_start.play();
        // aqui soltamos o som de quando a cobra começar
        this.speedX = 0;
        // aqui definimos a velocidade X da cobra
        this.speedY = -1;
        // aqui definimos a velocidade Y da cobra
        this.frame = true;
        // aqui definimos para ter atualização de frame
      }
    }
  
    // elementos do jogo
    // função da cobra a seguir
    snake() {
      fill("rgba(255,255,255,.75)"); // aqui definimos a cor da cobra
      this.trail.forEach((a) => {
        // aqui fazemos a cauda da cobra a seguir o mesmo caminho que a cabeça fez
        //PARAMOS AQUI
        rect(
          a.positionX * 20, // aqui modificamos e multiplicamos o espaçamento X entre as bolas que representam a cauda da cobra
          a.positionY * 20, // aqui modificamos e multiplicamos o espaçamento X entre as bolas que representam a cauda da cobra
          this.gridSize - 5, // aqui definimos o tamanho do circulo da cobra
          this.gridSize - 5, // aqui definimos o tamanho do circulo da cobra
          20, // aqui definimos a forma da cobra que nesse caso vai ser circular
          20 // aqui definimos a forma da cobra que nesse caso vai ser circular
        );
      });
      this.positionX += this.speedX; // aqui dizemos que a posição x da cobra vai ser somada com a velocidade X
      this.positionY += this.speedY; // aqui dizemos que a posição x da cobra vai ser somada com a velocidade y
  
      if (this.positionX < 0) {
        // aqui está feito o código para que caso a cobra saia da borda da direita que ela apareca na esquerda
        this.positionX = this.tileCount - 1;
      } else if (this.positionY < 0) {
        // aqui está feito o código para que caso a cobra saia da borda da esquerda ela apareça na direita
        this.positionY = this.tileCount - 1;
      } else if (this.positionX > this.tileCount - 1) {
        // aqui está feito o código para que caso a cobra saia da borda de cima ela apareça em baixo
        this.positionX = 0;
      } else if (this.positionY > this.tileCount - 1) {
        // aqui está feito o código para que caso a cobra saia da borda de baixo ela apareça em cima
        this.positionY = 0;
      }
  
      // código para que a cauda dela siga o caminho que ela fez
      this.trail.forEach((t) => {
        if (this.positionX === t.positionX && this.positionY === t.positionY) {
          // aqui é feito o código para que a cauda da cobra acompanhe a cabeça caso saia da borda
          this.reset();
        }
      });
  
      // código da posição da cobra
      this.trail.push({ positionX: this.positionX, positionY: this.positionY });
  
      // a cada vez que a cobra comer a fruta, ela vai ser automaticamente desenhada em outro quadrado da tela
      while (this.trail.length > this.tailSize) {
        this.trail.shift();
      }
      
    }
    // código da maçã
    apple() {
      // cor da maçã
      fill("pink");
  
      rect(
        this.appleX * this.tileCount,
        this.appleY * this.tileCount,
        this.gridSize - 5, // aqui definimos o tamanho do quadrado da maçã
        this.gridSize - 5, // aqui definimos o tamanho do quadrado da maçã
        5, // aqui definimos a forma da maçã que nesse caso vai ser quadrada
        5 // aqui definimos a forma da maçã que nesse caso vai ser quadrada
      );
  
      if (this.appleX === this.positionX && this.appleY === this.positionY) {
        // aqui colocamos a condição para que a cobra coma a maçã
        this.tailSize++;
        // aqui falamos para que caso a cobra coma a maçã seu rabo aumento um circulo
        this.score++;
        // aqui falamos para que caso a cobra coma a maçã sua pontuação aumente em um
        this.appleX = Math.floor(Math.random() * this.tileCount); // aqui é o código para que a maça apareceça de forma aleatória do mapa
        this.appleY = Math.floor(Math.random() * this.tileCount); // aqui é o código para que a maça apareceça de forma aleatória do mapa
        this.trail.forEach((t) => {
          if (this.appleX === t.positionX && this.appleY == t.positionY) {
            // aqui fazemos a condição para caso a maçã apareça dentro da cobra ela seja anulada e apareça em outro lugar
            this.apple();
            // aqui rodamos a função para ela aparecer em outro lugar
          }
        });
        this.a_eat.play();
        // aqui reproduzimos o som de quando a maçã é comida
      }
    }
    // código da pontuação que você fez
    scoreBoard() {
      textSize(15); // aqui setamos o tamanho do texto do score
      noStroke(); // essa função é usada para remover o contorno que é usado para desenhar linhas e bordas em torno das formas.
      fill(26); // aqui é a função para preencher o score
      text("Pontos", 10, 20); // aqui é o texto que é mostrado lá
      textSize(20); // aqui setamos o tamanho do texto do score
      text(this.score, 32.5, 45); // aqui chamamos a variavel score e setando os valores que setamos acima
    }
    // código da melhor pontuação que você fez
    bestScore() {
      textSize(15); // aqui setamos o tamanho do texto do best score
      text("Recorde", 340, 20); // // aqui é o texto que é mostrado lá
      if (!localStorage.getItem("best")) { //localStorage é a memória cache
        // aqui é a condição para a sua melhor pontuação ser guardada no cache do seu pc
        localStorage.setItem("best", 0);
      }
      textSize(20); // aqui setamos o tamanho do texto do score
      text(localStorage.getItem("best"), 357, 45); // aqui chamamos a variavel que guardou o seu melhor score da outra rodada
  
      if (this.score > localStorage.getItem("best")) {
        // aqui fazemos a função para que caso você bata seu record de pontuação, a sua nova pontuação seja a que você está fazendo agora
        this.best = this.score;
        localStorage.setItem("best", this.best); // aqui é a condição para a sua nova melhor pontuação ser guardada no cache do seu pc novamente
      }
    }
  }