<template>
  <div class="control-panel">
    <div class="buttons-container">
      <div class="movement-buttons">
        <button @click="move('up')" class="direction-button">↑</button>
        <button @click="move('left')" class="direction-button">←</button>
        <button @click="move('down')" class="direction-button">↓</button>
        <button @click="move('right')" class="direction-button">→</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Direction } from '../types/enums/Direction';

export default defineComponent({
  methods: {
    move(direction: string) {
      let output = Direction.Down;
      switch (direction) {
        case 'up':
          output = Direction.Up;
          break;
        case 'down':
          output = Direction.Down;
          break;
        case 'left':
          output = Direction.Left;
          break;
        case 'right':
          output = Direction.Right;
          break;
      }
      this.$emit('move', output);
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
