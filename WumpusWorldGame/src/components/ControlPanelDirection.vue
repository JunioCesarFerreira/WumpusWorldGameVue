<template>
  <div class="control-panel">
    <div class="buttons-container">
      <div class="movement-buttons">
        <button @click="move(Direction.Up)" class="direction-button">↑</button>
        <button @click="move(Direction.Left)" class="direction-button">←</button>
        <button @click="move(Direction.Down)" class="direction-button">↓</button>
        <button @click="move(Direction.Right)" class="direction-button">→</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Direction } from '../types/enums/Direction';

export default defineComponent({
  data() {
    return {
      Direction
    };
  },
  methods: {
    move(direction: Direction) {
      console.log('button direction:', direction)
      this.$emit('move', direction);
    },
  },
});
</script>

<style>
.control-panel {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.buttons-container {
  display: flex;
  gap: 20px;
}
.movement-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
}
.movement-buttons button:nth-child(1) {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}
.movement-buttons button:nth-child(2) {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}
.movement-buttons button:nth-child(3) {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
}
.movement-buttons button:nth-child(4) {
  grid-column: 3 / 4;
  grid-row: 2 / 3;
}
.direction-button {
  width: 50px; /* Defina uma largura fixa */
  height: 50px; /* Defina uma altura fixa */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-weight: bold; /* Torna o texto em negrito */
  font-size: 20px; /* Ajusta o tamanho da fonte, se necessário */
}
</style>
