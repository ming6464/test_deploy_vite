<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="-mt-2 bg-white border-b border-gray-200 " style="position: fixed;top : 70px;right: 0px;left: 0px;">
      <div class="lg:ml-72 px-4">
        <div class="flex justify-center gap-x-2 items-center border-gray-300 py-4">
          <div class="mr-2">
            <button class="group flex items-center font-medium mr-2" @click="openFilterModal">
              <FunnelIcon class="mr-2 h-5 w-5 flex-none text-gray-700 group-hover:text-gray-500" />
            </button>
          </div>
          <div
            class="flex items-center justify-between border border-gray-400 border-r-0 rounded-md shadow-sm md:w-8/12 sm:w-6/12">
            <input type="text" placeholder="Tìm kiếm ..." v-model="searchTerm"
              class="rounded-md w-full rounded-r-none border-0 px-3 py-2 text-sm focus:border-gray-50 focus:border-0" />
            <select v-model="selectedFilter" class="border-0 px-3 py-2 text-sm focus:outline-0">
              <option value="id">ID</option>
              <option value="name">Tên</option>
            </select>
            <button type="button" @click="applyFilter()"
              class="inline-flex items-center rounded-md rounded-l-none bg-indigo-600 px-1 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <MagnifyingGlassIcon class="h-7 w-7" aria-hidden="true" />
            </button>
          </div>
          <button type="button" @click="openUpdateModal(-1)"
            class="inline-flex self-end items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <PlusIcon class="h-5 w-5" aria-hidden="true" />
            Thêm tài khoản
          </button>
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
                  Id
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Tên đầy đủ
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Tên đăng nhập
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Quyền hạn
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Trạng thái
                </th>
                <th scope="col" class="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Hoạt động
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="(person, index) in listIemShow" :key="index">
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-900 sm:pl-2">
                  <div class="font-medium text-gray-900">{{ person.id }}</div>
                </td>
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-0">
                  <div class="flex items-center">
                    <div class="h-11 w-11 flex-shrink-0">
                      <img class="h-11 w-11 rounded-full" :src="person.avatar" alt="" />
                    </div>
                    <div class="ml-4">
                      <div>
                        {{ makeShortText(person.fullname, 40) }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-900 sm:pl-2">
                  <div>{{ person.username }}</div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0">
                  <span
                    class="rounded-md text-center bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {{ person.role == 1 ? "Admin" : "Nhân viên" }}
                  </span>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0">
                  <select :disabled="!canChangeStatus(person.id, person.role)" v-model="person.status1"
                    @change="showChangeStatusModal(person.id, person.status1, person.role)"
                    class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-indigo-500">
                    <option v-for="option in statusActive" :key="option.value" :value="option.value">
                      {{ option.label }}
                    </option>
                  </select>
                </td>
                <td class="py-4 text-sm font-medium  gap-x-3">
                  <button type="button" @click="openUpdateModal(person.id)"
                    class="text-indigo-600 hover:text-indigo-900 mr-1">
                    <PencilSquareIcon class="h-5 w-5" aria-hidden="true" />
                    <span class="sr-only">Edit, {{ person.id }}</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <nav v-if="filteredList.length > itemOnPage" class="flex justify-end mt-5">
      <v-pagination v-model="currentPage" :pages="totalPages" :range-size="1" active-color="#DCEDFF"
        @update:modelValue="onPageChange" />
    </nav>
  </div>
  <!-- Edit Modal -->
  <div v-show="isOpenModal">
    <div :class="{ 'opacity-100': isShowModal }"
      class="fixed inset-0 transition-opacity ease-in-out duration-500 opacity-0">
      <div class="flex items-center justify-center min-h-screen">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-50"></div>
        <div
          class="relative bg-white p-6 rounded-lg max-w-5xl max-h-[600px] overflow-y-auto overflow-hidden lg:ml-64 mt-10">
          <h1 class="text-xl font-bold mb-4 text-center">
            {{
              IdSelected >= 0 ? "Sửa thông tin tải khoản" : "Thêm tài khoản"
            }}
          </h1>
          <!-- Form for editing person details -->
          <form @submit.prevent="submitUdpateForm" class="mx-auto mt-8 w-96 sm:mt-7">
            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div class="col-span-full flex items-center flex-row gap-x-4">
                <img v-if='staffEdit.avatar && staffEdit.avatar.toString().length > 0' :src="staffEdit.avatar" alt=""
                  class="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover" />
                <div class="p-4 rounded-lg border border-dashed mr-5 border-gray-900/25" v-else>
                  <PhotoIcon class="h-20 w-23 object-cover opacity-50" />
                </div>
                <div v-if='IdSelected < 0'>
                  <label for="image-upload" class="text-sm flex flex-col">
                    <span>Lựa chọn ảnh đại diện</span>
                    <span type="submit"
                      class="rounded-md bg-indigo-600 mt-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 text-center w-20">
                      Chọn ảnh
                    </span>
                  </label>
                  <input :disabled="IdSelected >= 0" type="file" id="image-upload" @change="handleImageUpload"
                    accept="image/*" class="hidden" />
                </div>

              </div>

              <div class="sm:col-span-2">
                <label for="fullName" class="block text-sm font-semibold leading-6 text-gray-900">Tên đầy đủ</label>
                <div class="mt-2.5">
                  <input type="text" name="fullName" :disabled="IdSelected >= 0" v-model="staffEdit.fullname"
                    id="fullName" autocomplete="fullName"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="userName" class="block text-sm font-semibold leading-6 text-gray-900">Tên đăng nhập</label>
                <div class="mt-2.5">
                  <input type="text" name="userName" :disabled="IdSelected >= 0" v-model="staffEdit.username"
                    id="userName" autocomplete="userName"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="sm:col-span-2" v-if="IdSelected < 0">
                <label for="password" class="block text-sm font-semibold leading-6 text-gray-900">Mật khẩu</label>
                <div class="mt-2.5">
                  <input type="password" name="password" v-model="staffEdit.password" id="password"
                    autocomplete="password"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="sm:col-span-2" v-if="IdSelected < 0">
                <label for="password2" class="block text-sm font-semibold leading-6 text-gray-900">Nhập lại mật
                  khẩu</label>
                <div class="mt-2.5">
                  <input type="password" name="password2" v-model="password2" id="phone" autocomplete="password2"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <!-- phân quyền động -->
              <div class="sm:col-span-2">
                <label for="role" class="block text-sm font-semibold leading-6 text-gray-900">Quền hạn</label>
                <div class="mt-2" id='role' name='role'>
                  <SwitchGroup as="div" class="flex items-center justify-between">
                    <span class="flex flex-grow flex-col">
                      <SwitchDescription as="span" class="block text-sm font-normal leading-6 text-gray-900">Admin
                      </SwitchDescription>
                    </span>
                    <Switch v-model="staffEdit.isAdmin" :disabled="roleSelected == 1" :class="[
                      staffEdit.isAdmin ? 'bg-indigo-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
                    ]">
                      <span aria-hidden="true" :class="[
                        staffEdit.isAdmin
                          ? 'translate-x-5'
                          : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                      ]" />
                    </Switch>
                  </SwitchGroup>
                </div>
              </div>
            </div>
            <div class="mt-8 flex">
              <button type="button" @click="closeUpdateModal"
                class="rounded-md  px-3 py-2 mr-2 text-sm font-semibold text-white shadow-sm
                                                                                                                                                                                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                :class="{
                  'bg-indigo-500 focus-visible:outline-indigo-500 hover:bg-indigo-400': roleSelected != 0,
                  'bg-red-500 focus-visible:outline-red-500 hover:bg-red-400': roleSelected == 0
                }">
                {{ roleSelected == 0 ? 'Huỷ' : 'Trở về' }}
              </button>
              <button type="submit" v-if="roleSelected == 0"
                class="rounded-md bg-indigo-500 px-3 py-2 ml-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- delete modal -->
  <div v-show="isDeleteModalOpen">
    <div :class="{ 'opacity-100': isShowDeleteModal }"
      class="transition-opacity ease-in-out duration-500 opacity-0 relative z-10" aria-labelledby="modal-title"
      role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-10 w-screen">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            class="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg lg:ml-64 mt-10">
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                    Thay đổi trạng thái
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500" v-if="statusSelected == 0">
                      Bạn có chắc chắn muốn chuyển sang trang thái ngừng hoạt động danh mục này không?
                      Tất cả dữ tất cả dữ liệu sẽ bị ảnh hưởng
                    </p>
                    <p class="text-sm text-gray-500" v-else>
                      Bạn có chắc chắn muốn chuyển sang trang thái hoạt động danh mục này không?
                      Tất cả dữ tất cả dữ liệu sẽ bị ảnh hưởng
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="sm:col-span-2 mx-16 my-2" v-if="roleSelected == 1">
              <label for="password2" class="block text-sm font-semibold leading-6 text-gray-900">Mật khẩu xác nhận</label>
              <div class="mt-2">
                <input type="password" name="password2" v-model="password2" id="phone" autocomplete="password2"
                  class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button" @click="onChangeStatus"
                class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                <TrashIcon class="h-5 w-5" aria-hidden="true" />
                Xoá
              </button>
              <button type="button"
                class="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm hover:text-gray-600 sm:w-auto"
                @click="closeChangeStatusModal">
                <div class="h-5 w-5 opacity-0" aria-hidden="true" />
                Hủy
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- filter modal -->
  <!-- <div v-if="isOpenFilterModal" class="fixed inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

      <div class="relative bg-white p-8 rounded-lg lg:ml-64 mt-10">
        <h3 class="text-lg font-semibold mb-4 text-center">
          Bộ lọc tìm kiếm
        </h3>

        <form @submit.prevent="applyFilterModal">
          <div class="mb-4">
            <label for="status" class="block text-base font-medium text-gray-700">
              Trạng thái sản phẩm :
            </label>
            <RadioGroup v-model="filterVal.statusProduct" class="mt-2">
              <div class="grid grid-cols-3 gap-3">
                <RadioGroupOption as="template" v-for="option in statusProducts" :key="option.name" :value="option"
                  :disabled="!option.inStock" v-slot="{ active, checked }">
                  <div
                    class="cursor-pointer focus:outline-none flex items-center 
                                                                                      justify-center rounded-md py-3 px-1 text-xs sm:flex-1 font-normal"
                    :class="[
                      active ? 'ring-2 ring-indigo-600 ring-offset-2' : '',
                      checked ? 'bg-indigo-600 text-white hover:bg-indigo-500' :
                        'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50']">
                    <RadioGroupLabel as="span">{{ option.name }}</RadioGroupLabel>
                  </div>
                </RadioGroupOption>
              </div>
            </RadioGroup>
          </div>

          <div class="flex justify-between items-center">
            <div>
              <button type="button" @click="closeFilterModal" class="mr-2 text-gray-500 hover:text-gray-700 mx-6">
                Hủy
              </button>
              <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
                Áp dụng
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  </div> -->
  <!-- filter modal -->

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
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { useToken } from "../store/tokenStore";
import {
  TrashIcon, PhotoIcon, PencilSquareIcon, PlusIcon, UserCircleIcon, BookmarkIcon, XCircleIcon,
  CheckIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon, FunnelIcon
} from "@heroicons/vue/20/solid";

