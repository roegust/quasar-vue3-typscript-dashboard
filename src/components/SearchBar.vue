<template>
  <div class="form ">
    <q-form
      @submit="
        btnConfirm({
          
          name,
          from,
          to,
          shiftSelected: {
            label: shiftSelected.label,
            from: shiftSelected.from,
            to: shiftSelected.to,
          },
        })
      "
    >
      <div class="row">

        <div class="row justify-between col-md-7">
          
          <div class="col-md-5">
            <q-select
              filled
              hide-selected
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
              :stack-label="true"
              :options="options"
              @filter="filterFn"
              :rules="[(val) => val.length > 0 || 'Please select a product']"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"> 找不到結果 </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>

          <div class="col-md-3">
            <q-input
              filled
              bg-color="white"
              :readonly="true"
              v-model="from"
              label="開始時間"
              :stack-label="true"
              :rules="[(val) => (val && val.length > 0) || 'Please select a day']"
            />
          </div>

          <div class="col-md-3">
          <q-input
            filled
            bg-color="white"
            :readonly="true"
            v-model="to"
            label="結束時間"
            :stack-label="true"
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
                    color="primary"
                    @range-end="rangeComputed(date)"
                  >
                    <div class="items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>


        </div>
        
        <div class="row col-md-5 justify-between ">
          <div class="col-md-3 q-pa-md ">
            <q-btn
              unelevated
              rounded
              color="primary"
              type="submit"
              style="width: 100px"
            >
              搜尋<q-icon center name="search" />
            </q-btn>
          </div>
          <div class="col-md-3 q-pa-md">
            <ExportBtn
              :data="store.state.productsModule.rawData"
              :disable="store.state.productsModule.rawData.length === 0"
            />
          </div>
          <div class="col-md-3 q-pa-md">
            <q-btn-dropdown
              unelevated
              rounded
              class="icon"
              padding="8px"
              color="primary"
              :label="
                shiftSelected.label === undefined ? '班別' : shiftSelected.label
              "
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
                    @click="
                      shiftChanged({
                        label: shift.label,
                        from: shift.value.from,
                        to: shift.value.to,
                      })
                    "
                  >
                    <q-item-section>
                      <q-item-label>{{ shift.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-list>
            </q-btn-dropdown>
          </div>
          <div class="col-md-3 q-pa-md">
            <q-btn-dropdown
              unelevated
              rounded
              class="icon"
              padding="8px"
              color="primary"
              :label="
                isRawData === null ? '顯示' : isRawData === true ? '表單' : '圖表'
              "
              style="width: 100px"
            >
              <q-list>
                <q-item
                  clickable
                  v-close-popup
                  @click="presentationChanged(false)"
                >
                  <q-item-section>
                    <q-item-label>圖表</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-close-popup
                  @click="presentationChanged(true)"
                >
                  <q-item-section>
                    <q-item-label>表單</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <!-- <div class="col-md-1 q-pa-md">
            <q-btn unelevated rounded padding="9px" color="primary" size="20px">
              <i class="fa-solid fa-gear"></i>
              <q-popup-proxy>
                <q-banner>
                  <template v-slot:avatar>
                    <q-icon name="signal_wifi_off" color="primary" />
                  </template>
                  You have lost connection to the internet. This app is offline.
                </q-banner>
              </q-popup-proxy>
            </q-btn>
          </div> -->
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
import ExportBtn from './ExportBtn.vue';
import ExportExcel from '../service/ExportExcel';
import { ProductsInterface } from '../store/pageInfo/state';

interface TimeRange {
  label: string;
  from: string;
  to: string;
}

export default defineComponent({
  name: 'SearchBar',
  components: { ExportBtn },
  setup() {
    // TODO 【修改】圖表;表單切換按鈕位置從MainLayout header搬到SearchBar
    const isRawData = ref(null as boolean | null);
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

    // watch(
    //   () => store.state.pageInfoModule.shifts,
    //   () => {
    //     const { shifts } = store.state.pageInfoModule;

    //     if (shifts.length > 0) {
    //       const shift = shifts[0];
    //       shiftSelected.value = shift.value;
    //     }
    //   },
    // );

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
      let chk = true;

      if (isRawData.value === null) {
        q.notify({
          type: 'negative',
          message: '請選擇顯示方式',
        });

        chk = false;
      }
      if (shiftSelected.value.label === undefined) {
        q.notify({
          type: 'negative',
          message: '請選擇需要的班別',
          multiLine: false,
          timeout: 2000,
        });

        chk = false;
      }

      if (name.value.length > 0 && chk) {
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
      isRawData.value = val;
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
