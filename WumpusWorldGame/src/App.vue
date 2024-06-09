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
          :gameProps="game" 
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
import { defineComponent } from 'vue';
import HeaderPanel from './components/HeaderPanel.vue';
import GameGrid from './components/GameGrid.vue';
import ControlPanelDirection from './components/ControlPanelDirection.vue';
import ControlPanelActions from './components/ControlPanelActions.vue';
import ProbabilitiesTable from './components/ProbabilitiesTable.vue';
import { Direction } from '@/types/enums/Direction';
import { Position } from './types/Position';
import { Game } from '@/types/Game';
import { GameHandler} from '@/types/classes/GameHandler'

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
      game: {
        wumpusPosition: [2, 3] as Position,
        wumpusIsDead: false,
        pitsPositions: [
          [1, 4],
          [3, 1],
          [4, 3]
        ] as Position[],
        goldPosition: [4, 4] as Position,
        player: {
          position: [1,1] as Position,
          direction: Direction.Down,
          arrow: true
        },
        visitedCells: [] as Position[]
      } as Game,
      showStatus: false as Boolean,
      gameHandler: null as GameHandler | null,
    };
  },
  methods: {
    move(direction: Direction) {
      this.game.player.direction = direction;
    },
    go() {
      switch(this.game.player.direction){
        case Direction.Up:
          if (this.game.player.position[1] + 1 <= this.dimension) {
            this.game.player.position[1]++;
          }
          break;
        case Direction.Down:
          if (this.game.player.position[1] - 1 > 0) {
            this.game.player.position[1]--;
          }
          break;
        case Direction.Left:
          if (this.game.player.position[0] - 1 > 0) {
            this.game.player.position[0]--;
          }
          break;
        case Direction.Right:
          if (this.game.player.position[0] + 1 <= this.dimension) {
            this.game.player.position[0]++;
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
        case ' ':
          this.get();
          break;
        case 'A':
        case 'a':
          this.arrow();
          break;
      }
    },
    get() {
      console.log('get gold action')
      this.gameHandler.getGold();
    },
    arrow() {
      console.log('arrow shoot action')
      this.gameHandler.playerShootsArrow();
    },
    newGame() {
      this.gameHandler.newGame();
    },
    myGames() {
    },
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
    this.gameHandler = new GameHandler(this.game);
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
