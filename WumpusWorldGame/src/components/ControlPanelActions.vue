<template>
  <div class="control-panel">
    <div class="buttons-container">
      <div class="action-buttons">
        <button @click="$emit('go')">Go</button>
        <button @click="$emit('get')">Get</button>
        <button @click="$emit('arrow')">Arrow</button>
        <label v-show="wumpusScreem" class="label">screamed</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props:{
    wumpusScreem:{
      type: Boolean,
      default: false,
      required: true
    }
  }
};
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

.label {
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 16px;
  text-align: center;
  text-shadow: 1px 1px 2px black;
  z-index: 3;
}

button {
  padding: 10px;
}
</style>
  