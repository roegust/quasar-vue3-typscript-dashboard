<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-blue-5">
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        /> -->

        <q-toolbar-title> 預想車間顯示 </q-toolbar-title>

        <div>
          <q-btn-toggle
            v-model="isRawData"
            size="md"
            toggle-color="primary"
            color="white"
            text-color="primary"
            :options="[
              { label: '圖表', value: false },
              { label: '表單', value: true },
            ]"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered> </q-drawer> -->
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const isRawData = ref(false);

    return {
      // essentialLinks: linksList,
      isRawData,
    };
  },
});
</script>
