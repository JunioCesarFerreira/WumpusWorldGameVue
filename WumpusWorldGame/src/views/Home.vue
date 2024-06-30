<template>
  <div class="home">
    <HeaderPanel 
      @newGame="newGame"
      @myGames="myGames"
      @show="show" @hide="hide"
      @play="play" @stop="stop"
      @step="step"
      :score="game.score"
    />
    <div class="game-container">
      <div class="grid-section">
        <GameGrid 
          :gameProps="game" 
          :showProps="showStatus"
        />
        <label v-show="alertMessage.visible" class="label-alert">{{ alertMessage.text }}</label>
      </div>
      <div class="info-panel">
        <ControlPanelDirection @move="move" />
        <ProbabilitiesTable 
          :wumpusProbDist="wumpusProbDist"
          :pitsProbDist="pitsProbDist"
        />
        <ControlPanelActions 
          @go="go" 
          @get="get" 
          @arrow="arrow"
          :wumpusScreem="game.wumpusIsDead"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderPanel from '@/components/HeaderPanel.vue';
import GameGrid from '@/components/GameGrid.vue';
import ControlPanelDirection from '@/components/ControlPanelDirection.vue';
import ControlPanelActions from '@/components/ControlPanelActions.vue';
import ProbabilitiesTable from '@/components/ProbabilitiesTable.vue';

import { Direction } from '@/types/enums/Direction';
import { Position } from '@/types/Position';
import { Game } from '@/types/Game';

import { GameHandler} from '@/classes/GameHandler'
import { HazardProbabilityDistribution} from '@/classes/HazardProbabilityDistribution'
import { FavoriteGamesHandler } from '@/classes/FavoriteGamesHandler';
import { SmartAgent } from '@/classes/SmartAgent';

interface AlertMessage{
  visible: boolean,
  text: string
}

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
        score: 0,
        wumpusPosition: [1, 2] as Position,
        wumpusIsDead: false,
        pitsPositions: [
          [0, 3],
          [2, 0],
          [3, 2]
        ] as Position[],
        goldPosition: [3, 3] as Position,
        player: {
          position: [0, 0] as Position,
          direction: Direction.Down,
          arrow: true
        },
        visitedCells: [] as Position[]
      } as Game,
      
      showStatus: false as boolean,

      alertMessage: { visible: false, text: "" } as AlertMessage,

      gameHandler: null as GameHandler | null,
      favoriteGames: null as FavoriteGamesHandler | null,
      hazerdProbDistribution: null as HazardProbabilityDistribution | null,
      smartAgent: null as SmartAgent | null,

      wumpusProbDist: [] as number[][],
      pitsProbDist: [] as number[][]
    };
  },
  methods: {
    handleKeydown(event: KeyboardEvent) {
      switch(event.key) {
        case 'ArrowUp':
          this.move(Direction.Up)
          break;
        case 'ArrowDown':
          this.move(Direction.Down)
          break;
        case 'ArrowLeft':
          this.move(Direction.Left)
          break;
        case 'ArrowRight':
          this.move(Direction.Right)
          break;
        case 'Enter':
          this.go()
          break;
        case ' ':
          this.get()
          break;
        case 'A':
        case 'a':
          this.arrow()
          break;
      }
    },
    move(direction: Direction){
      console.log('move direction action')
      this.gameHandler.move(direction)
    },
    go() {
      console.log('move player action')
      let result = this.gameHandler.go()
      if (result != 'safe') {
        this.alertMessage.text = result
        this.alertMessage.visible = true
      }
      console.log('result movement:', result)
      this.wumpusProbDist = this.hazerdProbDistribution.calculateWumpusProbabilities()
      this.pitsProbDist = this.hazerdProbDistribution.calculatePitsProbabilities()
    },
    get() {
      console.log('get gold action')
      this.gameHandler.getGold()
    },
    arrow() {
      console.log('arrow shoot action')
      this.gameHandler.playerShootsArrow()
    },
    newGame() {
      this.gameHandler.newGame()
      this.alertMessage.visible = false
      this.updatePrababilities()
    },
    myGames() {
      this.favoriteGames.next();
      this.alertMessage.visible = false
      this.updatePrababilities()
    },
    show() {
      this.showStatus = true
    },
    hide() {
      this.showStatus = false
    },
    play() {},
    stop() {},
    step() {
      this.smartAgent.step()
      this.updatePrababilities()
    },
    updatePrababilities(){
      this.wumpusProbDist = this.hazerdProbDistribution.calculateWumpusProbabilities()
      this.pitsProbDist = this.hazerdProbDistribution.calculatePitsProbabilities()
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown)
    this.gameHandler = new GameHandler(this.game)
    this.favoriteGames = new FavoriteGamesHandler(this.game)
    this.hazerdProbDistribution = new HazardProbabilityDistribution(this.game, this.dimension)
    this.smartAgent = new SmartAgent(this.game, this.gameHandler, this.hazerdProbDistribution)
    this.updatePrababilities()
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown)
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
.label-alert {
  display: flex;
  flex-direction: column;
  color: red;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-shadow: 1px 1px 2px black;
  z-index: 3;
}
</style>@/classes/GameHandler@/classes/HazardProbabilityDistribution
