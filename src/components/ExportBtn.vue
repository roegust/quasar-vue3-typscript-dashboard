<template>
  <q-btn label="Export" size="sm" color="teal-9" v-on:click="ExportExcel(data)">
    <q-icon center name="fa-solid fa-file-arrow-down" />
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
