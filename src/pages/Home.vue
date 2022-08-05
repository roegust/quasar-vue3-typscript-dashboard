<template>
  <q-page>
    <q-btn color="primary" label="Realtime" @click="btnRealTime" />
    <q-btn color="primary" label="History" @click="btnHistory" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HomePage',
  components: {},
  setup() {
    const router = useRouter();

    const btnRealTime = () => {
      router.push('/tracking/realtime');
    };

    const btnHistory = () => {
      router.push('/tracking/history');
    };

    return { btnRealTime, btnHistory };
  },
});
</script>
