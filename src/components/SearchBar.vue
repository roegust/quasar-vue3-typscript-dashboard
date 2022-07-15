<template>
  <q-form
    style="width: 100%"
    class="row flex"
    @submit="
      btnConfirm({
        name,
        from,
        to,
        shiftSelected: {
          from: shiftSelected.from,
          to: shiftSelected.to,
        },
      })
    "
  >
    <div class="col-md-1 q-pa-md">
      <ExportBtn
        :data="store.state.productsModule.rawData"
        v-show="store.state.productsModule.rawData.length > 0"
      />
    </div>
    <div class="col-md-1 q-pa-md" />
    <div class="col-md-4 q-pa-md">
      <q-select
        filled
        v-model="name"
        use-input
        input-debounce="0"
        label="產品名稱"
        :stack-label="true"
        :options="store.state.pageInfoModule.products"
        @filter="filterFn"
        :rules="[(val) => (val && val.length > 0) || 'Please select a value']"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> 找不到結果 </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <div class="col-md-2 q-pa-md">
      <q-input
        filled
        :readonly="true"
        v-model="from"
        label="開始時間"
        :stack-label="true"
        :rules="[(val) => (val && val.length > 0) || 'Please select a day']"
      />
    </div>

    <div class="col-md-2 q-pa-md">
      <q-input
        filled
        :readonly="true"
        v-model="to"
        label="結束時間"
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

    <div class="col-md-1 q-pa-md">
      <q-btn type="submit" size="md" color="teal-9">
        <q-icon center name="fa-solid fa-magnifying-glass" color="#bfbfbf" />
      </q-btn>
    </div>

    <div class="col-md-1 q-pa-md">
      <q-btn-toggle
        class=".self-center"
        v-model="shiftSelected"
        size="sm"
        style="background-color: #637371"
        text-color="white"
        toggle-color="teal-9"
        :options="store.state.pageInfoModule.shifts"
      >
        <template
          v-for="shift in store.state.pageInfoModule.shifts"
          :key="shift.label"
          v-slot:[shift.slot]
        >
          <q-tooltip>{{ `${shift.value.from} - ${shift.value.to}` }}</q-tooltip>
        </template>
      </q-btn-toggle>
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, watch } from 'vue';
import { useStore } from 'src/store';
import moment from 'moment';
// import { useQuasar } from 'quasar';
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
    // const q = useQuasar();
    const today = moment().format('yyyy-MM-DD');
    const name = ref('');
    const date = ref(today as TimeRange | string);
    const shiftSelected = ref({} as TimeRange);
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

    onBeforeMount(() => {
      store.dispatch('pageInfoModule/collect');
    });

    watch(
      () => store.state.pageInfoModule.shifts,
      () => {
        const { shifts } = store.state.pageInfoModule;

        if (shifts.length > 0) {
          const shift = shifts[0];
          shiftSelected.value = shift.value;
        }
      },
    );

    const btnConfirm = (payload: {
      name: string;
      from: string;
      to: string;
      shiftSelected: TimeRange;
    }) => {
      if (name.value !== '' && name.value) {
        // q.loading.show({
        //   message: 'Transforming data. Please wait...',
        //   boxClass: 'bg-grey-2 text-grey-9',
        //   spinnerColor: 'primary',
        // });
        store.dispatch('productsModule/refreshData', payload).then(() => {
          store.dispatch('pageInfoModule/submit', payload);
          // setTimeout(() => {
          //   q.loading.hide();
          // }, 1000);
        });
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
      shiftSelected,
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
