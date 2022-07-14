<template>
  <div
    class="q-pa-md"
    style="width: 100%"
    v-for="product in products"
    :key="product.name + product.carft"
  >
    <div class="row q-pa-md">
      <q-card style="background: #00695c" class="text-white text-bold">
        <q-card-section>
          {{ product.name ?? 'Unknown Product' }}
          {{ product.carft ? `(${product.carft})` : '' }}
        </q-card-section>
      </q-card>
    </div>
    <div class="row">
      <ProductCard :machines="product.machines" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductCard from 'src/components/ProductCard.vue';
import { ProductInterface } from '../store/product/state';

export default defineComponent({
  name: 'ProductSection',
  components: { ProductCard },
  props: {
    products: Object as () => ProductInterface[],
  },
  setup() {
    // const testArr = [...Array(Math.floor(Math.random() * 10)).keys()];
    return {};
  },
});
</script>
