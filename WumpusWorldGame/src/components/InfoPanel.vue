<template>
  <div class="info-panel">
    <div v-for="(row, rowIndex) in info" :key="rowIndex" class="row">
      <div v-for="cell in row" :key="cell.id" class="info-cell">
        <div>W={{ cell.w }}</div>
        <div>P={{ cell.p }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: [
        [{ id: 1, w: 0, p: 0 }, { id: 2, w: 0, p: 0 }, { id: 3, w: 0, p: 0 }, { id: 4, w: 0, p: 0 }],
        [{ id: 5, w: 0, p: 0 }, { id: 6, w: 0, p: 0 }, { id: 7, w: 0, p: 0 }, { id: 8, w: 0, p: 0 }],
        [{ id: 9, w: 0, p: 0 }, { id: 10, w: 0, p: 0 }, { id: 11, w: 0, p: 0 }, { id: 12, w: 0, p: 0 }],
        [{ id: 13, w: 0, p: 0 }, { id: 14, w: 0, p: 0 }, { id: 15, w: 0, p: 0 }, { id: 16, w: 0, p: 0 }],
      ],
    };
  },
};
</script>

<style>
.info-panel {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
}

.info-cell {
  flex: 1;
  border: 1px solid #000;
  min-width: 50px;
  min-height: 50px;
}
</style>
