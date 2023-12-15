<template>
  <div v-if="!isOpenDetailOrder">
    <div class="-mt-2 bg-white border-b border-gray-200 " style="position: fixed;top : 70px;right: 0px;left: 0px;">
      <div class="lg:ml-72 px-4">
        <div class="flex justify-around items-center border-gray-300 py-4">
          <div
            class="flex items-center justify-between border border-gray-400 border-r-0 rounded-md shadow-sm md:w-8/12 sm:w-6/12">
            <input type="text" placeholder="Tìm kiếm ..." v-model="searchTerm"
              class="rounded-md w-full rounded-r-none border-0 px-3 py-2 text-sm focus:border-gray-50 focus:border-0" />
            <select v-model="selectedFilter" class="border-0 px-3 py-2 text-sm focus:outline-0">
              <option value="id">ID</option>
            </select>
            <button type="button" @click="loadFilter()"
              class="inline-flex items-center rounded-md rounded-l-none bg-indigo-600 px-1 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <MagnifyingGlassIcon class="h-7 w-7" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-7 lg:-mx-4">
        <div class="inline-block min-w-full py-2 align-middle">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Mã đơn
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Tên Khách hàng
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Ngày đặt
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Số điện thoại
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Tổng tiền
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Phương thức thanh toán
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Trạng thái thanh toán
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Trạng thái đơn hàng
                </th>
                <th scope="col" class="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Hoạt động
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="(order, index) in filteredOrders" :key="index">
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-900 sm:pl-2">
                  <div class="text-gray-900">{{ order.id }}</div>
                </td>
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-0">
                  {{ order.addressData.name }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0">
                  {{ formattedDateTime(order.createdAt) }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0">
                  {{ order.addressData.phone }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0">
                  {{ FormatCurrencyVND(order.paymentData.total) }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0">
                  {{ getPaymentType(order.paymentData.paymentType) }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0">
                  {{ getPaymentStatus(order.paymentData.status) }}
                </td>
                <td v-if="order.status != 0">
                  <select v-model="order.status1" @change="onChangeStatusOrder(index, false)"
                    class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-indigo-500">
                    <option v-for="option in statusOrder" :key="option.value" :value="option.value"
                      :disabled="option.value != 0 && (option.value <= order.status || option.value > order.status + 1)">
                      {{ option.label }}
                    </option>
                  </select>
                </td>
                <td v-else class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0">
                  Huỷ
                </td>
                <td class="py-4">
                  <button class=" hover:text-indigo-900 ml-10" @click="showDetails(order.id)">
                    <AdjustmentsVerticalIcon class="h-5 w-5" aria-hidden="true" />
                    <span class="sr-only">, {{ order.id }}</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal for Details -->
  <div v-if="isOpenDetailOrder" class="overflow-y-auto">
    <div class="order-detail-page">
      <div class="px-4 py-3">
        <h1 class="text-xl font-semibold leading-7 text-gray-900">
          Chi tiết đơn hàng
        </h1>
      </div>
      <div class="my-6 border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Tên khách hàng
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ selectedOrder.addressData.name }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Ngày đặt
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ formattedDateTime(selectedOrder.createdAt) }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Số điện thoại
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ selectedOrder.addressData.phone }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt class="text-sm font-medium leading-6 text-gray-900">Địa chỉ</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ getAddressFull(selectedOrder.addressData) }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Tổng tiền
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ FormatCurrencyVND(selectedOrder.paymentData.total) }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Loại thanh toán
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ selectedOrder.paymentData.paymentType }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Trạng thái thanh toán
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ selectedOrder.paymentData.status }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Trạng thái đơn hàng
            </dt>
            <dd v-if="selectedOrder.status != 0">
              <select v-model="selectedOrder.status1" @change="onChangeStatusOrder(false, true)"
                class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-indigo-500">
                <option v-for="option in statusOrder" :key="option.value" :value="option.value"
                  :disabled="option.value != 0 && (option.value < selectedOrder.status || option.value > selectedOrder.status + 2)">
                  {{ option.label }}
                </option>
              </select>
              <button type="button" v-if="selectedOrder.status1 != selectedOrder.status"
                class="rounded-md ml-3 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Xác nhận
              </button>
            </dd>
            <dd v-else-if="selectedOrder.status == 0" class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Hủy
            </dd>

          </div>
          <!-- Thêm table mới -->
          <div class="mt-6 overflow-x-auto">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              Chi tiết sản phẩm
            </h2>
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <!-- Thêm cột hình ảnh vào đầu bảng -->
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hình ảnh
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên sản phẩm
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loại
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giá
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Màu
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số lượng
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <!-- Lặp qua các sản phẩm trong orderItemData -->
                <tr v-for="item in selectedOrder.orderItemData" :key="item.id">
                  <!-- Hiển thị hình ảnh ở đầu dòng -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <img :src="
                      item.orderProductSizeColorData.productData.mainImage
                    " alt="Product Image"
                      class="h-12 w-12 sm:h-8 sm:w-8 md:h-12 md:w-12 lg:h-16 lg:w-16 object-cover" />
                  </td>
                  <!-- Các cột thông tin khác -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ item.orderProductSizeColorData.productData.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{
                      item.orderProductSizeColorData.productData.categoryData
                        .name
                    }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ FormatCurrencyVND(item.orderProductSizeColorData.price) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ item.orderProductSizeColorData.colorData.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ item.orderProductSizeColorData.sizeData.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ item.amount }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ FormatCurrencyVND(item.price) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </dl>
      </div>
      <div style="position: fixed; bottom: 0px; right: 0px; left: 0px" class="lg:ml-72">
        <div class="bg-gray-50 px-4 py-3 flex justify-end">
          <button @click="closeDetails" type="button"
            class="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring focus:border-indigo-500 sm:w-auto sm:text-sm">
            Quay lại
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- delete modal -->
  <div v-show="isWarningModalOpen">
    <div :class="{ 'opacity-100': isShowWarningModal }"
      class="transition-opacity ease-in-out duration-500 opacity-0 relative z-10" aria-labelledby="modal-title"
      role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-10 w-screen">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            class="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg lg:ml-64 mt-10">
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                    Xác nhận thay đổi trạng thái
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Bạn có chắc chắn muốn muốn thay đổi trạng thái đơn hàng
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

              <button type="button" @click="onChangeStatus"
                class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto">
                Đồng ý
              </button>
              <button type="button" @click="onCancelChangeStatus"
                class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                Huỷ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- loadding -->
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
  <!-- loadding -->
