<template>
  <div class="px-4 sm:px-6 lg:px-8 -mt-4">
    <div class="-mt-2 bg-white border-b border-gray-200 " style="position: fixed;top : 70px;right: 0px;left: 0px;">
      <div class="lg:ml-72 px-4">
        <div class="flex justify-around items-center border-gray-300 py-4">
          <div
            class="flex items-center justify-between border border-gray-400 border-r-0 rounded-md shadow-sm md:w-8/12 sm:w-6/12">
            <input type="text" placeholder="Tìm kiếm ..." v-model="searchTerm"
              class="rounded-md w-full rounded-r-none border-0 px-3 py-2 text-sm focus:border-gray-50 focus:border-0" />
            <select v-model="selectedFilter" class="border-0 px-3 py-2 text-sm focus:outline-0">
              <option value="id">ID</option>
              <option value="name">Tên</option>
              <option value="email">Email</option>
            </select>
            <button type="button" @click="applyFilter"
              class="inline-flex items-center rounded-md rounded-l-none bg-indigo-600 px-1 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <MagnifyingGlassIcon class="h-7 w-7" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flow-root mt-14">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="py-4 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  ID
                </th>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-4">
                  Ảnh
                </th>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Họ và tên
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Hoạt động
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="(person, index) in listItemShow" :key="index">
                <td class="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                  <div class="text-gray-900">{{ person.customerData.id }}</div>
                </td>
                <td class="whitespace-nowrap py-3 pl-4 pr-3 text-sm sm:pl-0">
                  <div class="flex items-center">
                    <div class="h-20 w-20 flex-shrink-0">
                      <img class="h-18 w-20 rounded-full" :src="person.customerData.picture" alt="" />
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">{{ person.customerData.name }}</div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">{{ person.customerData.email }}</div>
                </td>
                <td class="py-4">
                  <button class=" hover:text-indigo-900 ml-10" @click="openDetailUser(person.userId)">
                    <AdjustmentsVerticalIcon class="h-5 w-5" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <nav v-if="filteredList.length > 7" class="flex justify-end mt-5">
      <v-pagination v-model="currentPage" :pages="totalPages" :range-size="1" active-color="#DCEDFF"
        @update:modelValue="onPageChange" />
    </nav>
  </div>
  <!-- loadding -->
  <div v-if="ShowLoading" class="w-full h-full flex justify-center items-center"
    style="position: fixed; top: 0; left: 0;z-index: 110;">
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
import { FwbSpinner } from 'flowbite-vue'
import { showToast } from "../assets/Toastify";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { ref, onMounted } from "vue";
import { TrashIcon, PhotoIcon, PencilSquareIcon, PlusIcon, AdjustmentsVerticalIcon, UserCircleIcon, BookmarkIcon, XCircleIcon, CheckIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon, FunnelIcon } from "@heroicons/vue/20/solid";
import { instance } from '../assets/axios-instance';
import { useToken } from "../store/tokenStore";
import * as API from '../assets/API'


const selectedFilter = ref('id');
const searchTerm = ref('');
const store = useToken();
const ShowLoading = ref(false);
const users = ref([]);
const filteredList = ref([]);
const listItemShow = ref([]);
const itemOnPage = ref(10);
const currentPage = ref(1);
const totalPages = ref(7);

onMounted(async () => {
  if (store.role == 1) {
    store.onSetCurrentPage({ index: 1, child: 0 });
  } else {
    store.onSetCurrentPage({ index: 1, child: 0 });
  }

  //fake data
  //fakeData(100);

  await LoadCustomerList();
  applyFilter();

})

const fakeData = (size) => {
  users.value = [];
  for (let i = 0; i < size; i++) {
    users.value.push(
      {
        "id": 1,
        "customerData": {
          "id": 1,
          "userId": "109513530698162110613",
          "name": "Công Hậu Nguyễn",
          "email": "conghaunguyen909@gmail.com",
          "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ0nTdGS63DZwe4CjBeFwCIvs83KvY8ihCz91szt0v4WaY=s96-c"
        }
      }
    )
  }
}

const onPageChange = (page) => {
  const start = (page - 1) * itemOnPage.value; // Giả sử mỗi trang có x phần tử
  const end = start + itemOnPage.value;
  if (start < filteredList.value.length) {
    if (end < filteredList.value.length) {
      listItemShow.value = filteredList.value.slice(start, end);
    } else {
      listItemShow.value = filteredList.value.slice(start, filteredList.value.length);
    }

  } else {
    listItemShow.value = [];
  }
};

const LoadCustomerList = async () => {
  ShowLoading.value = true;
  await instance.get(API.GETCustomer)
    .then(res => {
      users.value = res.data.data;
    })
    .catch(err => {
      const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
      showToast(mess, true);
      console.error(mess, err);
    });
  ShowLoading.value = false;
}

const applyFilter = () => {
  const term = searchTerm.value.toString().toLowerCase().trim();
  // switch (selectedFilter.value.toLowerCase()) {
  //   case "id":
  //     filteredList.value = users.value.filter((person) =>
  //       person.userId.toString().toLowerCase().includes(term)
  //     );
  //     break;
  //   case "name":
  //     filteredList.value = users.value.filter(
  //       (person) =>
  //         person.fullname.toString().toLowerCase().includes(term)
  //     );
  //     break;
  //   case "email":
  //     filteredList.value = users.value.filter(
  //       (person) =>
  //         person.email.toString().toLowerCase().includes(term)
  //     );
  //     break;
  // }
  filteredList.value = users.value;
  totalPages.value = Math.ceil(filteredList.value.length / itemOnPage.value);
  onPageChange(1);
}

const openDetailUser = (userId) => {

}

</script>