<template>
  <q-page>
    <div class="row">
      <SearchBarRealtime />
    </div>
    <div v-if="!store.state.pageInfoModule.isRawData">
      <ProductSection :socketItem="store.state.socketModule" type="realtime" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'src/store';
import ProductSection from '../components/ProductSection.vue';
import SearchBarRealtime from '../components/SearchBarRealtime.vue';

export default defineComponent({
  name: 'ProductTracking',
  components: { ProductSection, SearchBarRealtime },
  setup() {
    const store = useStore();

    return { store };
  },
});
</script>
