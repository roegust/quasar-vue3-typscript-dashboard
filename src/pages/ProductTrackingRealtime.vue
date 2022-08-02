<template>
  <q-page>
    <div class="row" style="margin-left: 5%; margin-right: 5%">
      <SearchBarRealtime />
    </div>
    <div v-if="!store.state.pageInfoModule.isRawData">
      <ProductSection :products="store.state.productsModule.products" />
    </div>
    <div
      v-if="store.state.pageInfoModule.isRawData"
      style="margin-left: 3%; margin-right: 3%"
    >
      <ProductsDetail :rawData="store.state.productsModule.rawData" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'src/store';
import ProductSection from '../components/ProductSection.vue';
import SearchBarRealtime from '../components/SearchBarRealtime.vue';
import ProductsDetail from '../components/ProductsDetail.vue';

export default defineComponent({
  name: 'ProductTracking',
  components: { ProductSection, SearchBarRealtime, ProductsDetail },
  setup() {
    const store = useStore();

    return { store };
  },
});
</script>