</template>

<script setup>
import * as API from '../assets/API'
import { FwbSpinner } from 'flowbite-vue'
import moment from "moment";
import { useToken } from "../store/tokenStore";
import { ref, watch, computed, onMounted } from "vue";
import { TrashIcon, PhotoIcon, AdjustmentsVerticalIcon, ExclamationTriangleIcon, PencilSquareIcon, PlusIcon, UserCircleIcon, BookmarkIcon, XCircleIcon, CheckIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon, FunnelIcon } from "@heroicons/vue/20/solid";
import { FormatCurrencyVND } from "../assets/formatCurrency";
import { instance } from "../assets/axios-instance";
import { showToast } from '../assets/Toastify';
const ShowLoading = ref(false);
const store = useToken();
const orders = ref([
  {
    id: 19,
    customerId: 3,
    status: 1,
    status1: 1,
    addressId: 1,
    createdAt: "2023-12-04T13:33:59.000Z",
    updatedAt: "2023-12-04T13:33:59.000Z",
    deletedAt: null,
    paymentData: {
      id: 15,
      paymentType: 2,
      status: 1,
      total: 300000,
      transaction: null,
      discountCode: "NGUYENHAU2",
      createdAt: "2023-12-04T13:33:59.000Z",
    },
    addressData: {
      id: 1,
      name: "Nguyen Cong Hau",
      phone: "0123456789",
      customerId: 2,
      city: "Ha Noi",
      district: "Ba Vi",
      commune: "Phong Van",
      street: "xom Giau",
      createdAt: "2023-11-29T09:52:39.000Z",
      updatedAt: "2023-11-29T09:59:19.000Z",
      deletedAt: null,
    },
  },
]);
const isWarningModalOpen = ref(false);
const isShowWarningModal = ref(false);
const indexChangeStatus = ref(null);
const selectedOrder = ref({
  id: 1,
  customerId: 1,
  status: 3,
  status1: 3,
  createdAt: "2023-12-07T16:34:47.000Z",
  updatedAt: "2023-12-07T16:34:47.000Z",
  deletedAt: null,
  orderItemData: [
    {
      id: 1,
      amount: 4,
      price: 100000,
      orderProductSizeColorData: {
        id: 3,
        price: 100000,
        productData: {
          id: 1,
          name: "Product 1",
          mainImage: "https://via.placeholder.com/500",
          categoryData: {
            id: 1,
            name: "Category 1",
          },
        },
        colorData: {
          id: 1,
          name: "Red",
        },
        sizeData: {
          id: 3,
          name: "M",
        },
      },
    },
    {
      id: 2,
      amount: 1,
      price: 100000,
      orderProductSizeColorData: {
        id: 1,
        price: 100000,
        productData: {
          id: 1,
          name: "Product 1",
          mainImage: "https://via.placeholder.com/500",
          categoryData: {
            id: 1,
            name: "Category 1",
          },
        },
        colorData: {
          id: 1,
          name: "Red",
        },
        sizeData: {
          id: 1,
          name: "XS",
        },
      },
    },
    {
      id: 3,
      amount: 1,
      price: 100000,
      orderProductSizeColorData: {
        id: 2,
        price: 100000,
        productData: {
          id: 1,
          name: "Product 1",
          mainImage: "https://via.placeholder.com/500",
          categoryData: {
            id: 1,
            name: "Category 1",
          },
        },
        colorData: {
          id: 1,
          name: "Red",
        },
        sizeData: {
          id: 2,
          name: "S",
        },
      },
    },
  ],
  paymentData: {
    id: 1,
    paymentType: 2,
    status: 1,
    total: 300000,
    transaction: null,
    discountCode: "NGUYENHAU2",
    createdAt: "2023-12-07T16:34:47.000Z",
  },
  addressData: {
    id: 1,
    name: "Nguyen Cong Hau",
    phone: "0123456789",
    customerId: 2,
    city: "Ha Noi",
    district: "Ba Vi",
    commune: "Phong Van",
    street: "xom Giau",
    createdAt: "2023-11-29T09:52:39.000Z",
    updatedAt: "2023-11-29T09:59:19.000Z",
    deletedAt: null,
  },
});
const isOpenDetailOrder = ref(false);
const selectedFilter = ref("id"); // Giá trị mặc định của bộ lọc
const searchTerm = ref("");
const statusOrder = [
  { value: 1, label: 'Chờ xác nhận' },
  { value: 2, label: 'Đã Xác nhận' },
  { value: 3, label: 'Đang giao' },
  { value: 4, label: 'Đã giao' },
  { value: 0, label: 'Hủy' },
];
const paymentType = [
  { value: 1, label: 'Khi nhận hàng' },
  { value: 2, label: 'VNPay' },
]

