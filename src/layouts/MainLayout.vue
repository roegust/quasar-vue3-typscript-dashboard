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
        <div class="row">
          <div class="col-md-12 item-center">
            {{ date }}
          </div>
          <div class="col-md-6 item-right justify-end">
            {{ time }}
          </div>
        </div>

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
import { defineComponent, ref, watch, onBeforeMount } from 'vue';
import { useStore } from 'src/store';
import moment from 'moment';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const isRawData = ref(false);
    const store = useStore();
    const date = ref('');
    const time = ref('');

    const newDateTime = () => {
      setInterval(() => {
        const unix = moment();
        date.value = unix.format('YYYY 年 MM 月 DD 日');
        time.value = unix.format('hh : mm : ss ');
      }, 1000);
    };

    watch(
      () => isRawData.value,
      (cur) => {
        store.commit('pageInfoModule/rawDataVisible', cur);
      },
    );

    newDateTime();

    onBeforeMount(() => {
      newDateTime();
    });

    return {
      // essentialLinks: linksList,
      isRawData,
      date,
      time,
    };
  },
});
</script>
