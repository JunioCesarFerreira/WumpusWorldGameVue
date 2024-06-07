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
        // lógica para go
        this.$emit('action', 'go');
      },
      get() {
        // lógica para get
        this.$emit('action', 'get');
      },
      arrow() {
        // lógica para usar arrow
        this.$emit('action', 'arrow');
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
  