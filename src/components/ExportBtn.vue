<template>
  <q-btn 
  disable="false"
    padding="8px"
    unelevated rounded 
    label="匯出" 
    size="13px" 
    style="width: 100px" color="primary" v-on:click="ExportExcel(data)">
    <q-icon center name="download" />
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ExportExcel from '../service/ExportExcel';

export default defineComponent({
  name: 'ExportBtn',
  props: {
    data: Object as <T>() => Array<T>,
  },
  setup() {
    return { ExportExcel };
  },
});
</script>

