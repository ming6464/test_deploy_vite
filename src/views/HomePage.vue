<template>
  <div>
    <div class="mb-14">
      <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="item in stats" :key="item.id"
          class="relative overflow-hidden rounded-lg bg-white px-4 pt-5 shadow-lg sm:px-6 sm:pt-6">
          <dt>
            <div class="absolute rounded-md bg-indigo-500 p-3">
              <component :is="item.icon" class="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p class="ml-16 truncate text-sm font-medium text-gray-500">{{ item.name }}</p>
          </dt>
          <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p class="text-2xl font-semibold text-gray-900">{{ item.stat }}</p>
          </dd>
        </div>
      </dl>
    </div>
    <div class="max-w-sm">
      <VueDatePicker v-model="date" :max-date="new Date()" range multi-calendars
        :format="filterMode == 'day' ? 'dd/MM/yyyy' : filterMode == 'month' ? 'MM/yyyy' : 'yyyy'" :clearable="false"
        @update:model-value="handleDate" />
    </div>
    <div class="m-3 ml-0 flex flex-row">
      <h2 class="text-sm font-medium text-center pr-3 py-2">Chế độ lọc : </h2>
      <div>
        <button @click="On_Click_FilterModel('day')" type="button"
          class="rounded-md mr-2 px-3 py-2 border-2 text-sm font-semibold shadow-sm hover:bg-indigo-500 hover:border-indigo-500 hover:text-white focus-visible:outline 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          :class="{ 'bg-indigo-600 text-white border-indigo-600': filterMode == 'day', 'border-gray-400': filterMode != 'day' }">Ngày</button>

        <button @click="On_Click_FilterModel('month')" type="button"
          class="rounded-md mr-2 px-3 py-2 border-2 text-sm font-semibold shadow-sm hover:bg-indigo-500 hover:border-indigo-500 hover:text-white focus-visible:outline 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          :class="{ 'bg-indigo-600 text-white border-indigo-600': filterMode == 'month', 'border-gray-400': filterMode != 'month' }">Tháng</button>

        <button type="button" @click="On_Click_FilterModel('year')"
          class="rounded-md px-3 py-2 border-2 text-sm font-semibold shadow-sm hover:bg-indigo-500 hover:border-indigo-500 hover:text-white focus-visible:outline 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          :class="{ 'bg-indigo-600 text-white border-indigo-600': filterMode == 'year', 'border-gray-400': filterMode != 'year' }">Năm
        </button>
      </div>
    </div>

    <div class="mt-3">
      <div class="mt-10 flex flex-col lg:flex-row gap-x-3">
        <div class="sm:w-full lg:w-2/3 border-2 border-gray-300 rounded-md">
          <h3 class="text-sm font-medium text-center">Tổng doanh thu</h3>
          <div id="chart-timeline">
            <apexchart type="area" height="350" ref="chart_totalRevenue"
              :options="filterMode == 'day' ? chartOptions_day : filterMode == 'month' ? chartOptions_month : chartOptions_year"
              :series="series_total">
            </apexchart>
          </div>
        </div>
        <div class="sm:w-full mt-10 lg:mt-0 lg:w-1/3 border-2 border-gray-300 rounded-md">
          <div class="max-w-full rounded-md p-3">
            <h3 class="text-sm font-medium text-center">Top 5 sản phẩm bán chạy nhất</h3>
            <div class="h-[350px]">
              <div class="mt-5 flex flex-col items-start w-full h-full justify-around">
                <div class="px-4 border-t border-gray-100 pt-3 w-full" v-for="(item, index) in series_top5.data"
                  :key="index">
                  <div class="grid grid-cols-4 gap-4">
                    <dt class="text-sm font-medium leading-6 text-gray-900">{{ index }}</dt>
                    <dd class="text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">
                      <div>{{ item.name }}</div>
                      <div>Số lượng bán ra: {{
                        item.totalAmount }}</div>
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 flex flex-col lg:flex-row gap-x-3 ">
        <div class="sm:w-full lg:w-2/3 border-2 border-gray-300 rounded-md">
          <div class="max-w-fullrounded-md p-3">
            <h3 class="text-sm font-medium text-center">Số lượng bán</h3>
            <div id="chart-timeline">
              <apexchart type="area" height="350" ref="chart_count"
                :options="filterMode == 'day' ? chartOptions_day : filterMode == 'month' ? chartOptions_month : chartOptions_year"
                :series="series_count"></apexchart>
            </div>
          </div>
        </div>
        <div class="sm:w-full mt-10 lg:mt-0  lg:w-1/3 border-2 border-gray-300 rounded-md">
          <div class="max-w-full rounded-md p-3">
            <h3 class="text-sm font-medium text-center">Top 5 khách hàng mua nhiều nhất</h3>
            <div class="h-[350px]">
              <div class="mt-5 flex flex-col items-start w-full h-full justify-around">
                <div class="px-4 border-t border-gray-100 pt-3 w-full" v-for="(item, index) in series_top5.data"
                  :key="index">
                  <div class="grid grid-cols-4 gap-4">
                    <dt class="text-sm font-medium leading-6 text-gray-900">{{ index }}</dt>
                    <dd class="text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">
                      <div>{{ item.name }}</div>
                      <div>Số lượng bán ra: {{
                        item.totalAmount }}</div>
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="ShowLoading" class="w-full h-full flex justify-center items-center"
    style="position: fixed; top: 0; left: 0;z-index: 100;">
    <div class="flex justify-center items-center">
      <!-- Phần background với độ mờ -->
      <div class="bg-gray-500" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.3;">
      </div>
      <!-- Nội dung loading spinner -->
      <div class="spinner-border text-white" role="status">
        <fwb-spinner color="blue" size="12" class="lg:ml-64 mt-10" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { showToast } from '../assets/Toastify';
