<template>
  <DoughnutChart
    ref="doughnutChartRef"
    :chart-data="chartData"
    :options="options"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
export default defineComponent({
  name: 'DoughnutChartInCard',
  // eslint-disable-next-line vue/no-unused-components
  components: { DoughnutChart },
  props: {
    actual: Number,
    target: Number,
  },
  setup(props) {
    const doughnutChartRef = ref();
    const actual = ref(props.actual ?? 0);
    const target = ref(props.target ?? 0);

    const chartColor = computed(() =>
      actual.value / target.value < 0.8 ? '#f06292' : '#81c784',
    );

    const remain = computed(() =>
      (target.value ?? actual.value) - actual.value < 0
        ? 0
        : (target.value ?? actual.value) - actual.value,
    );

    const data = ref([actual.value, remain.value]);

    const chartData = computed(() => ({
      labels: ['Actual', 'Remain'],
      datasets: [
        {
          data: data.value,
          backgroundColor: [chartColor.value, '#BFBFBF'],
        },
      ],
    }));

    const successRate = computed(() =>
      Math.round((actual.value / target.value) * 10000) === Infinity
        ? 10000
        : Math.round((actual.value / target.value) * 10000),
    );

    const options = ref({
      responsive: true,
      layout: {
        padding: {
          top: 10,
        },
      },
      plugins: {
        title: {
          display: true,
          text: `達成率: ${successRate.value / 100}%`,
          color: '#10403B',
          position: 'top',
          font: {
            size: 20,
          },
        },
        legend: {
          display: false,
        },
      },
      animation: {
        animateScale: true,
      },
    });

    watch(
      () => props.actual,
      (cur) => {
        actual.value = cur ?? 0;
        target.value = props.target ?? 0;

        data.value[0] = actual.value;
        data.value[1] = remain.value;
        options.value.plugins.title.text = `達成率: ${
          successRate.value / 100
        }%`;
      },
    );

    return { chartData, options, doughnutChartRef };
  },
});
</script>
