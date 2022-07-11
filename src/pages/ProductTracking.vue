<template>
  <q-page>
    <div class="row" style="margin-left: 5%; margin-right: 5%">
      <SearchBar />
    </div>
    <div style="margin-left: 8%; margin-right: 5%">
      <ProductSection :products="store.state.productsModule.products" />
    </div>
    <div style="margin-left: 8%; margin-right: 5%">
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
