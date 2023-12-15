<template>
  <div>
    <div class="divide-y divide-gray-200">
      <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-700">Thông tin cá nhân</h2>
          <p class="mt-1 text-sm leading-6 text-gray-500">Cập nhật thông tin cá nhân liên quan đến tài khoản của bạn.</p>
        </div>

        <form class="md:col-span-2" @submit.prevent="submitEditForm">
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div class="col-span-full flex items-center gap-x-8">
              <img :src="personEdit.avatar" alt="avatar"
                class="h-32 w-32 flex-none rounded-lg bg-gray-800 object-cover" />
              <label for="image-upload" class="text-sm flex flex-col">
                <span type="submit"
                  class="rounded-md bg-indigo-600 mt-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 text-center w-20">
                  Chọn ảnh
                </span>
                <span>Lựa chọn ảnh đại diện</span>
              </label>
              <input @change="handleImageUpload" type="file" id="image-upload" accept="image/*" class="hidden" />
            </div>

            <div class="sm:col-span-3">
              <label for="id" class="block text-sm font-medium leading-6 text-gray-700">Mã người dùng</label>
              <div class="mt-2">
                <input type="text" v-model="user.id" disabled name="id" id="id" autocomplete="id"
                  class="block w-full rounded-md border-0 bg-gray-100 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="role" class="block text-sm font-medium leading-6 text-gray-700">Quyền hạn</label>
              <div class="mt-2">
                <input type="text" :value="user.role == 1 ? 'admin' : 'nhân viên'" disabled name="role" id="role"
                  autocomplete="role"
                  class="block w-full rounded-md border-0 bg-gray-100 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="col-span-full">
              <label for="username" class="block text-sm font-medium leading-6 text-gray-700">Tên đăng nhập</label>
              <div class="mt-2">
                <input id="username" v-model="user.username" name="username" type="text" autocomplete="username" disabled
                  class="block w-full rounded-md border-0 bg-gray-100 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="col-span-full">
              <label for="fullname" class="flex items-center gap-x-2 text-sm font-medium leading-6 text-gray-700">
                <span>Tên đầy đủ</span>
                <PencilSquareIcon class="h-3.5 w-3.5" />
              </label>
              <div class="mt-2">
                <input id="fullname" v-model="personEdit.fullname" name="fullname" type="text" autocomplete="fullname"
                  class="block w-full rounded-md border-0 bg-gray-100 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
              </div>
            </div>


          </div>

          <div class="mt-8 flex">
            <button type="submit" v-if="personEdit.fileImage || personEdit.fullname != user.fullname" class="flex rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold 
                                        gap-x-2 text-white shadow-sm hover:bg-indigo-500 
                                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                                         focus-visible:outline-indigo-600">
              <BookmarkIcon class="h-5 w-5" aria-hidden="true" />
              Lưu
            </button>
            <span v-else class="flex rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold 
                                          gap-x-2 text-gray-300 shadow-sm">
              <BookmarkIcon class="h-5 w-5" aria-hidden="true" />
              Lưu
            </span>
          </div>
        </form>
      </div>

      <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-700">Thay đổi mật khẩu</h2>
          <p class="mt-1 text-sm leading-6 text-gray-500">Cập nhật mật khẩu liên quan đến tài khoản của bạn.</p>
        </div>

        <form class="md:col-span-2" @submit.prevent="submitEditPasswordForm">
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div class="col-span-full">
              <label for="current-password" class="flex items-center gap-x-2 text-sm font-medium leading-6 text-gray-700">
                <span>Mật khẩu hiện tại</span>
                <PencilSquareIcon class="h-3.5 w-3.5" />
              </label>
              <div class="mt-2">
                <input id="current-password" v-model="personEdit.password0" name="current_password" type="password"
                  autocomplete="current-password"
                  class="block w-full rounded-md border-gray-300 bg-gray-100 py-1.5 text-gray-700 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-full">
              <label for="new-password" class="flex items-center gap-x-2 text-sm font-medium leading-6 text-gray-700">
                <span>Mật khẩu mới</span>
                <PencilSquareIcon class="h-3.5 w-3.5" />
              </label>
              <div class="mt-2">
                <input id="new-password" name="new_password" v-model="personEdit.password1" type="password"
                  autocomplete="new-password"
                  class="block w-full rounded-md border-gray-300 bg-gray-100 py-1.5 text-gray-700 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-full">
              <label for="confirm-password" class="flex items-center gap-x-2 text-sm font-medium leading-6 text-gray-700">
                <span>Xác nhận mật khẩu</span>
                <PencilSquareIcon class="h-3.5 w-3.5" />
              </label>
              <div class="mt-2">
                <input id="confirm-password" name="confirm_password" v-model="personEdit.password2" type="password"
                  autocomplete="new-password"
                  class="block w-full rounded-md border-gray-300 bg-gray-100 py-1.5 text-gray-700 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>
          </div>

          <div class="mt-8 flex">
            <button type="submit"
              v-if="personEdit.password1.length > 0 && personEdit.password2.length > 0 && personEdit.password0.length > 0"
              class="flex rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold
                                                                                                            gap-x-2
                                                                                                             text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
                                                                                                              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <BookmarkIcon class="h-5 w-5" aria-hidden="true" />
              Lưu
            </button>
            <span v-else class="flex rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold 
                                            gap-x-2 text-gray-300 shadow-sm">
              <BookmarkIcon class="h-5 w-5" aria-hidden="true" />
              Lưu
            </span>
          </div>
        </form>
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
import { FwbSpinner } from 'flowbite-vue'
import { ref, onMounted } from "vue";
import { useToken } from "../store/tokenStore";
import { PencilSquareIcon, BookmarkIcon } from "@heroicons/vue/20/solid";
import { PaperClipIcon } from "@heroicons/vue/20/solid";
import { instance } from "../assets/axios-instance";
import * as API from '../assets/API'
import * as validate from '../assets/validate'
import { showToast } from "../assets/Toastify";
const ShowLoading = ref(false);
const personEdit = ref({
  avatar: '',
  fileImage: null,
  fullname: '',
  password1: '',
  password2: '',
  password0: '',
});
const user = ref({
  "id": 1,
  'role': 1,
  "username": "admin",
  "fullname": "admin",
  "avatar": "http://res.cloudinary.com/dbsfgxrjz/image/upload/v1701961064/admin-image/myeu6h3aquyqhg40d1qi.jpg",
});
const store = useToken();