import { ref, watch, computed, onMounted } from "vue";
import {
  Switch,
  SwitchDescription,
  SwitchGroup,
  SwitchLabel,
} from "@headlessui/vue";
import * as CheckRegex from "../assets/validate";
import { showToast } from "../assets/Toastify";
import * as API from '../assets/API';
import { instance } from '../assets/axios-instance';
import { FwbSpinner } from 'flowbite-vue'
const store = useToken();
const ShowLoading = ref(false);

const staffs = ref([
  {
    "id": 1,
    "username": "admin8",
    "password": "$2b$10$WeV6.qT91W7o4y.xc65YNe8u0cZ8o6PYrs1.pWZcW0xxhlY4bA0bq",
    "role": 1,
    "fullname": "admin",
    "avatar": "http://res.cloudinary.com/dbsfgxrjz/image/upload/v1701790879/admin-image/ro0e208y5nqcgccstxvt.jpg",
  }
]);
const selectedFilter = ref("id"); // Giá trị mặc định của bộ lọc
const searchTerm = ref("");
// modal
const isOpenModal = ref(false);
const isShowModal = ref(false);
const isDeleteModalOpen = ref(false);
const isShowDeleteModal = ref(false);
const password2 = ref("");
const IdSelected = ref(-1);
const roleSelected = ref(-1);
const staffEdit = ref({});
const isAnySwitchOn = ref(true);

