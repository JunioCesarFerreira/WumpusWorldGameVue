<template>
  <div class="info-panel">
    <table>
      <tbody>
        <tr v-for="(row, rowIndex) in wumpusProbDist" :key="rowIndex">
          <td v-for="(wumpusProb, colIndex) in row" :key="colIndex">
            <!-- Mapeamento invertido linha coluna para carteziano (X,Y) -->
            <div>W={{ wumpusProbDist[colIndex][3-rowIndex].toFixed(2) }}</div>
            <div>P={{ pitsProbDist[colIndex][3-rowIndex].toFixed(2) }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    wumpusProbDist: {
      type: Array as () => number[][],
      required: true,
    },
    pitsProbDist: {
      type: Array as () => number[][],
      required: true,
    },
  },
};
</script>

<style>
.info-panel {
  margin: 10px;
  overflow-x: auto;
}

table {
  width: 90%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
</style>
