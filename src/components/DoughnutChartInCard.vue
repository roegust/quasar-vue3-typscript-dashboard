<template>
  <v-chart class="chart" :option="optionEchart" />
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

export default defineComponent({
  name: 'DoughnutChartInCard',
  components: { VChart },
  props: {
    id: String,
    actual: Number,
    target: Number,
  },
  setup(props) {
    const actual = ref(props.actual ?? 0);
    const target = ref(props.target ?? 0);

    const chartColor = computed(() =>
      actual.value / target.value < 0 ? '#f06292' : '#3f51b5',
    );

    const remain = computed(() =>
      (target.value ?? actual.value) - actual.value < 0
        ? 0
        : (target.value ?? actual.value) - actual.value,
    );

    const successRate = computed(() =>
      Math.round((actual.value / target.value) * 10000) === Infinity
        ? 10000
        : Math.round((actual.value / target.value) * 10000),
    );

    const optionEchart = ref({
      title: {
        text: ` ${successRate.value / 100}%`,
        left: 'center',
        top: 'center',
      },

      series: [
        {
          name: props.id,
          type: 'pie',
          radius: ['65%', '100%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: actual.value, name: 'actual' },
            { value: remain.value, name: 'remain' },
          ],
          color: [chartColor.value, '#BFBFBF'],
        },
      ],
    });

    watch(
      () => props.actual,
      (cur) => {
        actual.value = cur ?? 0;
        target.value = props.target ?? 0;
        optionEchart.value.series[0].data[0].value = actual.value;
        optionEchart.value.series[0].data[1].value = remain.value;
        optionEchart.value.title.text = `${successRate.value / 100}%`;
      },
    );

    return { optionEchart };
  },
});
</script>

<style scoped>
.chart {
  height: 20vh;
}
</style>
