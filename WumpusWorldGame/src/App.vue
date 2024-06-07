<template>
  <div class="home">
    <Header />
    <div class="game-container">
      <div class="grid-section">
        <GameGrid :directionProps="direction" />
      </div>
      <div class="info-panel">
        <InfoPanel />
      </div>
      <div class="control-info-section">
        <ControlPanel @move="move" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import GameGrid from './components/GameGrid.vue';
import ControlPanel from './components/ControlPanel.vue';
import InfoPanel from './components/InfoPanel.vue';
import { Direction } from '@/types/enums/Direction';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    GameGrid,
    ControlPanel,
    InfoPanel,
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
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}
</style>
