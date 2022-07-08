<template>
  <q-page>
    <div class="row" style="margin-left: 5%; margin-right: 5%">
      <div class="col-md-4">
        <div class="col-md-1">
          <q-btn
            type="submit"
            size="md"
            color="primary"
            v-on:click="btnExport()"
          >
            <q-icon center name="fa-solid fa-magnifying-glass" />
          </q-btn>
        </div>
      </div>
      <SearchBar class="col-md-8" />
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
    const btnExport = () => ({});
    return { store, btnExport };
  },
});
</script>
