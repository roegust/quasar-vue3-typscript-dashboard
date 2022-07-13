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
        border-style: solid;
        border-color: #01a7fd;
        padding: 5px;
      "
    >
      <q-card-section>
        <div class="row">
          <div class="col-md-4 items-center flex">
            <q-img src="../assets/default_cnc3x2.svg" fit="cover" />
          </div>
          <div class="col-md-4 text-h9 text-left">
            <div class="col-sm-6 text-bold text-italic">Machine:</div>
            <div class="col-sm-6">
              {{ machine.name }}
            </div>
            <div class="col-sm-6 text-bold text-italic">Quantity:</div>
            <div class="col-sm-6">
              {{ machine.processRecords.length }} / {{ machine.target }}
            </div>
            <div class="col-sm-6 text-bold text-italic">Operator:</div>
            <div class="col-sm-6">
              {{ machine.user }}
            </div>
          </div>
          <div class="col-md-4 items-center flex">
            <DoughnutChart
              v-bind="
                makeChartConfig(machine.target, machine.processRecords.length)
                  .value
              "
            />
          </div>
        </div>
        <div class="text-h5 text-center text-bold text-italic">
          {{ machine.operation }}
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
      const chartColor = actual / target < 0.8 ? '#FF0000' : '#9ACD32';

      const chartData = computed<ChartData<'doughnut'>>(() => ({
        // labels: ['Success'],
        datasets: [
          {
            data: [actual, target - actual],
            backgroundColor: [chartColor, '#f0f7ff'],
          },
        ],
      }));
      const options = computed<ChartOptions<'doughnut'>>(() => ({
        responsive: true,

        plugins: {
          title: {
            display: true,
            text: `達成率: ${Math.round((actual / target) * 10000) / 100}%`,
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
