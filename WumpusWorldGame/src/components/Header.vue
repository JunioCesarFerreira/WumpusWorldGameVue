<template>
  <header>
    <button @click="newGame">new game</button>
    <button @click="myGames">my games</button>
    <button @click="show">show</button>
    <button @click="play">play</button>
    <button @click="step">step</button>
    <span class="score">score: {{ score }}</span>
  </header>
</template>

<script>
export default {
  data() {
    return {
      score: 0,
    };
  },
  methods: {
    newGame() { /* lógica do novo jogo */ },
    myGames() { /* lógica para meus jogos */ },
    show() { /* lógica para mostrar algo */ },
    play() { /* lógica para jogar */ },
    step() { /* lógica para avançar um passo */ },
  },
};
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
  margin: 5px;
}
.score {
  font-weight: bold;
}
</style>
