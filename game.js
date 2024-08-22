const flags = [
  { state: "Acre", src: "bandeiras/acre.png" },
  { state: "Alagoas", src: "bandeiras/alagoas.png" },
  { state: "Amapá", src: "bandeiras/amapa.png" },
  { state: "Amazonas", src: "bandeiras/amazonas.png" },
  { state: "Bahia", src: "bandeiras/bahia.png" },
  { state: "Ceará", src: "bandeiras/ceara.png" },
  { state: "Distrito Federal", src: "bandeiras/distritofederal.png" },
  { state: "Espírito Santo", src: "bandeiras/espiritosanto.png" },
  { state: "Goiás", src: "bandeiras/goias.png" },
  { state: "Maranhão", src: "bandeiras/maranhao.png" },
  { state: "Mato Grosso", src: "bandeiras/matogrosso.png" },
  { state: "Mato Grosso do Sul", src: "bandeiras/matogrossosul.png" },
  { state: "Minas Gerais", src: "bandeiras/minasgerais.png" },
  { state: "Pará", src: "bandeiras/para.png" },
  { state: "Paraíba", src: "bandeiras/paraiba.png" },
  { state: "Paraná", src: "bandeiras/parana.png" },
  { state: "Pernambuco", src: "bandeiras/pernambuco.png" },
  { state: "Piauí", src: "bandeiras/piaui.png" },
  { state: "Rio de Janeiro", src: "bandeiras/riodejaneiro.png" },
  { state: "Rio Grande do Sul", src: "bandeiras/riograndedosul.png" },
  { state: "Rio Grande do Norte", src: "bandeiras/riograndenorte.png" },
  { state: "Rondônia", src: "bandeiras/rondonia.png" },
  { state: "Roraima", src: "bandeiras/roraima.png" },
  { state: "Santa Catarina", src: "bandeiras/santacatarina.png" },
  { state: "São Paulo", src: "bandeiras/saopaulo.png" },
  { state: "Sergipe", src: "bandeiras/sergipe.png" },
  { state: "Tocantins", src: "bandeiras/tocatins.png" },
];
const WINNING_SCORE = 270; // Define o limite de pontuação para vencer

let currentFlagIndex = 0;
let score = 0; // Inicializa a pontuação

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function loadFlag() {
  if (score >= WINNING_SCORE) {
    endGame();
    return;
  }

  const flag = flags[currentFlagIndex];

  // Garante que a lista de estados exclua o estado correto
  const otherStates = flags.filter((f) => f.state !== flag.state);

  // Seleciona 3 estados aleatórios dos restantes
  const randomStates = [];
  while (randomStates.length < 3) {
    const randomIndex = Math.floor(Math.random() * otherStates.length);
    const state = otherStates[randomIndex];

    if (!randomStates.includes(state.state)) {
      randomStates.push(state.state);
    }
  }

  // Adiciona o estado correto às opções
  const options = [flag.state, ...randomStates];

  shuffle(options);

  // Atualiza a imagem e as opções dos botões
  document.getElementById("flag").src = flag.src;
  document.getElementById("option1").textContent = options[0];
  document.getElementById("option2").textContent = options[1];
  document.getElementById("option3").textContent = options[2];
  document.getElementById("option4").textContent = options[3];
}

function checkAnswer(optionId) {
  if (score >= WINNING_SCORE) return; // Impede a seleção após o fim do jogo

  const selectedOption = document.getElementById(optionId).textContent;
  const correctState = flags[currentFlagIndex].state;

  if (selectedOption === correctState) {
    document.getElementById("result").textContent = "Acertou! Parabéns";
    score += 10; // Incrementa a pontuação em 10
    document.getElementById("score").textContent = `Pontuação: ${score}`; // Atualiza a pontuação na tela
  } else {
    document.getElementById("result").textContent =
      "Errado! Vamos para a próxima.";
  }

  currentFlagIndex = (currentFlagIndex + 1) % flags.length;
  setTimeout(() => {
    document.getElementById("result").textContent = "";
    loadFlag();
  }, 1500);
}

function endGame() {
  document.getElementById("result").textContent = "Parabéns, você venceu!";
  document.getElementById("restartButton").style.display = "block"; // Exibe o botão de reinicialização
  document.getElementById("score").textContent = `Pontuação Final: ${score}`;
}

function restartGame() {
  score = 0; // Reinicia a pontuação
  currentFlagIndex = 0; // Reinicia o índice da bandeira
  shuffle(flags); // Embaralha as bandeiras novamente
  loadFlag(); // Carrega a primeira bandeira
  document.getElementById("game").style.display = "block"; // Exibe o jogo novamente
  document.getElementById("restartButton").style.display = "none"; // Oculta o botão de reinicialização
}

window.onload = () => {
  shuffle(flags);
  loadFlag();
};
