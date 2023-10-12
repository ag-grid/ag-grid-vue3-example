<template>
  <ag-grid-vue
      :columnDefs="columnDefs"
      :modules="modules"
      :rowData="rowData"
      :groupHeaders="true"
      :defaultColDef="defaultColDef"
      class="ag-theme-alpine"
      style="flex: 1 1 auto; height: 240px"
  >
  </ag-grid-vue>
</template>

<script setup>
import {ref} from 'vue';
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {AgGridVue} from "@ag-grid-community/vue3";

import CellComponentRenderer from "./CellComponentRenderer.vue"
import CellComponentEditor from "./CellComponentEditor.vue"
import DateComponent from "./DateComponent.vue"
import HeaderGroupComponent from "./HeaderGroupComponent.vue"

const modules = ref([ClientSideRowModelModule]);

const defaultColDef = {
  flex: 1
}

const columnDefs = ref([
  {
    headerName: 'Expand Me',
    headerGroupComponent: "HeaderGroupComponent",
    children: [
      {field: "make", cellRenderer: 'CellComponentRenderer', editable: true, cellEditor: 'CellComponentEditor'},
      {field: "model"},
      {field: "price"},
      {field: "manufactured", filter: 'agDateColumnFilter', columnGroupShow: 'open'}
    ]
  }
]);

const rowData = ref([
  {make: "Toyota", model: "Celica", price: 35000, "manufactured": new Date(2000, 0, 1)},
  {make: "Ford", model: "Mondeo", price: 32000, "manufactured": new Date(2001, 1, 2),},
  {make: "Porsche", model: "Boxster", price: 72000, "manufactured": new Date(2002, 2, 3)},
]);

defineExpose({CellComponentRenderer, CellComponentEditor, "agDateInput": DateComponent, HeaderGroupComponent})

</script>
