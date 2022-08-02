<style lang="scss" scoped>

</style>

<template>
  <div
    class=""
    style="width: 100%"
    v-for="product in products"
    :key="product.name + product.carft"
  >
    <p class="row" style="font-size: large">
      {{ `${product.id} / ${product.name}` ?? 'Unknown Product' }}
    </p>
    <hr />
    <p class="row" style="font-size: large">
      {{ product.carft ? `(${product.carft})` : '' }}
    </p>

    <!-- <div class="row q-pa-md">
      <q-card style="background: #3f51b5" class="text-white text-bold">
        <q-card-section >
          {{ product.name ?? 'Unknown Product' }}
          {{ product.carft ? `(${product.carft})` : '' }}
        </q-card-section>
      </q-card>
    </div> -->

    <div class="row">
      <ProductCard :machines="product.machines" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductCard from './ProductCard.vue';
import { ProductInterface } from '../store/product/state';

export default defineComponent({
  name: 'ProductSection',
  components: { ProductCard },
  props: {
    products: Object as () => ProductInterface[],
    type: String,
  },
  setup() {
    // const testArr = [...Array(Math.floor(Math.random() * 10)).keys()];
    return {};
  },
});
</script>
