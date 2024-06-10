<template>
  <div class="game-grid">
    <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
      <div v-for="cell in row" :key="`${cell.id[0]}-${cell.id[1]}`" class="col p-1">
        <div class="cell">
          <img :src="getImgForCell(cell.id)" alt="Cell Image" class="base-image">
          <img v-if="shouldOverlayPlayer(cell.id)" :src="getPlayerImg()" alt="Player Image" class="overlay-image">
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
import dead_wumpus_img from '@/assets/images/dead_wumpus.png'
import gold_img from '@/assets/images/gold.png'
import black_block_img from '@/assets/images/black_block.png'
import transparent_block_img from '@/assets/images/transparent_block.png'
import brown_block_img from '@/assets/images/brown_block.png'
import { Direction } from '@/types/enums/Direction'
import { Game } from '@/types/Game';
import { Position, arePositionsEqual, isPositionInArray, getAdjacentCells } from '@/types/Position'

interface Cell {
  id: Position;
}

export default defineComponent({
  props: {
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
        [{ id: [0, 3] }, { id: [1, 3] }, { id: [2, 3] }, { id: [3, 3] }],
        [{ id: [0, 2] }, { id: [1, 2] }, { id: [2, 2] }, { id: [3, 2] }],
        [{ id: [0, 1] }, { id: [1, 1] }, { id: [2, 1] }, { id: [3, 1] }],
        [{ id: [0, 0] }, { id: [1, 0] }, { id: [2, 0] }, { id: [3, 0] }],
      ] as Cell[][],
      visitedCells: [[1, 1]] as Position[] // Lista para armazenar as células visitadas
    };
  },
  methods: {
    getImgForCell(pos: Position) {
      if (this.showProps || isPositionInArray(pos, this.gameProps.visitedCells)) {  
        if (arePositionsEqual(pos, this.gameProps.wumpusPosition)) {
          if (this.gameProps.wumpusIsDead){
            return dead_wumpus_img;
          } else {
            return wumpus_img;
          }
        } else if (arePositionsEqual(pos, this.gameProps.goldPosition) && !this.gameProps.player.gold) {
          return gold_img;
        } else if (isPositionInArray(pos, this.gameProps.pitsPositions)) {
          return black_block_img;
        } else {
          return transparent_block_img;
        }
      } else {
        return brown_block_img;
      }
    },
    shouldOverlayPlayer(pos: Position) {
      return arePositionsEqual(pos, this.gameProps.player.position);
    },
    getPlayerImg() {
      switch (this.gameProps.player.direction) {
        case Direction.Up:
          return player_up_img;
        case Direction.Down:
          return player_down_img;
        case Direction.Left:
          return player_left_img;
        case Direction.Right:
          return player_right_img;
        default:
          return player_down_img;
      }
    },
    getWarningTextForCell(pos: Position): string {
      // Retorna indicadores de perigo quando célula é visitada ou está em modo de apresentação
      if (isPositionInArray(pos, this.gameProps.visitedCells) || this.showProps){
        let stench = isPositionInArray(pos, getAdjacentCells([this.gameProps.wumpusPosition], 4))
        let breeze = isPositionInArray(pos, getAdjacentCells(this.gameProps.pitsPositions, 4))
        if (stench && breeze){
          return "stench\nbreeze"
        }else if (stench){
          return "stench"
        }else if (breeze){
          return "breeze"
        }
      }
      return ""
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
.base-image {
  position: relative;
  z-index: 1;
}
.overlay-image {
  position: absolute;
  width: 80px;
  height: 80px;
  object-fit: scale-down;
  z-index: 2;
}
.overlay-text {
  position: absolute;
  color: white;
  font-size: 16px;
  text-align: center;
  text-shadow: 1px 1px 2px black;
  z-index: 3;
}
</style>
