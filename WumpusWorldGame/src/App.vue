<template>
  <div class="home">
    <HeaderPanel 
      @newGame="newGame"
      @myGames="myGames"
      @show="show" @hide="hide"
      @play="play" @stop="stop"
      @step="step"
    />
    <div class="game-container">
      <div class="grid-section">
        <GameGrid 
          :directionProps="direction" 
          :gameProps="game" 
          :playerPositionProps="playerPosition"
          :showProps="showStatus"
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
import { defineComponent, onMounted, onBeforeUnmount } from 'vue';
import HeaderPanel from './components/HeaderPanel.vue';
import GameGrid from './components/GameGrid.vue';
import ControlPanelDirection from './components/ControlPanelDirection.vue';
import ControlPanelActions from './components/ControlPanelActions.vue';
import ProbabilitiesTable from './components/ProbabilitiesTable.vue';
import { Direction } from '@/types/enums/Direction';
import { Game, Position } from '@/types/Game';

export default defineComponent({
  name: 'App',
  components: {
    HeaderPanel,
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
      showStatus: false as Boolean,
    };
  },
  methods: {
    move(direction: Direction) {
      this.direction = direction;
    },
    go() {
      switch(this.direction){
        case Direction.Up:
          if (this.playerPosition[1] + 1 <= this.dimension) {
            this.playerPosition[1]++;
          }
          break;
        case Direction.Down:
          if (this.playerPosition[1] - 1 > 0) {
            this.playerPosition[1]--;
          }
          break;
        case Direction.Left:
          if (this.playerPosition[0] - 1 > 0) {
            this.playerPosition[0]--;
          }
          break;
        case Direction.Right:
          if (this.playerPosition[0] + 1 <= this.dimension) {
            this.playerPosition[0]++;
          }
          break;
      }
    },
    handleKeydown(event: KeyboardEvent) {
      switch(event.key) {
        case 'ArrowUp':
          this.move(Direction.Up);
          break;
        case 'ArrowDown':
          this.move(Direction.Down);
          break;
        case 'ArrowLeft':
          this.move(Direction.Left);
          break;
        case 'ArrowRight':
          this.move(Direction.Right);
          break;
        case 'Enter':
          this.go();
          break;
        case 'Space':
          this.get();
          break;
        case 'A':
          this.arrow();
          break;
      }
    },
    get() {},
    arrow() {},
    newGame() {},
    myGames() {},
    show() {
      this.showStatus = true;
    },
    hide() {
      this.showStatus = false;
    },
    play() {},
    stop() {},
    step() {}
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
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
