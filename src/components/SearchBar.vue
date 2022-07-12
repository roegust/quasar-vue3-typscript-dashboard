<template>
  <q-form style="width: 100%" class="row flex">
    <div class="col-md-1 q-pa-md">
      <ExportBtn
        :data="store.state.productsModule.rawData"
        v-show="store.state.productsModule.rawData.length > 0"
      />
    </div>
    <div class="col-md-1 q-pa-md" />
    <div class="col-md-4 q-pa-sm">
      <q-select
        filled
        v-model="name"
        use-input
        input-debounce="0"
        label="Product name"
        :stack-label="true"
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
    <div class="col-md-2 q-pa-sm">
      <q-input
        filled
        :readonly="true"
        v-model="from"
        label="Start Time"
        :stack-label="true"
        :rules="[(val) => (val && val.length > 0) || 'Please select a day']"
      />
    </div>

    <div class="col-md-2 q-pa-sm flex">
      <q-input
        filled
        :readonly="true"
        v-model="to"
        label="End Time"
        :stack-label="true"
        :rules="[(val) => (val && val.length > 0) || 'Please select a day']"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="date"
                mask="YYYY-MM-DD"
                range
                @range-end="rangeComputed(date)"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <!-- <div class="col-md-2 q-pa-sm">
      <q-input
        filled
        v-model="date"
        label="End Time"
        :stack-label="true"
        mask="####-##-## ##:##"
        :rules="[(val) => (val && val.length > 0) || 'Please select a day']"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <div v-if="!toPickerCtl">
                <q-date v-model="date" mask="YYYY-MM-DD HH:mm" today-btn fit />
              </div>
              <div v-else>
                <q-time
                  v-model="date"
                  mask="YYYY-MM-DD HH:mm"
                  now-btn
                  :format24h="true"
                />
              </div>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div> -->

    <div class="col-md-1 q-pa-sm">
      <q-btn
        type="submit"
        size="md"
        color="primary"
        v-on:click="
          btnConfirm({
            name,
            from,
            to,
            isAfternoon,
          })
        "
      >
        <q-icon center name="fa-solid fa-magnifying-glass" />
      </q-btn>
    </div>
    <div class="col-md-1 q-pa-sm">
      <q-btn-toggle
        class=".self-center"
        v-model="isAfternoon"
        size="sm"
        toggle-color="primary"
        color="white"
        text-color="primary"
        :options="[
          { label: '早班', value: false },
          { label: '中班', value: true },
        ]"
      />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'src/store';
import moment from 'moment';
import data from '../data/mockData';
import ExportBtn from './ExportBtn.vue';
import ExportExcel from '../service/ExportExcel';

interface TimeRange {
  from: string;
  to: string;
}

export default defineComponent({
  name: 'SearchBar',
  components: { ExportBtn },
  setup() {
    const today = moment().format('yyyy-MM-DD');
    const name = ref('');
    const date = ref(today as TimeRange | string);
    const isAfternoon = ref(false);
    const from = ref(today);
    const to = ref(today);

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
      from: string;
      to: string;
      isAfternoon: boolean;
    }) => {
      if (name.value !== '' && name.value) {
        store.dispatch('pageInfoModule/submit', payload);
      }
    };
    const rangeComputed = (range: TimeRange | string) => {
      if (typeof range === 'string') {
        from.value = range;
        to.value = range;
      } else {
        from.value = range.from;
        to.value = range.to;
      }
    };

    return {
      store,
      name,
      date,
      isAfternoon,
      btnConfirm,
      options,
      filterFn,
      ExportExcel,
      from,
      to,
      rangeComputed,
    };
  },
});
</script>
