
<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="-mt-2 bg-white border-b border-gray-200 " style="position: fixed;top : 70px;right: 0px;left: 0px;">
      <div class="lg:ml-72 px-4">
        <div class="flex justify-center gap-x-2 items-center border-gray-300 py-4">
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
          <button type="button" @click="openAddModal(false)" v-if='store.role == 1'
            class="inline-flex self-end items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <PlusIcon class="h-5 w-5" aria-hidden="true" />
            Thêm mới
          </button>
          <div v-else class="opacity-0 px-3 py-2 "></div>
        </div>
      </div>
    </div>

  </div>
  <div class="mt-8 flow-root">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-4 lg:-mx-6">
      <div class="inline-block min-w-full py-2 align-middle sm:px-4 lg:px-6">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" class="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                ID
              </th>
              <th scope="col" class="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-4">
                Ảnh
              </th>
              <th scope="col" class="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Tên Sản Phẩm
              </th>
              <th scope="col" class="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Trang thái
              </th>
              <th scope="col" class="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                v-if='store.role == 1'>
                Hoạt động
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="(person) in listIemShow" :key="person.id">
              <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                <div class="font-medium text-gray-900">{{ person.id }}</div>
              </td>
              <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                <div class="flex items-center">
                  <div class="h-20 w-20 flex-shrink-0">
                    <img class="h-20 w-24" :src="person.image" alt="" />
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0">
                <div>{{ makeShortText(person.name, 40) }}</div>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0">
                <select v-model="person.status1" @change="showChangeStatusOrderModal(person.id, person.status1)"
                  class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-indigo-500">
                  <option v-for="option in statusActive" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </td>
              <td v-if='store.role == 1'>
                <div class="mx-4 space-x-3">
                  <button @click="openEditModal(person)" class="text-indigo-600 hover:text-indigo-900">
                    <PencilSquareIcon class="h-5 w-5" aria-hidden="true" />
                    <span class="sr-only">{{ person.id }},</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <nav v-if="filteredList.length > itemOnPage" class="flex justify-end t-5">
    <v-pagination v-model="currentPage" :pages="totalPages" :range-size="1" active-color="#DCEDFF"
      @update:modelValue="onPageChange" />
  </nav>

  <!-- ADD MODAL -->
  <div v-if="isAddModalOpen" class="fixed inset-0 overflow-y-auto ">
    <div class="flex items-center justify-center min-h-screen">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

      <div class="relative bg-white p-8 rounded-lg w-96 lg:ml-64 mt-10">
        <h3 class="text-lg font-semibold mb-4 text-center">
          Thêm danh mục
        </h3>

        <!-- Form for adding a new product -->
        <form @submit.prevent="addNewProduct">
          <div class="mb-4">
            <label for="newProductName" class="block text-sm font-medium text-gray-700">
              Tên sản phẩm
            </label>
            <input v-model="newProduct.name" type="text" id="newProductName" name="newProductName"
              class="mt-1 p-2 w-full border rounded-md" />
          </div>
          <div class="mb-4">
            <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Ảnh sản phẩm</label>
            <div class="flex items-center flex-row mt-1" id='cover-photo'>
              <img :src="newProduct.image" v-if="newProduct.image && newProduct.image.length > 0"
                class="h-32 max-w-xs object-cover mr-5 rounded-lg" />
              <div v-else class="p-5 rounded-lg border border-dashed mr-5 border-gray-900/25">
                <PhotoIcon class="h-32 max-w-xs object-cover opacity-50" />
              </div>
              <label for="image-upload" class="text-sm flex flex-col">
                <span type="submit"
                  class="rounded-md bg-indigo-600 mt-2 py-2 text-sm font-semibold                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                text-white shadow-sm hover:bg-indigo-500 text-center w-20">
                  Chọn ảnh
                </span>
              </label>
              <input type="file" id="image-upload" ref="imageInputRef" @change="handleImageUploadADD" accept="image/*"
                class="hidden" />
            </div>
          </div>


          <!-- ... other fields ... -->

          <div class="flex justify-end">
            <button type="button" class="mr-2 text-gray-500 hover:text-gray-700 mx-6" @click="closeAddModal">
              Hủy
            </button>
            <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- ADD MODAL -->


  <!-- Edit Modal -->
  <div v-if="isEditModalOpen" class="fixed inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

      <div class="relative bg-white p-8 rounded-lg w-96 lg:ml-64 mt-10">
        <h3 class="text-lg font-semibold mb-4 text-center">Chỉnh sửa</h3>

        <!-- Form for editing person details -->
        <form @submit.prevent="submitEditForm">
          <div class="mb-4">
            <label for="editedName" class="block text-sm font-medium text-gray-700">
              Tên Sản Phẩm
            </label>
            <input v-model="editedPerson.name" type="text" id="editedName" name="editedName"
              class="mt-1 p-2 w-full border rounded-md" />
          </div>
          <div class="mb-4">
            <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Ảnh sản phẩm</label>
            <div class="flex items-center flex-row mt-1" id='cover-photo'>
              <img :src="editedPerson.image" v-if="editedPerson.image && editedPerson.image.length > 0"
                class="h-32  max-w-xs object-cover mr-5 rounded-lg" />
              <div v-else class="p-5 rounded-lg border border-dashed mr-5 border-gray-900/25">
                <PhotoIcon class="h-32 max-w-xs object-cover opacity-50" />
              </div>
              <label for="image-upload" class="text-sm flex flex-col">
                <span type="submit"
                  class="rounded-md bg-indigo-600 mt-2 py-2 text-sm font-semibold                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                text-white shadow-sm hover:bg-indigo-500 text-center w-20">
                  Chọn ảnh
                </span>
              </label>
              <input type="file" id="image-upload" ref="imageInputRef" @change="handleImageUpload" accept="image/*"
                class="hidden" />
            </div>
          </div>
          <!-- ... other fields ... -->
          <div class="flex justify-end">
            <button type="button" class="mr-2 text-gray-500 hover:text-gray-700 mx-3" @click="closeEditModal">
              Thoát
            </button>
            <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
              Lưu
            </button>
          </div>
        </form>
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
            class="relative lg:ml-64 mt-10 transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
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
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button" @click="onChangeStatusOrder"
                class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                Xác nhận
              </button>
              <button type="button" @click="closeChangeStatusOrderModal"
                class="inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm  sm:ml-3 sm:w-auto">
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
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { useToken } from '../store/tokenStore';
import { FwbSpinner } from 'flowbite-vue'
import { ref, onMounted, watch } from "vue";
import { TrashIcon, PhotoIcon, PencilSquareIcon, PlusIcon, UserCircleIcon, BookmarkIcon, XCircleIcon, CheckIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon, FunnelIcon } from "@heroicons/vue/20/solid";
import { instance } from '../assets/axios-instance';
import * as API from "../assets/API";
import { showToast } from '../assets/Toastify'
const ShowLoading = ref(false);
const categories = ref([]);
const listIemShow = ref([]);
const filteredList = ref([]);
const isEditModalOpen = ref(false);
const selectedId = ref(-1);
const editedPerson = ref({
  id: null,
  name: "",
  image: "",
});
const isDeleteModalOpen = ref(false);
const isShowDeleteModal = ref(false);
const selectedFilter = ref("id"); // Giá trị mặc định của bộ lọc
const searchTerm = ref("");
const store = useToken();
const statusSelected = ref(0);
const statusActive = [
  { value: 1, label: "Đang hoạt động" },
  { value: 0, label: "Ngừng hoạt động" },
]

