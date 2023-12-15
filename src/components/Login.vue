<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="submitForm">
        <div>
          <label for="userName" class="block text-sm font-medium leading-6 text-gray-900">Tên đăng nhập</label>
          <div class="mt-2">
            <input id="userName" name="text" type="userName" autocomplete="userName" v-model="formData.userName"
              :class="{ 'border-2 border-red-500': errors.userName }" @input="clearError('userName')"
              class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <div v-if="errors.userName" class="text-red-500 text-xs font-semibold mt-1">
              {{ `* ${errors.userName}` }}
            </div>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Mật khẩu
            </label>

          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" autocomplete="current-password"
              v-model="formData.password" :class="{ 'border-2 border-red-500': errors.password }"
              @input="clearError('password')"
              class="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <div v-if="errors.password" class="text-red-500 text-xs font-semibold mt-1">
              {{ `* ${errors.password}` }}
            </div>
          </div>
        </div>

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Đăng nhập
          </button>
          <Button label="Submit" />
        </div>
      </form>
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
import * as API from '../assets/API'
import { showToast } from '../assets/Toastify'
import { instance } from '../assets/axios-instance'
import { useRouter } from "vue-router";
import { useToken } from '../store/tokenStore';
const ShowLoading = ref(false);
const store = useToken();
const router = useRouter();
const errors = ref({
  userName: null,
  password: null,
});

const formData = ref({
  userName: "",
  password: "",
});

onMounted(() => {
  store.onResetStore();
})

const submitForm = async () => {

  let check = false;
  errors.value = {}; // Reset errors

  if (!formData.value.userName.trim()) {
    errors.value.userName = "Thông tin trống";
    check = true;
  }

  if (!formData.value.password.trim()) {
    errors.value.password = "Thông tin trống";
    check = true;
  }
  if (check) return;
  ShowLoading.value = true;
  const formAccount = new FormData();
  formAccount.append('username', formData.value.userName);
  formAccount.append('password', formData.value.password);
  await login(false, formAccount);
  ShowLoading.value = false;
}

const login = async (toMain, form) => {

  await instance.post(API.SignIn, form)
    .then(res => {
      if (toMain) {
        if (store.role == 1) {
          router.push("/admin/home");
        } else {
          router.push('/admin/transactionList');
        }

      } else {
        store.onSetFullProperty(res.data.data);
        login(true, form);
      }
    })
    .catch(err => {
      const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
      showToast(mess, true);
      console.error(mess, err);
      return;
    })
}

function clearError(field) {
  errors.value[field] = null;
}
</script>
