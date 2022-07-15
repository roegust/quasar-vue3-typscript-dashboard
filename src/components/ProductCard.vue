<template>
  <div
    v-for="machine in machines"
    :key="machine.name"
    class="col-md-3 q-pa-sm q-gutter-sm justify-start flex"
  >
    <q-card
      style="
        width: 100%;
        border-width: 3px;
        border-style: dashed;
        border-color: #637371;
        background-color: #8aa6a3;
        padding-right: 5%;

        align-items: flex-end;
        /* padding: 5px; */
      "
    >
      <!-- //TODO refactor layout -->
      <q-card-section>
        <div class="row" style="height: 100%">
          <div class="col-md-6 items-center flex">
            <div class="text-center text-h6" style="width: 100%">
              {{ machine.name ?? '未知機器' }}
            </div>
            <q-img src="../assets/default_cnc3x2.svg" fit="fill" />

            <div
              class="text-h5 text-center text-bold text-italic"
              style="width: 100%"
            >
              {{ machine.operation }}
            </div>
          </div>
          <div class="col-md-6">
            <div class="col-md-6">
              <DoughnutChart
                v-bind="
                  makeChartConfig(machine.target, machine.processRecords.length)
                    .value
                "
              />
            </div>
            <div class="col-md-4 text-h9 text-center">
              <div class="row flex-end">
                <div class="col-sm-6">
                  <div class="col-sm-6 text-bold text-italic">數量:</div>
                  <div class="col-sm-6">
                    {{ machine.processRecords.length }} /
                    {{ machine.target ?? 0 }}
                  </div>
                  <div class="col-sm-6 text-bold text-italic">操作員:</div>
                  <div class="col-sm-6">
                    {{ machine.user ?? '未知操作員' }}
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="col-sm-6 text-bold text-italic">標準工時:</div>
                  <div class="col-sm-6">
                    {{
                      `${Math.trunc(
                        machine.estimatedProcessingTime / 1000 / 60,
                      )} 分 ${Math.trunc(
                        (machine.estimatedProcessingTime / 1000) % 60,
                      )} 秒`
                    }}
                  </div>
                  <div class="col-sm-6 text-bold text-italic">平均工時:</div>
                  <div class="col-sm-6">
                    {{
                      `${Math.trunc(
                        machine.avgProcessingTime / 60,
                      )} 分 ${Math.trunc(machine.avgProcessingTime % 60)} 秒`
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col-sm-6 text-h5 text-bold text-center">
            {{
              `達成率: ${
                (Math.round(
                  (machine.processRecords.length / machine.target) * 10000,
                ) === Infinity
                  ? 10000
                  : Math.round(
                      (machine.processRecords.length / machine.target) * 10000,
                    )) / 100
              }%`
            }}
          </div> -->
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { DoughnutChart, useDoughnutChart } from 'vue-chart-3';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { MachineInterface } from '../store/product/state';

Chart.register(...registerables);
export default defineComponent({
  name: 'ProductCard',
  // eslint-disable-next-line vue/no-unused-components
  components: { DoughnutChart },
  props: {
    machines: Object as () => MachineInterface[],
  },
  setup() {
    // const testArr1 = [...Array(Math.floor(Math.random() * 9) + 1).keys()];

    const makeChartConfig = (target: number, actual: number) => {
      const chartColor = actual / target < 0.8 ? '#f06292' : '#81c784';
      const remain = (target ?? actual) - actual;
      const chartData = computed<ChartData<'doughnut'>>(() => ({
        // labels: ['Success'],
        datasets: [
          {
            data: [actual, remain < 0 ? 0 : remain],
            backgroundColor: [chartColor, '#BFBFBF'],
          },
        ],
      }));

      const successRate =
        Math.round((actual / target) * 10000) === Infinity
          ? 10000
          : Math.round((actual / target) * 10000);
      const options = computed<ChartOptions<'doughnut'>>(() => ({
        responsive: true,
        layout: {
          padding: {
            top: 10,
          },
        },
        plugins: {
          title: {
            display: true,
            text: `達成率: ${successRate / 100}%`,
            color: '#10403B',
            position: 'top',
            font: {
              size: 20,
            },
          },
          legend: {
            position: 'bottom',
          },

          // clip: { left: 0, top: 0, right: -2, bottom: false },
        },
        animation: {
          animateScale: true,
        },
      }));

      const { doughnutChartProps } = useDoughnutChart({
        chartData,
        options,
      });
      return doughnutChartProps;
    };
    return { makeChartConfig };
  },
});
</script>