import moment from 'moment';
import { FwbSpinner } from 'flowbite-vue'
import { instance } from '../assets/axios-instance';
import * as API from '../assets/API'
import VueApexCharts from "vue3-apexcharts";
import { watch, ref, onMounted } from 'vue';
import { useToken } from '../store/tokenStore';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/20/solid'
import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon } from '@heroicons/vue/24/outline'
import { FormatCurrencyVND } from '../assets/formatCurrency'
const stats = [
  { id: 1, name: 'Tổng số sản phẩm', stat: FormatCurrencyVND(199208, true), icon: UsersIcon },
  { id: 2, name: 'Tổng doanh thu', stat: FormatCurrencyVND(188293), icon: EnvelopeOpenIcon },
  { id: 3, name: 'Tổng số lượng khách hàng', stat: FormatCurrencyVND(190029, true), icon: CursorArrowRaysIcon },
  { id: 4, name: 'Tổng số hóa đơn', stat: FormatCurrencyVND(1928, true), icon: CursorArrowRaysIcon },
]
const chart_totalRevenue = ref(null);
const chart_count = ref(null);
const chart_top5 = ref(null);
const filterMode = ref('');
const store = useToken();
const ShowLoading = ref(false);
const series_total = ref([
  {
    name: "",
    data: []
  }
]);

const series_count = ref([
  {
    name: "",
    data: []
  }
]);

const series_top5 = ref({
  name: "",
  data: [{
    "name": "Product 1",
    "image": "https://via.placeholder.com/500",
    "price": 100000,
    "totalAmount": "60"
  },
  {
    "name": "Product 2",
    "image": "https://placekitten.com/500/500",
    "price": 120000,
    "totalAmount": "32"
  },
  {
    "name": "Product 3",
    "image": "https://placekitten.com/500/500",
    "price": 120000,
    "totalAmount": "32"
  },
  {
    "name": "Product 4",
    "image": "https://placekitten.com/500/500",
    "price": 120000,
    "totalAmount": "32"
  },
  {
    "name": "Product 5",
    "image": "https://placekitten.com/500/500",
    "price": 120000,
    "totalAmount": "32"
  },
  ]
});

const chartOptions_day = {
  chart: {
    id: 'area-datetime',
    type: 'area',
    height: 350,
    toolbar: {
      show: false,
      tools: {
        download: false,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
      }
    },
    zoom: {
      enabled: true,
      type: 'x',
      autoScaleYaxis: false,
      zoomedArea: {
        fill: {
          color: '#90CAF9',
          opacity: 0.4
        },
        stroke: {
          curve: 'smooth',
          color: '#0D47A1',
          opacity: 0.4,
          width: 1
        }
      }
    }
  },
  annotations: {
    yaxis: [
      {
        y: -10000,
      },
    ],
    xaxis: [
      {
        borderColor: '#999',
        yAxisIndex: 0,
        label: {
          show: true,
          text: 'Rally',
          style: {
            color: '#fff',
            background: '#775DD0',
          },
        },
      },
    ],
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
    style: 'hollow',
  },
  xaxis: {
    type: 'datetime',
    max: new Date().getTime(),
    tickAmount: 20,
    labels: {
      datetimeFormatter: {
        year: 'yyyy',
        month: "MM/yyyy",
        day: 'dd/MM',
        hour: 'HH:mm',
      },
    }
  },
  tooltip: {
    x: {
      format: 'dd/MM/yyyy',
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 100],
    },
  },
};

const chartOptions_month = {
  chart: {
    id: 'area-datetime',
    type: 'area',
    height: 350,
    toolbar: {
      show: false,
      tools: {
        download: false,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
      }
    },
    zoom: {
      enabled: true,
      type: 'x',
      autoScaleYaxis: false,
      zoomedArea: {
        fill: {
          color: '#90CAF9',
          opacity: 0.4
        },
        stroke: {
          curve: 'smooth',
          color: '#0D47A1',
          opacity: 0.4,
          width: 1
        }
      }
    }
  },
  annotations: {
    yaxis: [
      {
        y: -10000,
      },
    ],
    xaxis: [
      {
        borderColor: '#999',
        yAxisIndex: 0,
        label: {
          show: true,
          text: 'Rally',
          style: {
            color: '#fff',
            background: '#775DD0',
          },
        },
      },
    ],
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
    style: 'hollow',
  },
  xaxis: {
    type: 'datetime',
    max: new Date().getTime(),
    tickAmount: 20,
    labels: {
      datetimeFormatter: {
        year: 'yyyy',
        month: "MM/yyyy",
        day: 'dd/MM',
        hour: 'HH:mm',
      },
    }
  },
  tooltip: {
    x: {
      format: 'MM/yyyy',
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 100],
    },
  },
};

