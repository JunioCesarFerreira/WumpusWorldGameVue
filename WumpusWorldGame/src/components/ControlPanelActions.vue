<template>
    <div class="control-panel">
      <div class="buttons-container">
        <div class="action-buttons">
          <button @click="go">Go</button>
          <button @click="get">Get</button>
          <button @click="arrow">Arrow</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    methods: {
      go() {
        this.$emit('go');
      },
      get() {
        this.$emit('get');
      },
      arrow() {
        this.$emit('arrow');
      },
    },
  });
  </script>
  
  <style>
  .control-panel {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  
  .buttons-container {
    display: flex;
    gap: 20px;
  }
  
  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  button {
    padding: 10px;
  }
  </style>
  