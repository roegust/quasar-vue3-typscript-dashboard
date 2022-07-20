<template>
  <q-table
    :rows="rawData"
    row-key="sn"
    :rows-per-page-options="pages"
    style="background-color: #f2f2f2"
  />
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
    const pages = [10, 20, 30];
    // const testArr = [...Array(Math.floor(Math.random() * 10)).keys()];
    return { pages };
  },
});
</script>
