<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-4 pb-2">
                <div class="flex shrink-0 items-center">
                  <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company" />
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <button v-if="!item.children" @click="ToRouter(Item.href)" :class="[
                            item.current
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                          ]">
                            <component :is="item.icon" :class="[
                              item.current
                                ? 'text-indigo-600'
                                : 'text-gray-400 group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0',
                            ]" aria-hidden="true" />
                            {{ item.name }}
                          </button>
                          <Disclosure as="div" v-else v-slot="{ open }">
                            <DisclosureButton :class="[
                              item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                              'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700',
                              'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700',
                            ]">
                              <component :is="item.icon" :class="[
                                item.current
                                  ? 'text-indigo-600'
                                  : 'text-gray-400 ',
                                'h-6 w-6 shrink-0',
                              ]" aria-hidden="true" />
                              {{ item.name }}
                              <ChevronRightIcon :class="[
                                open
                                  ? 'rotate-90 text-gray-500'
                                  : 'text-gray-400',
                                'ml-auto h-5 w-5 shrink-0',
                              ]" aria-hidden="true" />

                            </DisclosureButton>
                            <DisclosurePanel as="ul" class="mt-1 px-2">
                        <li v-for="subItem in item.children" :key="subItem.name">
                          <!-- 44px -->
                          <DisclosureButton as="a" @click="ToRouter(subItem.href)" :class="[
                            subItem.current
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                            'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700',
                          ]">{{ subItem.name }}</DisclosureButton>
                        </li>
                        </DisclosurePanel>
                        </Disclosure>
                    </li>
                  </ul>
                  </li>
                  <li class="mt-auto">
                    <button @click="logOut"
                      class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                      <ArrowLeftOnRectangleIcon class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                        aria-hidden="true" />
                      Đăng xuất
                    </button>
                  </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div class="flex h-16 shrink-0 items-center">
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company" />
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="(item, index) in navigation" :key="index">
                  <button v-if="!item.children" @click="ToRouter(item.href)" :class="[
                    item.current
                      ? 'bg-gray-50 text-indigo-600'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                  ]">
                    <component :is="item.icon" :class="[
                      item.current
                        ? 'text-indigo-600'
                        : 'text-gray-400 ',
                      'h-6 w-6 shrink-0',
                    ]" aria-hidden="true" />
                    {{ item.name }}
                  </button>
                  <Disclosure as="div" v-else v-slot="{ open }">
                    <DisclosureButton :class="[
                      item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                      'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700',
                    ]">
                      <component :is="item.icon" :class="[
                        item.current
                          ? 'text-indigo-600'
                          : 'text-gray-400 ',
                        'h-6 w-6 shrink-0',
                      ]" aria-hidden="true" />
                      {{ item.name }}
                      <ChevronRightIcon :class="[
                        open ? 'rotate-90 text-gray-500' : 'text-gray-400',
                        'ml-auto h-5 w-5 shrink-0',
                      ]" aria-hidden="true" />
                    </DisclosureButton>
                    <DisclosurePanel as="ul" class="mt-1 px-2">
                <li v-for="subItem in item.children" :key="subItem.name">
                  <!-- 44px -->
                  <DisclosureButton as="a" @click="ToRouter(subItem.href)" :class="[
                    subItem.current
                      ? 'bg-gray-50 text-indigo-600'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                    'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700',
                  ]">{{ subItem.name }}
                  </DisclosureButton>
                </li>
                </DisclosurePanel>
                </Disclosure>
            </li>
          </ul>
          </li>
          <li class="mt-auto">
            <a href="/"
              class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
              <ArrowLeftOnRectangleIcon class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                aria-hidden="true" />
              Đăng xuất
            </a>
          </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="lg:pl-72">
      <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>

        <ol role="list" class="flex items-center space-x-4" v-if="store.currentPage.index >= 0">
          <li>
            <div>
              <span class="text-gray-400 hover:text-gray-500">
                <span v-if="store.currentPage.index != -1 && store.currentPage.index != 99">
                  <component :is="navigation[store.currentPage.index].icon" class="h-5 w-5 flex-shrink-0"
                    aria-hidden="true" />
                  <span class="sr-only">{{ navigation[store.currentPage.index].name }}</span>
                </span>
                <span v-else-if="store.currentPage.index == 99">
                  <component :is="userEditNavi.icon" class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <span class="sr-only">{{ userEditNavi.name }}</span>
                </span>
              </span>
            </div>
          </li>
          <li
            v-if="store.currentPage.index != -1 && store.currentPage.index != 99 && navigation[store.currentPage.index].children && store.currentPage.child != -1">
            <div class="flex items-center">
              <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <span class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">{{
                navigation[store.currentPage.index].children[store.currentPage.child].name }}</span>
            </div>
          </li>
          <li v-else-if="store.currentPage.index == 99">
            <div class="flex items-center">
              <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <span class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">{{
                userEditNavi.name }}</span>
            </div>
          </li>

        </ol>
        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form class="relative flex flex-1" action="#" method="GET"></form>
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <!-- Profile dropdown -->
            <Menu as="div" class="relative">
              <MenuButton class="-m-1.5 flex items-center p-1.5" @click="ToRouter('/admin/userEdit')">
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full bg-gray-50" :src='store.avatar' alt="" />
                <span class="hidden lg:flex lg:items-center ml-4 text-sm font-semibold leading-6 text-gray-900">
                  {{ store.fullName
                  }}
                </span>
              </MenuButton>
              <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <router-view></router-view>
          <!-- Your content -->
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronRightIcon, HomeIcon, UserCircleIcon } from "@heroicons/vue/20/solid";
import { useToken } from '../../store/tokenStore';
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
const router = useRouter();
const store = useToken();
const navigation = ref([
  { name: "Trang chủ", href: "/admin/home", icon: HomeIcon, current: true },
  {
    name: "Khách hàng",
    icon: UsersIcon,
    current: false,
    children: [{ name: "Danh sách khách hàng", href: "/admin/user", current: false }],
  },
  {
    name: "Quản lý sản phẩm",
    icon: FolderIcon,
    current: false,
    children: [
      {
        name: "Danh mục",
        href: "/admin/category",
        current: false
      },
      {
        name: "Danh sách sản phẩm",
        href: "/admin/product",
        current: false
      },
    ],
  },
  {
    name: "Quản lý đơn hàng",
    icon: CalendarIcon,
    current: false,
    children: [
      {
        name: "Danh sách đơn hàng",
        href: "/admin/transactionList",
        current: false
      },
    ],
  },
  {
    name: "Nhân viên",
    icon: DocumentDuplicateIcon,
    current: false,
    children: [
      {
        name: "Tài khoản nhân viên",
        href: "/admin/account_staff",
        current: false
      },
    ],
  },
]);
const userEditNavi = {
  name: "Tài khoản cá nhân",
  icon: UserCircleIcon,
}
const sidebarOpen = ref(false);
onMounted(() => {
  if (store.id == -1) {
    logOut();
    return;
  }
  console.log("oke1");
  if (store.role == 0) {
    navigation.value.splice(4, 1);
    navigation.value.splice(1, 1);
    navigation.value.splice(0, 1);
  }
  console.log(store.fullName, "fullname")
})

const logOut = () => {
  store.onSetGoToLogin(true);
}

const ToRouter = (route) => {
  router.push(route);
}

watch(() => store.isGoToLogin, (newValue, oldValue) => {
  if (newValue) {
    window.location.href = '/';
    return;
  }
})

watch(() => store.currentPage, (newValue, oldValue) => {
  resetCurrentSelectPage();

  if (newValue.index != -1 && newValue.index != 99) {
    try {
      navigation.value[newValue.index].current = true;
      if (navigation.value[newValue.index].children && newValue.child != -1) {
        try {
          navigation.value[newValue.index].children[newValue.child].current = true;
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
})

const resetCurrentSelectPage = () => {
  navigation.value.forEach(x => {
    x.current = false;
    if (x.children) {
      x.children.forEach(y => {
        y.current = false;
      })
    }
  })
}

</script>