// phân trang và search
const listIemShow = ref([]);
const filteredList = ref([]);
const itemOnPage = ref(10);
const currentPage = ref(1);
const totalPages = ref(7);
const isOpenFilterModal = ref(false);
//phân trang

// trang thái
const statusSelected = ref(0);
const statusActive = [
  { value: 1, label: "Đang hoạt động" },
  { value: 0, label: "Ngừng hoạt động" },
]
// trạng thái

onMounted(() => {
  if (store.role == 1) {
    store.onSetCurrentPage({ index: 4, child: 0 });
  }
  loadData();
});

const loadData = async (isDelete) => {
  updateLoad(true);
  await instance.get(API.GETAccounts)
    .then(res => {
      staffs.value = res.data.data;
      staffs.value.forEach(x => {
        if (x.deletedAt) {
          x.status = 0;
          x.status1 = 0;
        } else {
          x.status = 1;
          x.status1 = 1;
        }
      })
    })
    .catch(err => {
      const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
      showToast(mess, true);
      console.error(mess, err);
      return;
    })
  updateList(false, isDelete ? true : false);
  updateLoad(false);
}

const canChangeStatus = (id, role) => {
  if (store.id == id) return false;
  return true;
}

// search  và update phân trang
const onPageChange = (page) => {
  const start = (page - 1) * itemOnPage.value; // Giả sử mỗi trang có x phần tử
  let end = start + itemOnPage.value;
  if (start < filteredList.value.length) {
    currentPage.value = page;
    if (end > filteredList.value.length) end = filteredList.value.length;
    listIemShow.value = filteredList.value.slice(start, end);
  } else {
    listIemShow.value = [];
  }
};

