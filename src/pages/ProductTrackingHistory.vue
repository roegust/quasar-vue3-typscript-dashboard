<template>
  <q-page>
    <div class="row">
      <SearchBar />
    </div>
    <div v-if="!store.state.pageInfoModule.isRawData">
      <ProductSection
        :products="store.state.productsModule.products"
        type="history"
      />
    </div>
    <div v-if="store.state.pageInfoModule.isRawData">
      <ProductsDetail :rawData="store.state.productsModule.rawData" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'src/store';
import ProductSection from '../components/ProductSection.vue';
import SearchBar from '../components/SearchBar.vue';
import ProductsDetail from '../components/ProductsDetail.vue';

export default defineComponent({
  name: 'ProductTracking',
  components: { ProductSection, SearchBar, ProductsDetail },
  setup() {
    const store = useStore();

    return { store };
  },
});
</script>
