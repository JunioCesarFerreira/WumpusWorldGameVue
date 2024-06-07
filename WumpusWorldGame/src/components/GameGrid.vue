<template>
  <div class="game-grid">
    <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
      <div v-for="cell in row" :key="`${cell.id[0]}-${cell.id[1]}`" class="col p-1">
        <div class="cell">
          <img :src="getImgForCell(cell.id)" alt="Cell Image">
          <div class="overlay-text">{{ getWarningTextForCell(cell.id) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import player_down from '@/assets/images/player_down.png'
import player_up from '@/assets/images/player_up.png'
import player_left from '@/assets/images/player_left.png'
import player_right from '@/assets/images/player_right.png'
import wumpus from '@/assets/images/wumpus.png'
import brown_block from '@/assets/images/brown_block.png'
import { Direction } from '@/types/enums/Direction'

interface Cell {
  id: [number, number];
}

export default defineComponent({
  props:{
    directionProps: {
      type: Number as () => Direction,
      required: true
    }
  },
  data() {
    return {
      grid: [
        [{ id: [1, 4] }, { id: [2, 4] }, { id: [3, 4] }, { id: [4, 4] }],
        [{ id: [1, 3] }, { id: [2, 3] }, { id: [3, 3] }, { id: [4, 3] }],
        [{ id: [1, 2] }, { id: [2, 2] }, { id: [3, 2] }, { id: [4, 2] }],
        [{ id: [1, 1] }, { id: [2, 1] }, { id: [3, 1] }, { id: [4, 1] }],
      ] as Cell[][],
      direction: Direction.Down,
      scopeCell: [1,1] as [number,number],
    };
  },
  methods: {
    getImgForCell(id: [number, number]) {
      if (id[0] === this.scopeCell[0] && id[1] === this.scopeCell[1]) {
        switch (this.direction) {
            case Direction.Up:
                return player_up
            case Direction.Down:
                return player_down
            case Direction.Left:
                return player_left
            case Direction.Right:
                return player_right
        }
      } else {
        return brown_block;
      }
    },
    getWarningTextForCell(id: [number, number]) {
      if (id[0] === 2 && id[1] === 2) {
        return "breeze";
      } else {
        return "";
      }
    }
  },
  watch:{
    directionProps:{
      handler(newVal){
        console.log('watch directionProps:',newVal)
        this.direction = newVal
      }
    }
  }
});
</script>

<style>
.game-grid {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
}
.col {
  flex: 1;
  border: 1px solid #000;
  min-width: 50px;
  min-height: 50px;
}
.cell {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cell img {
  width: 80px; /* Define a largura fixa */
  height: 80px; /* Define a altura fixa */
  object-fit: scale-down; /* Ajusta a imagem para cobrir completamente o espaço, preservando a proporção */
}
.overlay-text {
  position: absolute;
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-shadow: 1px 1px 2px black;
}
</style>