const paymentStatus = [
  { value: 1, label: 'Chưa thanh toán' },
  { value: 2, label: 'Đã thanh toán' },
  { value: 0, label: 'Đã huỷ' },
  { value: -1, label: 'Hoàn tiền' },
]

const filteredOrders = ref([]);

const formattedDateTime = (time) => {
  // Sử dụng moment để định dạng thời gian
  return moment(time).format("HH:mm - DD/MM/yyyy");
};
const getAddressFull = (addressData) => {
  if (!addressData) return "";
  return `${addressData.street}, ${addressData.commune}, ${addressData.district}, ${addressData.city}`;
};

const getPaymentType = (value) => {
  const obj = paymentType.find(x => x.value == value);
  if (obj) return obj.label;
  return '';
}
const getPaymentStatus = (value) => {
  const obj = paymentStatus.find(x => x.value == value);
  if (obj) return obj.label;
  return '';
}


onMounted(async () => {
  ShowLoading.value = true;
  if (store.role == 1) {
    store.onSetCurrentPage({ index: 3, child: 0 });
  } else {
    store.onSetCurrentPage({ index: 1, child: 0 });
  }
  await loadData();
  loadFilter();
  ShowLoading.value = false;
})

const loadData = async () => {
  await instance.get(API.GETOrders)
    .then(res => {
      orders.value = res.data.data;
      orders.value.forEach(x => {
        x.status1 = x.status;
      })
    })
    .catch(err => {
      const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
      showToast(mess, true);
      console.error(mess, err);
    })
}

//search

const loadFilter = () => {
  const term = searchTerm.value.toString().toLowerCase().trim();
  switch (selectedFilter.value) {
    case "id":
      filteredOrders.value = orders.value.filter((order) =>
        order.id.toString().toLowerCase().includes(term)
      );
      break;
    case "name":
      filteredOrders.value = orders.value.filter((order) =>
        order.name.toString().toLowerCase().includes(term)
      );
      break;
  }
};

//search

const showDetails = async (id) => {
  isOpenDetailOrder.value = true;
  //await instance.get()

};

const closeDetails = () => {
  isOpenDetailOrder.value = false;
  //selectedOrder.value = null;
};
const onChangeStatusOrder = (index, isSelectOrder) => {
  if (!isSelectOrder) {
    indexChangeStatus.value = index;
    showWarningModal();
  }
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


const showWarningModal = async () => {
  isWarningModalOpen.value = true;
  await delay(100);
  isShowWarningModal.value = true;
};

const onChangeStatus = async () => {
  ShowLoading.value = true;
  try {
    const order_ = orders.value[indexChangeStatus.value];
    const form = new FormData();
    form.append("status", order_.status1);
    await instance.put(`${API.PUTStatusOrder}/${order_.id}`, form)
      .then(res => {
        orders.value[indexChangeStatus.value].status = orders.value[indexChangeStatus.value].status1;
        showToast("Cập nhật thành công");
      })
      .catch(err => {
        showToast("Lỗi", true);
        console.log(err);
      })
  } catch (error) { }
  ShowLoading.value = false;
  closeWarningModal();
};

const onCancelChangeStatus = () => {
  try {
    orders.value[indexChangeStatus.value].status1 = orders.value[indexChangeStatus.value].status;
    closeWarningModal();
  } catch (error) {

  }
}

const closeWarningModal = async () => {
  indexChangeStatus.value = null;
  isShowWarningModal.value = false;
  await delay(500);
  isWarningModalOpen.value = false;
};

</script>
