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
import { defineComponent, PropType } from 'vue'
import player_down_img from '@/assets/images/player_down.png'
import player_up_img from '@/assets/images/player_up.png'
import player_left_img from '@/assets/images/player_left.png'
import player_right_img from '@/assets/images/player_right.png'
import wumpus_img from '@/assets/images/wumpus.png'
import gold_img from '@/assets/images/gold.png'
import black_block_img from '@/assets/images/black_block.png'
import transparent_block_img from '@/assets/images/transparent_block.png'
import brown_block_img from '@/assets/images/brown_block.png'
import { Direction } from '@/types/enums/Direction'
import { Game, Position, arePositionsEqual, isPositionInArray } from '@/types/Game';

interface Cell {
  id: Position;
}

export default defineComponent({
  props:{
    directionProps: {
      type: Number as () => Direction,
      required: true
    },
    playerPositionProps:{
      type: Object as PropType<Position>,
      required: true
    },
    gameProps: {
      type: Object as PropType<Game>,
      required: true
    },
    showProps: {
      type: Boolean,
      default: false,
      required: true,
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
      wumpusPosition: [2,3] as Position,
      pitsPositions: [[1,4],[3,1],[4,3]] as Position[],
      goldPosition: [4,4] as Position,
      visitedCells: [[1,1]] as Position[] // Lista para armazenar as células visitadas
    };
  },
  methods: {
    getImgForCell(pos: Position) {
      if (arePositionsEqual(pos, this.playerPositionProps)) {
        switch (this.direction) {
            case Direction.Up:
                return player_up_img
            case Direction.Down:
                return player_down_img
            case Direction.Left:
                return player_left_img
            case Direction.Right:
                return player_right_img
        }
      } else if (this.showProps) {
        if (arePositionsEqual(pos, this.wumpusPosition)){
          return wumpus_img;
        } else if (arePositionsEqual(pos, this.goldPosition)){
          return gold_img;
        } else if (isPositionInArray(pos, this.pitsPositions)){
          return black_block_img;
        } else {
          return transparent_block_img; 
        }
      } else {
        if (isPositionInArray(pos, this.visitedCells)){
          return transparent_block_img;
        }else {
          return brown_block_img;
        }
      }
    },
    getWarningTextForCell(id: Position) {
      return "";
    }
  },
  watch:{
    directionProps:{
      handler(newValue: Direction){
        console.log('watch directionProps:', newValue)
        this.direction = newValue
      }
    },
    playerPositionProps:{
      handler(newValue: Position){
        console.log("watch playerPositionProps visitedCells", this.visitedCells)
        // Atualiza a lista de células visitadas quando a posição do jogador mudar
        if (!isPositionInArray(newValue, this.visitedCells)) {
          const pos = {...newValue} as Position;
          this.visitedCells.push(pos);
        }
        console.log("watch playerPositionProps visitedCells", this.visitedCells)
      },
      deep: true
    },
    gameProps:{
      handler(newValue: Game){
        console.log('watch gameProps:',newValue)
        this.wumpusPosition = newValue.WumpusPosition
        this.pitsPosition = newValue.PitsPositions
        this.goldPosition = newValue.GoldPosition
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
  border: 1px solid #8b8b8b;
  min-width: 50px;
  min-height: 50px;
}
.cell {
  position: relative;
  display: flex;
  background-color: #202020;
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