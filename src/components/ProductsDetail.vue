<template>
  <q-table :rows="rawData" row-key="sn" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ProductProcessRecord } from '../store/product/state';

export default defineComponent({
  name: 'ProductsDetail',
  props: {
    rawData: Object as () => ProductProcessRecord[],
  },
  setup() {
    // const testArr = [...Array(Math.floor(Math.random() * 10)).keys()];
    return {};
  },
});
</script>
