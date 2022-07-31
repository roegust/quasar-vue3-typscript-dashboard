<style lang="scss" scoped>
  .row{
    padding-top: 1em;
  }
</style>

<template>
  <div
    class=""
    style="width: 100%"
    v-for="product in products"
    :key="product.name + product.carft"
  >
    <p style="padding-left: 15px; font-size: large;">
    {{ product.name ?? 'Unknown Product' }}
    </p> 
    <hr/>
    {{ product.carft ? `(${product.carft})` : '' }}
  
 
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
  },
  setup() {
    // const testArr = [...Array(Math.floor(Math.random() * 10)).keys()];
    return {};
  },
});
</script>
