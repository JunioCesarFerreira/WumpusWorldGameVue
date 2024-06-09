<template>
  <div class="home">
    <Header />
    <div class="game-container">
      <div class="grid-section">
        <GameGrid 
          :directionProps="direction" 
          :gameProps="game" 
          :playerPositionProps="playerPosition"
          :showProps="show"
        />
      </div>
      <div class="info-panel">
        <ControlPanelDirection @move="move" />
        <ProbabilitiesTable />
        <ControlPanelActions 
          @go="go" 
          @get="get" 
          @arrow="arrow"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import GameGrid from './components/GameGrid.vue';
import ControlPanelDirection from './components/ControlPanelDirection.vue';
import ControlPanelActions from './components/ControlPanelActions.vue';
import ProbabilitiesTable from './components/ProbabilitiesTable.vue';
import { Direction } from '@/types/enums/Direction';
import { Game, Position } from '@/types/Game';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    GameGrid,
    ControlPanelDirection,
    ProbabilitiesTable,
    ControlPanelActions,
  },
  data() {
    return {
      dimension: 4 as Number, // Dimensão do tabuleiro quadrado
      direction: Direction.Down as Direction, // Direção inicial
      playerPosition: [1,1] as Position, // Posição inicial
      game: {
        WumpusPosition: [2, 3] as Position,
        PitsPositions: [
          [1, 4],
          [2, 1],
          [4, 3]
        ] as Position[],
        GoldPosition: [4, 4] as Position,
      } as Game,
      show: false as Boolean,
    };
  },
  methods: {
    move(direction: Direction) {
      this.direction = direction;
    },
    go(){
      console.log("go", this.direction, this.playerPosition)
      switch(this.direction){
        case Direction.Up:
          if (this.playerPosition[1]+1 <= this.dimension) {
            this.playerPosition[1]++;
          }
          break;
        case Direction.Down:
          if (this.playerPosition[1]-1 > 0) {
            this.playerPosition[1]--;
          }
          break;
        case Direction.Left:
          if (this.playerPosition[0]-1 > 0) {
            this.playerPosition[0]--;
          }
          break;
        case Direction.Right:
          if (this.playerPosition[0]+1 <= this.dimension) {
            this.playerPosition[0]++;
          }
          break;
      }
    },
    get(){

    },
    arrow(){

    }
  },
  created() {
    console.log('teste', this.direction);
  },
});
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.info-panel {
  display: flex;
  flex-direction: row;
}
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}
</style>
