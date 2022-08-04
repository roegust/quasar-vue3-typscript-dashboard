<template>
  <div class="form">
    <q-form
      @submit="
        btnConfirm({
          products: name,
          frequency: seletedFrequency,
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
              :rules="[(val) => val.length > 0]"
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
              :label="
                seletedFrequency.label === undefined
                  ? '頻率'
                  : seletedFrequency.label
              "
              size="13px"
              style="width: 100px"
            >
              <q-list>
                <template v-for="f in frequecyList" :key="f.label">
                  <q-item clickable v-close-popup @click="frequecyChanged(f)">
                    <q-item-section>
                      <q-item-label>{{ f.label }}</q-item-label>
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
import {
  defineComponent,
  ref,
  onBeforeMount,
  onUnmounted,
  onMounted,
  unref,
} from 'vue';
import { useStore } from 'src/store';
import { useQuasar } from 'quasar';
import io from 'socket.io-client';
import { ProductsInterface } from '../store/pageInfo/state';
import { Details, Frequency } from '../store/socket/state';

export default defineComponent({
  name: 'SearchBarRealtime',
  props: {
    type: String,
  },
  setup() {
    const name = ref([] as string[]);
    const q = useQuasar();
    const socket = io(
      // 'https://smart-dev.syntecclub.com:8080/api/report/gateway/ws',
      'https://localhost:8888/api/report/gateway/ws',
      // 'https://localhost:5000/api/report/gateway/ws',

      // 'https://10.10.40.173:8888/api/report/gateway/ws',
      { transports: ['polling'], path: '/api/report/gateway/ws/socket.io' },
    );

    let loopTimer = setInterval(() => {
      // eslint-disable-next-line no-console
      console.log('Generate loop item');
    }, 100000);

    clearInterval(loopTimer);

    const store = useStore();
    const frequecyList = [
      { label: '10秒', value: 5 },
      { label: '20秒', value: 20 },
      { label: '30秒', value: 30 },
      { label: '1分鐘', value: 60 },
      { label: '5分鐘', value: 300 },
    ] as Frequency[];

    const seletedFrequency = ref({} as Frequency);

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

    onBeforeMount(async () => {
      await store.dispatch('pageInfoModule/collectProductsOption');

      socket.on('latest-data', (data: string) => {
        const parsedData = JSON.parse(data) as Details[];
        store.commit('socketModule/setRealtimeData', parsedData);
        console.log(parsedData);
      });
    });

    onUnmounted(() => {
      clearInterval(loopTimer);
      socket.disconnect();
    });

    const setLoopItem = (products: string[], frequency: Frequency) => {
      socket.emit('get-data', {
        tenantId: 'admin',
        productNos: products,
      });

      clearInterval(loopTimer);

      loopTimer = setInterval(() => {
        socket.emit('get-data', {
          tenantId: 'admin',
          productNos: products,
        });
      }, frequency.value * 1000);
    };

    onMounted(() => {
      store.commit('socketModule/initialCards');
      name.value = Array.from(store.state.socketModule.products);
      seletedFrequency.value.label = store.state.socketModule.frequency.label;
      seletedFrequency.value.value = store.state.socketModule.frequency.value;

      setLoopItem(name.value, seletedFrequency.value);
    });

    const btnConfirm = (payload: {
      products: string[];
      frequency: Frequency;
    }) => {
      let chk = true;
      if (seletedFrequency.value.label === undefined) {
        q.notify({
          type: 'negative',
          message: '請選擇頻率',
        });

        chk = false;
      }
      if (payload.products.length > 0 && chk) {
        store.commit('socketModule/initialCards');
        store.commit('socketModule/storedState', payload);

        setLoopItem(payload.products, payload.frequency);
      }
    };

    const frequecyChanged = (f: Frequency) => {
      seletedFrequency.value = f;
    };

    return {
      store,
      name,
      btnConfirm,
      options,
      filterFn,
      frequecyChanged,
      frequecyList,
      seletedFrequency,
    };
  },
});
</script>
