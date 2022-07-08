<template class="col-sm-4 .offest-md-4">
  <q-form class="q-pa-md flex">
    <div style="width: 100%" class="q-gutter-md row">
      <div class="col-md-4">
        <q-select
          filled
          v-model="name"
          use-input
          input-debounce="0"
          label="Product name"
          :options="options"
          @filter="filterFn"
          :rules="[(val) => (val && val.length > 0) || 'Please select a value']"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="col-md-3">
        <q-input
          filled
          v-model="date"
          mask="####-##-##"
          :rules="[(val) => (val && val.length > 0) || 'Please select a day']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="date" mask="YYYY-MM-DD" today-btn>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="col-md-1">
        <q-btn
          type="submit"
          size="md"
          color="primary"
          v-on:click="btnConfirm({ name, date, isAfternoon })"
        >
          <q-icon center name="fa-solid fa-magnifying-glass" />
        </q-btn>
      </div>
      <div class="col-md-2 inner">
        <q-btn-toggle
          v-model="isAfternoon"
          size="md"
          toggle-color="primary"
          color="white"
          text-color="primary"
          :options="[
            { label: '早班', value: false },
            { label: '中班', value: true },
          ]"
        />
      </div>
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'src/store';
import moment from 'moment';
import data from '../data/mockData';

export default defineComponent({
  name: 'SearchBar',
  components: {},
  setup() {
    const name = ref('');
    const date = ref(moment().format('yyyy-MM-DD'));
    const isAfternoon = ref(false);

    const store = useStore();

    const productNames = [
      ...new Set(data.map((product) => product.name).sort()),
    ];

    const options = ref(productNames);

    const filterFn = (
      val: string,
      update: (arg0: { (): void; (): void }) => void,
    ) => {
      if (val === '') {
        update(() => {
          options.value = productNames;
        });

        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        options.value = productNames.filter(
          (v) => v.toLowerCase().indexOf(needle.toLowerCase()) > -1,
        );
      });
    };

    const btnConfirm = (payload: {
      name: string;
      date: string;
      isAfternoon: boolean;
    }) => {
      if (name.value !== '' && name.value) {
        store.dispatch('productsModule/searchData', payload);
      }
    };

    return {
      name,
      date,
      isAfternoon,
      btnConfirm,
      options,
      filterFn,
    };
  },
});
</script>
