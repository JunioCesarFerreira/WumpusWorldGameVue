<template>
  <div class="home">
    <Header />
    <div class="game-container">
      <div class="grid-section">
        <GameGrid />
      </div>
      <div class="info-panel">
        <InfoPanel />
      </div>
      <div class="control-info-section">
        <ControlPanel />
      </div>
    </div>
  </div>
</template>
  
  <script>
  import Header from '@/components/Header.vue';
  import GameGrid from '@/components/GameGrid.vue';
  import ControlPanel from '@/components/ControlPanel.vue';
  import InfoPanel from '@/components/InfoPanel.vue';
  
  export default {
    name: 'Home',
    components: {
      Header,
      GameGrid,
      ControlPanel,
      InfoPanel,
    },
  };
  </script>
  
  <style>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .game-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
  }
  
  .grid-section {
    flex: 2;
  }
  
  .control-info-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  </style>
  