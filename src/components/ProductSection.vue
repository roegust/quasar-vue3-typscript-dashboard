<style lang="scss" scoped></style>

<template>
  <div v-if="$props.type === 'history'">
    <div
      class=""
      style="width: 100%"
      v-for="product in products"
      :key="product.id + product.carft"
    >
      <p class="row" style="font-size: large">
        {{ `${product.id} / ${product.name}` ?? 'Unknown Product' }} -
        {{ product.carft ? `(${product.carft})` : '' }}
      </p>
      <hr />

      <div class="row">
        <ProductCardHistory :machines="product.machines" />
      </div>
    </div>
  </div>

  <div v-if="$props.type === 'realtime'">
    <div
      class=""
      style="width: 100%"
      v-for="[productID, value] in socketItem?.cards"
      :key="productID"
    >
      <p class="row" style="font-size: large">
        {{ productID ?? 'Unknown Product' }}
      </p>
      <hr />

      <div class="row">
        <ProductCardRealtime :machines="value" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductCardHistory from './ProductCardHistory.vue';
import ProductCardRealtime from './ProductCardRealtime.vue';
import { ProductInterface } from '../store/product/state';
import { SocketInterface } from '../store/socket/state';

export default defineComponent({
  name: 'ProductSection',
  components: { ProductCardHistory, ProductCardRealtime },
  props: {
    products: Object as () => ProductInterface[],
    socketItem: Object as () => SocketInterface,
    type: String,
  },
  setup() {
    // const testArr = [...Array(Math.floor(Math.random() * 10)).keys()];
    return {};
  },
});
</script>
