<style>
  .row{
    width: 100%;
  }
</style>


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
    
      <div class="row">
            <div class="col-md-3 q-pr-md q-pt-md q-gutter-xs self-center">
              <q-select
                filled
                v-model="name"
                use-input
                input-debounce="0"
                label="產品名稱"
                :stack-label="true"
                :options="options"
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

            <div class="col-md-2 q-pr-md q-pt-md q-gutter-xs self-center">
              <q-input
                Outlined
                :readonly="true"
                v-model="from"
                label="開始時間"
                :stack-label="true"
                :rules="[(val) => (val && val.length > 0) || 'Please select a day']"
              />
            </div>

            <div class="col-md-2 q-pr-md q-pt-md q-gutter-xs self-center">
              <q-input
                Outlined
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
                        color="primary"
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

            <div class="col-md-1 q-pr-md self-center q-gutter-xs">
              <q-btn 
                unelevated rounded 
                padding="8px" 
                color="primary" 
                size="15x" 
                type="submit"
                style="width: 100px">
                
                搜尋<q-icon center name="search" />
              </q-btn>
            </div>

            <div class="col-md-1 q-pr-md self-center q-gutter-xs q-pl-xs">
              <ExportBtn
                :data="store.state.productsModule.rawData"
                :disabled="store.state.productsModule.rawData.length > 0"
              />
            </div>

            <div class="col-md-1 q-pr-md self-center q-gutter-xs"  style="padding-left: 5px;">
              <q-btn-dropdown  
                unelevated 
                rounded 
                class="icon" 
                padding="8px" 
                color="primary" 
                label="班別" 
                size="13px"
                style="width: 100px;"
                >
                  <q-list>
                    <q-item clickable v-close-popup @click="onItemClick">
                      <q-item-section>
                        <q-item-label>option_1</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick">
                      <q-item-section>
                        <q-item-label>option_2</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick">
                      <q-item-section>
                        <q-item-label>option_3</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>

              <!-- <q-btn-toggle 
                square outlined
                v-model="shiftSelected"
                size="15px"
                text-color="primary"
                toggle-color="primary"
                :options="store.state.pageInfoModule.shifts"
              >
                <template
                  v-for="shift in store.state.pageInfoModule.shifts"
                  :key="shift.label"
                  v-slot:[shift.slot]
                >
                  <q-tooltip>{{ `${shift.value.from} - ${shift.value.to}` }}</q-tooltip>
                </template>
              </q-btn-toggle> -->
        
            </div>

            <div class="col-md-1 self-center q-pr-md q-gutter-xs q-pa-lg" style="padding-left: 7px;">
        
              <q-btn-dropdown
                unelevated 
                rounded 
                class="icon"  
                padding="8px" 
                color="primary" 
                label="圖表" 
                size="13px"
                style="width: 100px">
                  <q-list>
                    <q-item clickable v-close-popup @click="onItemClick">
                      <q-item-section>
                        <q-item-label>option_1</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick">
                      <q-item-section>
                        <q-item-label>option_2</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick">
                      <q-item-section>
                        <q-item-label>option_3</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>

              <!-- <q-btn-toggle
                    v-model = "isRawData"
                    
                    size = "15px"
                    style = "
                    color : 'disRawData.color'
                    width 
                    "
                    
                    :options="[
                      { label: '圖表', value: false, color: 'primary'},
                      { label: '表單', value: true,  color: 'primary'},
                    ]"/> -->
            </div>

            <div class="md-auto self-center q-gutter-xs q-pa-lg ">
              <q-btn 
                unelevated rounded 
                padding="9px" 
                color="primary" 
                size="20px" 
                type="submit">
                <i class="fa-solid fa-gear"></i>
              </q-btn>
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

interface TimeRange {
  from: string;
  to: string;
}

export default defineComponent({
  name: 'SearchBar',
  components: { ExportBtn },
  


  setup() {

    // TODO 【修改】圖表;表單切換按鈕位置從MainLayout header搬到SearchBar 

    const isRawData = ref(false);
    const q = useQuasar();
    const today = moment().format('yyyy-MM-DD');
    const name = ref('');
    const date = ref(today as TimeRange | string);
    const shiftSelected = ref({} as TimeRange);
    const from = ref(today);
    const to = ref(today);

    const store = useStore();

    // const productNames = [
    //   ...new Set(data.map((product) => product.name).sort()),
    // ];

    const options = ref([] as string[]);

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
          (v) => v.toLowerCase().indexOf(needle) > -1,
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
      }

    );

    watch(
      () => isRawData.value,
      (cur) => {
        store.commit('pageInfoModule/rawDataVisible', cur);
        console.log(store.state.pageInfoModule.isRawData)
      },
    );

    const btnConfirm = (payload: {
      name: string;
      from: string;
      to: string;
      shiftSelected: TimeRange;
    }) => {
      if (name.value !== '' && name.value) {
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
    };
  },
});
</script>