const applyFilter = () => {
  updateList(true);
}

const updateList = (isSearch, isDelete) => {
  const term = searchTerm.value.toString().toLowerCase().trim();
  switch (selectedFilter.value.toLowerCase()) {
    case "id":
      filteredList.value = staffs.value.filter((person) =>
        person.id.toString().toLowerCase().includes(term)
      );
      break;
    case "name":
      filteredList.value = staffs.value.filter(
        (person) =>
          person.fullname.toString().toLowerCase().includes(term)
      );
      break;
  }
  totalPages.value = Math.ceil(filteredList.value.length / itemOnPage.value);
  if (isSearch) {
    onPageChange(1);
  } else {
    let page = currentPage.value;
    if (isDelete) {
      if (page > totalPages.value) page = totalPages.value;
    }
    onPageChange(page);
  }
};
// search  và update phân trang

const openUpdateModal = async (id) => {
  isAnySwitchOn.value = true;
  isOpenModal.value = true;
  IdSelected.value = id;
  if (staffEdit.value.fileImage) {
    staffEdit.value.fileImage = null;
  }
  password2.value = '';
  if (id >= 0) {
    const editAcc = staffs.value.find(x => x.id == IdSelected.value);
    staffEdit.value = { ...editAcc };
    staffEdit.value.password = '';
    staffEdit.value.isAdmin = staffEdit.value.role == 1 ? true : false;
  } else {
    staffEdit.value = {
      "username": "",
      "password": "",
      "role": 0,
      "fullname": "",
      "avatar": "",
      'isAdmin': false,
    };
  }
  roleSelected.value = staffEdit.value.role;
  await delay(100);
  isShowModal.value = true;
};

const submitUdpateForm = async () => {

  if (!checkvalidate(true)) return;
  updateLoad(true);

  const formAccount = new FormData();

  if (IdSelected.value >= 0) {
    const oldAcc = staffs.value.find(x => x.id == IdSelected.value);
    let checkEdit = false;
    if (staffEdit.value.isAdmin && oldAcc.role == 0) {
      checkEdit = true;
      formAccount.append('role', 1);
    }
    if (checkEdit) {
      await instance.put(`${API.PUTAccount}/${IdSelected.value}`, formAccount)
        .then(res => {
          //updateAccountWithId(IdSelected.value);
          loadData();
          showToast("Cập nhật thành công");
        })
        .catch(err => {
          const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
          showToast(mess, true);
          console.error(mess, err);
        })
    }

  } else {
    if (!checkvalidate(false)) {
      updateLoad(false);
      return;
    }
    formAccount.append('username', staffEdit.value.username);
    formAccount.append('password', staffEdit.value.password);
    formAccount.append('fullname', staffEdit.value.fullname);
    formAccount.append('role', staffEdit.value.isAdmin ? 1 : 0);
    formAccount.append('avatar', staffEdit.value.fileImage);
    await instance.post(API.POSTAccount, formAccount)
      .then(res => {
        showToast("Thêm mới thành công");
        loadData();
      })
      .catch(err => {
        const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
        showToast(mess, true);
        console.error(mess, err);
      })
  }
  closeUpdateModal();
  updateLoad(false);
};

