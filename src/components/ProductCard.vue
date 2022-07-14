<template>
  <div
    v-for="machine in machines"
    :key="machine.name"
    class="col-md-4 q-pa-sm q-gutter-sm justify-start flex"
  >
    <q-card
      style="
        width: 100%;
        border-width: 3px;
        border-style: dashed;
        border-color: #637371;
        background-color: #8aa6a3;
        padding-right: 5%;
        /* padding: 5px; */
      "
    >
      <!-- //TODO refactor layout -->
      <q-card-section>
        <div class="row" style="height: 100%">
          <div class="col-md-5 items-center flex">
            <div class="text-center" style="width: 100%">
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

          <div class="col-md-5 items-center flex">
            <DoughnutChart
              v-bind="
                makeChartConfig(machine.target, machine.processRecords.length)
                  .value
              "
            />
          </div>
          <div class="col-md-2 text-h9 text-right">
            <!-- <div class="col-sm-6 text-bold text-italic">Machine:</div> -->
            <div class="col-sm-6 text-bold text-italic">數量:</div>
            <div class="col-sm-6">
              {{ machine.processRecords.length }} / {{ machine.target ?? 0 }}
            </div>
            <div class="col-sm-6 text-bold text-italic">操作員:</div>
            <div class="col-sm-6">
              {{ machine.user ?? '未知操作員' }}
            </div>
          </div>
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

      const chartData = computed<ChartData<'doughnut'>>(() => ({
        // labels: ['Success'],
        datasets: [
          {
            data: [actual, target ?? actual - actual],
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

        plugins: {
          title: {
            display: true,
            text: `達成率: ${successRate / 100}%`,
            color: '#10403B',
            position: 'bottom',
            font: {
              size: 20,
            },
          },
          legend: {
            position: 'bottom',
          },
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