// phân trang và search
const itemOnPage = ref(10);
const currentPage = ref(1);
const totalPages = ref(7);
//phân trang


onMounted(() => {
  if (store.role == 1) {
    store.onSetCurrentPage({ index: 2, child: 0 });
  } else {
    store.onSetCurrentPage({ index: 0, child: 0 });
  }
  updateCategories();
});

const updateCategories = async (isDelete) => {
  updateLoading(true);
  await instance.get(API.GETCategories)
    .then(res => {
      categories.value = res.data.data;
      categories.value.forEach(x => {
        if (x.deletedAt) {
          x.status = 0;
          x.status1 = 0;
        } else {
          x.status = 1;
          x.status1 = 1;
        }
      })
      updateList(false, isDelete ? true : false);
    })
    .catch(err => {
      const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
      showToast(mess, true);
      console.error(mess, err);
    });
  updateLoading(false);
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
      filteredList.value = categories.value.filter((person) =>
        person.id.toString().toLowerCase().includes(term)
      );
      break;
    case "name":
      filteredList.value = categories.value.filter(
        (person) =>
          person.name.toString().toLowerCase().includes(term)
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

const imageInputRef = ref(null);
//change status modal 

const showChangeStatusOrderModal = async (id, status) => {
  statusSelected.value = status;
  selectedId.value = id;
  isDeleteModalOpen.value = true;
  await delay(100);
  isShowDeleteModal.value = true;
}

const onChangeStatusOrder = async () => {
  updateLoading(true);
  try {
    await instance.delete(`${API.DELCategories}/${selectedId.value}`)
      .then(res => {
        const index = categories.value.findIndex(x => x.id == selectedId.value);
        if (index != -1) {
          updateCategories(true);
          showToast("Thay đổi trang thái thành công", false);
        } else {
          showToast("Lỗi", true);
        }
      })
      .catch(err => {
        const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
        showToast(mess, true);
        console.error(mess, err);
      });
    closeChangeStatusOrderModal();
  } catch (error) { }
  updateLoading(false);
}

const closeChangeStatusOrderModal = async () => {
  if (selectedId.value >= 0) {
    const index = listIemShow.value.findIndex(x => x.id == selectedId.value);
    if (index != -1) {
      listIemShow.value[index].status1 = listIemShow.value[index].status;
    }
  }


  isShowDeleteModal.value = false;
  await delay(500);
  isDeleteModalOpen.value = false;
}
//change status modal 

function openEditModal(person) {
  editedPerson.value = { ...person };
  selectedId.value = categories.value.indexOf(person);
  isEditModalOpen.value = true;
}

const submitEditForm = async () => {
  if (!editedPerson.value) return;
  const oldCategory = categories.value.find(x => x.id == editedPerson.value.id);
  if (!oldCategory) return;
  updateLoading(true);
  const formData = new FormData();
  if (editedPerson.value.file) {
    formData.append('image', editedPerson.value.file);
  }
  if (oldCategory.name != editedPerson.value.name) {
    formData.append('name', editedPerson.value.name);
  }
  isEditModalOpen.value = false;
  // Update the person in the array
  await instance.put(`${API.PUTCategories}/${editedPerson.value.id}`, formData)
    .then(res => {
      let index = categories.value.findIndex(x => x.id == selectedId);
      categories.value.splice(index, 1, res.data.data);
      updateCategories();
      showToast("Cập nhật thành công", false);
    })
    .catch(err => {
      const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
      showToast(mess, true);
      console.error(mess, err);
    });

  updateLoading(false);
}

function closeEditModal() {
  isEditModalOpen.value = false;
  imageInputRef.value.value = null;
}
function handleImageUpload() {
  try {
    const fileInput = imageInputRef.value;

    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      editedPerson.value.file = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target.result) {
          editedPerson.value.image = e.target.result;

        } else {
          console.error("Image loading failed.", file);
        }
      };
      reader.readAsDataURL(file);
    }
  } catch (error) {
    console.error("Error handling image upload:", error);
  }
}
//ADD
const isAddModalOpen = ref(false);
const newProduct = ref();
const openAddModal = () => {
  newProduct.value = {
    id: null,
    name: "",
    image: "",
  };
  isAddModalOpen.value = true;
};
const closeAddModal = () => {
  isAddModalOpen.value = false;
};
const addNewProduct = async () => {
  if (!newProduct.value.file || !newProduct.value.name || newProduct.value.name.toString().trim().length == 0) {
    showToast("Thông tin thiếu", true);
    return;
  }
  updateLoading(true);
  const formData = new FormData();
  formData.append('name', newProduct.value.name);
  formData.append('image', newProduct.value.file);
  await instance.post(API.POSTAddCategories, formData)
    .then((res) => {
      updateCategories();
      showToast("Thêm mới thành công", false);
      closeAddModal();
    })
    .catch(err => {
      const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
      showToast(mess, true);
      console.error(mess, err);
    });
  updateLoading(false);

};
const handleImageUploadADD = (event) => {
  const fileInput = event.target;
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newProduct.value.image = e.target.result;
      newProduct.value.file = file;
    };
    reader.readAsDataURL(file);
  }
};


//loading {
const updateLoading = (check) => {
  ShowLoading.value = check;
}
// } Loading
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const makeShortText = (text, numberCharacter) => {
  let shortText = text.toString().trim();
  if (shortText.length > numberCharacter) {
    shortText = shortText.substring(0, numberCharacter);
    shortText += '...';
  }
  return shortText;
}

</script>
i