const chartOptions_year = {
  chart: {
    id: 'area-datetime',
    type: 'area',
    height: 350,
    toolbar: {
      show: false,
      tools: {
        download: false,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
      }
    },
    zoom: {
      enabled: true,
      type: 'x',
      autoScaleYaxis: false,
      zoomedArea: {
        fill: {
          color: '#90CAF9',
          opacity: 0.4
        },
        stroke: {
          curve: 'smooth',
          color: '#0D47A1',
          opacity: 0.4,
          width: 1
        }
      }
    }
  },
  annotations: {
    yaxis: [
      {
        y: -10000,
      },
    ],
    xaxis: [
      {
        borderColor: '#999',
        yAxisIndex: 0,
        label: {
          show: true,
          text: 'Rally',
          style: {
            color: '#fff',
            background: '#775DD0',
          },
        },
      },
    ],
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
    style: 'hollow',
  },
  xaxis: {
    type: 'datetime',
    max: new Date().getTime(),
    tickAmount: 20,
    labels: {
      datetimeFormatter: {
        year: 'yyyy',
        month: "MM/yyyy",
        day: 'dd/MM',
        hour: 'HH:mm',
      },
    }
  },
  tooltip: {
    x: {
      format: 'yyyy',
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 100],
    },
  },
};
const date = ref();
// Set default date range to yesterday to today on component mount
onMounted(() => {

  store.onSetCurrentPage({ index: 0, child: -1 })

  const lastMonth = new Date();

  if (lastMonth.getMonth() == 0) {
    lastMonth.setMonth(11);
  } else {
    lastMonth.setMonth(lastMonth.getMonth() - 1);
  }
  lastMonth.setDate(1);
  lastMonth.setHours(0, 0, 0, 0)

  const curMonth = new Date();

  date.value = [lastMonth, curMonth];

  On_Click_FilterModel('month');

});

// Define the updateData function
const updateData = async () => {
  return;
  updateLoading(true);
  let time1 = new Date(date.value[0]);
  let time2 = new Date(date.value[1]);
  let zoom = time2;
  let filterCode = 1;
  if (time1.getTime() > time2.getTime()) {
    time2 = time1;
    time1 = zoom;
  }

  time1.setHours(0, 0, 0, 0);
  if (filterMode.value != 'day') {
    time1.setDate(1);
    if (filterMode.value == 'year') {
      time1.setMonth(0);
    }
  }

  switch (filterMode.value) {
    case 'month':
      filterCode = 1;
      break;
    case 'year':
      filterCode = 2;
      break;
  }

  const format = 'yyyy-MM-DD';

  const params = {};

  params.startDate = formatTime(time1, format);
  params.endDate = formatTime(time2, format);
  params.filter = filterCode;

  console.log(params);

  await instance.get(API.statistics, { params: params })
    .then(res => {
      console.log(res.data);
      series_total.value = [];
      series_count.value = [];
      series_total.value.push(finishData(res.data.data[0]));
      series_count.value.push(finishData(res.data.data[1]));
      series_top5.value = res.data.data[2];
      console.log(series_total.value, series_count.value, series_top5.value);
      ZoomXAll(time1, time2)
    })

    .catch(err => {
      const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
      showToast(mess, true);
      console.error(mess, err);
    })

  updateLoading(false);

};

const finishData = (data) => {
  data.data.forEach(x => {
    let time = x[0];
    switch (filterMode.value) {
      case 'month':
        time += '-01'
        break;
      case 'year':
        time += '-01-01';
        break;
    }
    x[0] = moment(time).valueOf();
  });
  return data;
}

const formatTime = (time, format) => {
  return moment(time).format(format);
}

const ZoomXAll = (time1, time2) => {
  if (series_total.value[0].data.length > 0) {
    chart_totalRevenue.value.zoomX(
      time1.getTime(),
      time2.getTime()
    );
  }

  if (series_count.value[0].data.length > 0) {
    chart_count.value.zoomX(
      time1.getTime(),
      time2.getTime()
    );
  }


  // chart_top5.value.zoomX(
  //   time1.getTime(),
  //   time2.getTime()
  // );
}

const handleDate = (modelData) => {
  if (modelData.length < 2) return;
  date.value = modelData;
  updateData();
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const On_Click_FilterModel = async (modelData) => {
  if (modelData == filterMode.value) return;
  filterMode.value = modelData;
  updateData();
};

const formatLog = (currentDate) => {
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');

  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;

}

const updateLoading = (check) => {
  ShowLoading.value = check;
}

</script>