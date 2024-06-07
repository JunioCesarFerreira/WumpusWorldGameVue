<template>
  <div class="info-panel">
    <table>
      <tbody>
        <tr v-for="(row, rowIndex) in info" :key="rowIndex">
          <td v-for="cell in row" :key="cell.id">
            <div>W={{ cell.w }}</div>
            <div>P={{ cell.p }}</div>
          </td>
        </tr>
      </tbody>
    </table>
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
  margin: 20px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}
</style>
