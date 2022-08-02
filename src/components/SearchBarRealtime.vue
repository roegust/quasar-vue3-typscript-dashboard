<template>
  <div class="form">
    <q-form
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
      <div class="row justify-between">
        <div class="col-md-8 self-center row">
          <div class="col-md-12 self-center q-pa-md">
            <q-select
              filled
              bg-color="white"
              v-model="name"
              use-input
              input-debounce="0"
              label="產品名稱"
              wrap
              multiple
              use-chips
              option-value="value"
              option-label="label"
              emit-value
              map-options
              hide-selected
              :stack-label="true"
              :options="options"
              @filter="filterFn"
              :rules="[(val) => val.length > 0 || 'Please select a product']"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    找不到結果
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
        <div class="col-md-4 justify-center row">
          <div class="col-md-3 self-center justify-center row">
            <q-btn
              unelevated
              rounded
              color="primary"
              size="15x"
              type="submit"
              style="width: 100px"
            >
              搜尋<q-icon center name="search" />
            </q-btn>
          </div>
          <div class="col-md-3 self-center justify-center row">
            <q-btn-dropdown
              unelevated
              rounded
              class="icon"
              padding="8px"
              color="primary"
              label="班別"
              size="13px"
              style="width: 100px"
            >
              <q-list>
                <template
                  v-for="shift in store.state.pageInfoModule.shifts"
                  :key="shift.label"
                >
                  <q-item
                    clickable
                    v-close-popup
                    @click="shiftChanged(shift.value)"
                  >
                    <q-item-section>
                      <q-item-label>{{ shift.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-list>
            </q-btn-dropdown>
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, watch } from 'vue';
import { useStore } from 'src/store';
import moment from 'moment';
import { useQuasar } from 'quasar';
// import data from '../data/mockData';
// import ExportBtn from './ExportBtn.vue';
import ExportExcel from '../service/ExportExcel';
import { ProductsInterface } from '../store/pageInfo/state';

interface TimeRange {
  from: string;
  to: string;
}

export default defineComponent({
  name: 'SearchBar',
  props: {
    type: String,
  },
  setup() {
    const isRawData = ref(false);
    const q = useQuasar();
    const today = moment().format('yyyy-MM-DD');
    const name = ref([] as string[]);
    const date = ref(today as TimeRange | string);
    const shiftSelected = ref({} as TimeRange);
    const from = ref(today);
    const to = ref(today);

    const store = useStore();

    name.value.push(...store.state.pageInfoModule.name);

    const options = ref([] as ProductsInterface[]);

    const filterFn = (
      val: string,
      update: (arg0: { (): void; (): void }) => void,
    ) => {
      if (val === '') {
        update(() => {
          options.value = store.state.pageInfoModule.products.filter(
            (item) => item,
          );
        });

        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        options.value = store.state.pageInfoModule.products.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1,
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

    watch(
      () => isRawData.value,
      (cur) => {
        store.commit('pageInfoModule/rawDataVisible', cur);
      },
    );

    const btnConfirm = (payload: {
      name: string[];
      from: string;
      to: string;
      shiftSelected: TimeRange;
    }) => {
      if (name.value.length > 0) {
        q.loading.show({
          message: 'Transforming data. Please wait...',
          boxClass: 'bg-grey-2 text-grey-9',
          spinnerColor: 'primary',
        });
        store.dispatch('productsModule/refreshData', payload).then(() => {
          store.dispatch('pageInfoModule/submit', payload);
          setTimeout(() => {
            q.loading.hide();
          }, 1000);
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

    const shiftChanged = (shift: TimeRange) => {
      shiftSelected.value = shift;
    };

    const presentationChanged = (val: boolean) => {
      store.commit('pageInfoModule/rawDataVisible', val);
    };

    return {
      isRawData,
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
      shiftChanged,
      presentationChanged,
    };
  },
});
</script>
