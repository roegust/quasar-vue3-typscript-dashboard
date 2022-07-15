<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="background-color: #127369">
        <!-- <q-btn
          flat
          dense
          round
          icon=""
          aria-label="Menu"
          @click="toggleLeftDrawer"
        /> -->
        <!-- <div class="row">
            <q-img src="../assets/logo.svg" fit="fill" />
        </div> -->
        <q-icon name="img:src/assets/logo.svg" size="lg" />

        <q-toolbar-title> 勤美化新 </q-toolbar-title>
        <div class="row">
          <div class="col-md-12 offset-1">
            {{ date }}
          </div>
          <div class="col-md-12 offset-4">
            {{ time }}
          </div>
        </div>

        <div>
          <q-btn-toggle
            v-model="isRawData"
            size="md"
            style="background-color: #637371"
            toggle-color="teal-9"
            :options="[
              { label: '圖表', value: false },
              { label: '表單', value: true },
            ]"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container style="background-color: #bfbfbf">
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
        time.value = unix.format('HH : mm : ss ');
      }, 1000);
    };

    watch(
      () => isRawData.value,
      (cur) => {
        store.commit('pageInfoModule/rawDataVisible', cur);
      },
    );

    // newDateTime();

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