onMounted(() => {
  store.onSetCurrentPage({ index: 99, child: 99 });
  personEdit.value = {
    avatar: '',
    fileImage: null,
    fullname: '',
    password1: '',
    password2: '',
    password0: '',
  }
  loadData();
})

const loadData = async () => {
  updateLoading(true);
  await instance.get(`${API.GETAccount}/${store.id}`)
    .then(res => {
      user.value = res.data.data;
      personEdit.value.fullname = user.value.fullname;
      personEdit.value.avatar = user.value.avatar;
      personEdit.value.fileImage = null;
      personEdit.value.password1 = '';
      personEdit.value.password2 = '';
      personEdit.value.password0 = '';
    })
    .catch(err => {
      const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
      showToast(mess, true);
      console.error(mess, err);
    })
  updateLoading(false);
}

const updateData = async () => {
  updateLoading(true);
  await instance.get(`${API.GETAccount}/${store.id}`)
    .then(res => {
      user.value = res.data.data;
      personEdit.value.fullname = user.value.fullname;
      personEdit.value.avatar = user.value.avatar;
      personEdit.value.fileImage = null;
      store.onSetFullName(res.data.data.fullname);
      store.onSetAvatar(res.data.data.avatar);
    })
    .catch(err => {
      const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
      showToast(mess, true);
      console.error(mess, err);
    })
  updateLoading(false);
}

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    personEdit.value.fileImage = file;
    const reader = new FileReader();
    reader.onload = () => {
      personEdit.value.avatar = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

const submitEditForm = async () => {
  const form = new FormData();
  let check = false;
  if (personEdit.value.fileImage) {
    check = true;
    form.append("avatar", personEdit.value.fileImage);
  }

  if (personEdit.value.fullname != user.value.fullname) {
    if (validate.CheckNameRegex(personEdit.value.fullname)) {
      check = true;
      form.append("fullname", personEdit.value.fullname);
    } else {
      showToast("Tên không đúng định dạng", true);
      return;
    }

  }
  if (!check) return;
  updateLoading(true);

  await instance.put(`${API.PUTAccount}/${user.value.id}`, form)
    .then(res => {
      showToast("Cập nhật thành công", false);
      updateData();
    })
    .catch(err => {
      const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
      showToast(mess, true);
      console.error(mess, err);
    })
  updateLoading(false);
}

const submitEditPasswordForm = async () => {

  if (personEdit.value.password1.toString().length == 0 || personEdit.value.password2.toString().length == 0 || personEdit.value.password0.toString().length == 0) {
    showToast("Dữ liệu bị thiếu", true);
    return;
  }
  if (personEdit.value.password1 != personEdit.value.password2) {
    showToast("Mật khẩu không giống nhau");
    return;
  }
  updateLoading(true);

  const formLogin = new FormData();
  formLogin.append('password', personEdit.value.password0);
  formLogin.append('username', user.value.username);
  let check = false;
  await instance.post(API.SignIn, formLogin)
    .then(res => {
      store.onSetToken(res.data.data.token);
    })
    .catch(err => {
      const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
      showToast(mess, true);
      console.error(mess, err);
      check = true;
    })
  if (check) {
    showToast("Mật khẩu cũ không chính xác ", true);
    updateLoading(false);
    return;
  }


  const form = new FormData();
  form.append("password", personEdit.value.password1);
  await instance.put(`${API.PUTAccount}/${user.value.id}`, form)
    .then(res => {
      showToast("Cập nhật thành công", false);
      personEdit.value.password0 = '';
      personEdit.value.password1 = '';
      personEdit.value.password2 = '';
    })
    .catch(err => {
      const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
      showToast(mess, true);
      console.error(mess, err);
      console.error(err);
    })
  updateLoading(false);
}
const updateLoading = (check) => {
  ShowLoading.value = check;
}
</script>