const checkvalidate = (isEdit) => {
  if (!CheckRegex.CheckNameRegex(staffEdit.value.fullname)) {
    showToast("Tên đầy đủ không hợp lệ. Vui lòng kiểm tra lại", true);
    return false;
  }
  if (!isEdit) {
    if (!staffEdit.value.fileImage) {
      showToast("Ảnh đại diện bị thiếu", true);
      return false;
    }
    if (!CheckRegex.CheckUserNameRegex(staffEdit.value.username)) {
      showToast("Tên tài khoản không hợp lệ. Vui lòng kiểm tra lại", true);
      return false;
    }

    if (staffEdit.value.password.toString().trim().length == 0) {
      showToast("Mật khẩu bị thiếu", true);
      return false;
    }

    if (staffEdit.value.password != password2.value) {
      showToast("Mật khẩu không trùng khớp", true);
      return false;
    }
  }
  return true;
}

const closeUpdateModal = async () => {
  isShowModal.value = false;
  await delay(500);
  isOpenModal.value = false;
  staffEdit.value = {};
};

const showChangeStatusModal = async (id, status, role) => {
  statusSelected.value = status;
  password2.value = '';
  IdSelected.value = id;
  roleSelected.value = role;
  isDeleteModalOpen.value = true;
  await delay(100);
  isShowDeleteModal.value = true;
};

const onChangeStatus = async () => {
  updateLoad(true)
  try {

    if (roleSelected.value == 1) {
      if (password2.value.toString().trim().length == 0) {
        showToast("Mật khẩu xác nhận bị thiếu", true);
        updateLoad(false);
        return;
      }
      const deleteAcc = staffs.value.find(x => x.id == IdSelected.value);
      if (!deleteAcc) {
        showToast("Lỗi", true);
        updateLoad(false)
        return
      }
      const formLogin = new FormData();
      formLogin.append("username", deleteAcc.username);
      formLogin.append("password", password2.value);
      let check = false;
      await instance.post(API.SignIn, formLogin)
        .catch(err => {
          check = true;
          const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
          showToast(mess, true);
          console.error(mess, err);
        })
      if (check) {
        password2.value = '';
        updateLoad(false);
        showToast("Mật khẩu xác nhận không chính xác ", true);
        return;
      }
    }

    await instance.delete(`${API.DELAccount}/${IdSelected.value}`)
      .then(res => {
        showToast("Thay đổi trạng thái thành công");
        loadData(true);
      })
      .catch(err => {
        const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
        showToast(mess, true);
        console.error(mess, err);
      })

  } catch (error) { }
  updateLoad(false);
  closeChangeStatusModal();
};

const closeChangeStatusModal = async () => {
  if (IdSelected.value >= 0) {
    const index = listIemShow.value.findIndex(x => x.id == IdSelected.value);
    if (index != -1) {
      listIemShow.value[index].status1 = listIemShow.value[index].status;
    }
  }
  isShowDeleteModal.value = false;
  await delay(500);
  isDeleteModalOpen.value = false;
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    staffEdit.value.fileImage = file;
    const reader = new FileReader();
    reader.onload = () => {
      staffEdit.value.avatar = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

const updateLoad = (check) => {
  ShowLoading.value = check;
}

// modal


// filter modal {

const applyFilterModal = () => {

}

const openFilterModal = () => {
  isOpenFilterModal.value = true;
}

const closeFilterModal = () => {
  isOpenFilterModal.value = false;
}

// filter modal}

const makeShortText = (text, numberCharacter) => {
  let shortText = text.toString().trim();
  if (shortText.length > numberCharacter) {
    shortText = shortText.substring(0, numberCharacter);
    shortText += '...';
  }
  return shortText;
}
</script>
