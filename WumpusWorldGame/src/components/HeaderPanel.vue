<template>
  <header>
    <button @click="newGame">new game</button>
    <button @click="myGames">my games</button>
    <button @click="show">{{ textShow }}</button>
    <button @click="play">{{ textPlay }}</button>
    <button @click="step">step</button>
    <span class="score">score: {{ score }}</span>
  </header>
</template>

<script lang="ts">
export default {
  props:{
    score:{
      type: Number,
      required: true
    }
  },
  data() {
    return {
      textShow: 'show',
      textPlay: 'play'
    };
  },
  methods: {
    newGame() { 
      this.$emit('newGame')  
    },
    myGames() { 
      this.$emit('myGames')  
    },
    show() { 
      if (this.textShow === 'show'){
        this.textShow = 'hide'
        this.$emit('show');
      }else{
        this.textShow = 'show'
        this.$emit('hide');
      }
    },
    play() { 
      if (this.textPlay === 'play'){
        this.textPlay = 'stop'
        this.$emit('play');
      }else{
        this.textPlay = 'play'
        this.$emit('stop');
      }      
    },
    step() {
      this.$emit('step')
    },
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
  margin-left: 10px;
  font-weight: bold;
}
</style>
