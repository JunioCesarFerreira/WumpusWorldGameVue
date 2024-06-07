<template>
  <div class="home">
    <Header />
    <div class="game-container">
      <div class="grid-section">
        <GameGrid :directionProps="direction" />
      </div>
      <div class="info-panel">
        <ControlPanelDirection @move="move" />
        <InfoPanel />
        <ControlPanelActions />
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
import InfoPanel from './components/InfoPanel.vue';
import { Direction } from '@/types/enums/Direction';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    GameGrid,
    ControlPanelDirection,
    InfoPanel,
    ControlPanelActions,
  },
  data() {
    return {
      direction: Direction.Up as Direction,
    };
  },
  methods: {
    move(direction: Direction) {
      this.direction = direction;
    },
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
