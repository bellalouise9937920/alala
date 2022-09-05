  // aqui é criada uma constante com a função jogo que recebe tudo feito acima
  var game = new Game();
  // aqui é o comando para iniciar o jogo quando a tela carregar
  window.onload = () => game.start();
  // aqui é a função de setup que executa a janela do jogo
  function setup() {
    // aqui é a execução da função gameWindow na classe jogo
    game.gameWindow();
  }
  // aqui é a função para atualizar o jogo que fizemos acima
  function draw() {
    // aqui é a execução da função update na classe jogo
    game.update();
  }