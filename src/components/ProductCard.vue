<!-- <style lang="scss" scoped>
  .machine-card{
    border-radius: 1em ;
    padding-right: 1em ;
  }
</style> -->

<template>
  <div 
    style="padding: 0em 1em 1em 0em;"
    v-for="machine in machines"
    :key="machine.name"
    class="col-lg-4 col-md-3 col-sm-6 justify-start flex"
  >
    <q-card
      style="
        border-radius: 2em;
        width: 100%;
        border-width: 3px;
        border-style: solid;
        border-color: #dee2e6;
        background-color: #ffffff;
        align-items: flex-end;
      "
    >
    
      <!-- //TODO refactor layout -->
     
        <div class="row" style="height: 170px">
          <div class="col-md-4 col-sm-4 col-xs-4 items-center q-pt-md">
            <div class="text-center text-h4" style="width: 100%">
              {{ 1026 }}
              <!-- {{ machine.name ?? '未知機器' }} -->
            </div>
            <q-img src="../assets/default_cnc3x2.png" fit="fill" />

            <div
              class="text-h6 text-center text-bold"
              style="width: 100%"
            >
              {{ machine.operation }}
            </div>
          </div>
            <div class="col-md-3 col-sm-3 col-xs-3">
              <div class="text-h9">
                <div class="row">
                    <div class="col-12 text-bold">
                      生產數量:
                    </div>
                    <div class="col-12 " style="font-size:13px">
                      {{ machine.processRecords.length }} /
                      {{ machine.target/1000000 ?? 0 }}
                    </div>
                    <div class="col-12 text-bold">
                      標準工時:
                    </div>
                    <div class="col-12 " style="font-size:13px">
                      {{
                        `${Math.trunc(
                          machine.estimatedProcessingTime / 1000 / 60,
                        )} 分 ${Math.trunc(
                          (machine.estimatedProcessingTime / 1000) % 60,
                        )} 秒`
                      }}
                    </div>
                    <div class="col-12 text-bold">
                      平均工時:
                    </div>
                    <div class="col-12 " style="font-size:13px">
                      {{
                        `${Math.trunc(
                          machine.avgProcessingTime / 60,
                        )} 分 ${Math.trunc(machine.avgProcessingTime % 60)} 秒`
                      }}
                    </div>
                    <div class="col-12 text-bold">
                      操作人員:
                    </div>
                    <div class="col-12 " style="font-size:13px">
                      {{ machine.user ?? '未知人員' }}
                    </div>
                  <div>
                    
                    <!-- <div class="col-sm-6 text-bold text-italic">操作員:</div>
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
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          <div class="col-md-5 col-sm-5 col-xs-5 q-pt-md">
            <div >
              <DoughnutChartInCard
                :actual="machine.processRecords.length"
                :target="machine.target"
              />

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
   
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Chart, registerables } from 'chart.js';
import DoughnutChartInCard from './DoughnutChartInCard.vue';
// import { DoughnutChart, useDoughnutChart } from 'vue-chart-3';
import { MachineInterface } from '../store/product/state';

Chart.register(...registerables);
export default defineComponent({
  name: 'ProductCard',
  // eslint-disable-next-line vue/no-unused-components
  components: { DoughnutChartInCard },
  props: {
    machines: Object as () => MachineInterface[],
  },
  setup() {
    // const testArr1 = [...Array(Math.floor(Math.random() * 9) + 1).keys()];

    // const makeChartConfig = (
    //   target: number,
    //   records: ProcessRecordInterface[],
    // ) => {
    //   const actual = computed<number>(() => records.length);

    //   const chartColor = actual.value / target < 0.8 ? '#f06292' : '#81c784';
    //   const remain = (target ?? actual) - actual.value;
    //   const chartData = computed<ChartData<'doughnut'>>(() => ({
    //     // labels: ['Success'],
    //     datasets: [
    //       {
    //         data: [actual.value, remain < 0 ? 0 : remain],
    //         backgroundColor: [chartColor, '#BFBFBF'],
    //       },
    //     ],
    //   }));

    //   const successRate =
    //     Math.round((actual.value / target) * 10000) === Infinity
    //       ? 10000
    //       : Math.round((actual.value / target) * 10000);
    //   const options = computed<ChartOptions<'doughnut'>>(() => ({
    //     responsive: true,
    //     layout: {
    //       padding: {
    //         top: 10,
    //       },
    //     },
    //     plugins: {
    //       title: {
    //         display: true,
    //         text: `達成率: ${successRate / 100}%`,
    //         color: '#10403B',
    //         position: 'top',
    //         font: {
    //           size: 20,
    //         },
    //       },
    //       legend: {
    //         position: 'bottom',
    //       },

    //       // clip: { left: 0, top: 0, right: -2, bottom: false },
    //     },
    //     animation: {
    //       animateScale: true,
    //     },
    //   }));

    //   const { doughnutChartProps } = useDoughnutChart({
    //     chartData,
    //     options,
    //   });
    //   return doughnutChartProps;
    // };

    return {};
  },
});
</script>
