<style>
  .background{
    background: linear-gradient(90deg,#b8b8b8,white 50%,#b8b8b8);
    display: flex;
    justify-content: flex-start;
  }
</style>

<template>
  <div class="q-pa-none">
    <q-layout view="lHh lpr lFf" container style="height: 100vh" class="shadow-2 rounded-borders">
      <q-header elevated>
        <q-toolbar>
    
          <q-toolbar-title>
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page>
          <div class="background">
            
            <router-view />          
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
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
