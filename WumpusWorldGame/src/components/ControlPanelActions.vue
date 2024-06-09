<template>
    <div class="control-panel">
      <div class="buttons-container">
        <div class="action-buttons">
          <button @click="$emit('go')">Go</button>
          <button @click="$emit('get')">Get</button>
          <button @click="$emit('arrow')">Arrow</button>
        </div>
      </div>
    </div>
  </template>
    
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
  