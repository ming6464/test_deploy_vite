<template>
  <div>
    <!-- Layout List Product -->
    <div class="px-4 sm:px-6 lg:px-8" v-if="!isUpdateModalOpen">
      <div class="-mt-2 bg-white border-b border-gray-200 " style="position: fixed;top : 70px;right: 0px;left: 0px;">
        <div class="lg:ml-72 px-4">
          <div class="flex justify-around items-center border-gray-300 py-4">
            <div class="flex justify-between">

              <button class="group flex items-center font-medium mr-2" @click="openOptionModal">
                <AdjustmentsHorizontalIcon class="mr-2 h-5 w-5 flex-none text-gray-700 group-hover:text-gray-500"
                  aria-hidden="true" />
              </button>

              <button class="group flex items-center font-medium mr-2" @click="openFilterModal">
                <FunnelIcon class="mr-2 h-5 w-5 flex-none text-gray-700 group-hover:text-gray-500" aria-hidden="true"
                  :class="{ 'group-hover:text-orange-500 text-orange-600': numberFilter > 0 }" />
              </button>


              <button class="group flex items-center font-medium text-gray-700" @click="changeSort">
                <img v-if='filterVal.sortPrice == 1' class="h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                  src="https://img.icons8.com/external-creatype-glyph-colourcreatype/64/external-descending-miscellaneous-user-interface-v1-creatype-glyph-colourcreatype.png"
                  alt="external-descending-miscellaneous-user-interface-v1-creatype-glyph-colourcreatype" />
                <img v-if='filterVal.sortPrice == 0' class="h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                  src="https://img.icons8.com/external-creatype-glyph-colourcreatype/64/external-descending-miscellaneous-user-interface-v1-creatype-glyph-colourcreatype-2.png"
                  alt="external-descending-miscellaneous-user-interface-v1-creatype-glyph-colourcreatype-2" />
                <sapn v-if="filterVal.sortPrice >= 2">Filter</sapn>
              </button>

            </div>
            <div
              class="flex items-center justify-between border border-gray-400 border-r-0 rounded-md shadow-sm md:w-8/12 sm:w-6/12">
              <input type="text" v-model="filterVal.keyword" placeholder="Tìm kiếm ..."
                class="rounded-md w-full rounded-r-none border-0 px-3 py-2 text-sm focus:border-gray-50 focus:border-0" />
              <button type="button" @click="searchOrApplyFilterModal"
                class="inline-flex items-center rounded-md rounded-l-none bg-indigo-600 px-1 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <MagnifyingGlassIcon class="h-7 w-7" aria-hidden="true" />
              </button>
            </div>

            <button type="button" @click="openUpdateProduct(false)" v-if='store.role == 1'
              class="inline-flex self-end items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <PlusIcon class="h-5 w-5" aria-hidden="true" />
              Thêm mới
            </button>
            <div v-else class="opacity-0 px-3 py-2 "></div>
          </div>
        </div>
      </div>
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-7 lg:-mx-4">
          <div class="inline-block min-w-full py-2 align-middle">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th v-if="optionModal.id" scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    ID
                  </th>
                  <th v-if="optionModal.picture" scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Ảnh
                  </th>
                  <th v-if="optionModal.name" scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Tên sản phẩm
                  </th>
                  <th v-if="optionModal.category" scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Danh mục
                  </th>
                  <th v-if="optionModal.priceDefault" scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Giá ban đầu
                  </th>
                  <th v-if="optionModal.timeSale" scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Thời gian Sale
                  </th>
                  <th v-if="optionModal.priceSale" scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Giá Sale
                  </th>
                  <th v-if="optionModal.price" scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Giá bán
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Trạng thái
                  </th>
                  <th v-if="store.role == 1" scope="col"
                    class="p-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Hoạt động
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="product in products" :key="product.id">
                  <td v-if="optionModal.id" class="whitespace-nowrap px-3 py-5 text-sm text-gray-900 sm:pl-2">
                    {{ product.id }}
                  </td>
                  <td v-if="optionModal.picture" class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div class="flex items-center">
                      <div class="h-20 w-20 flex-shrink-0">
                        <img class="h-20 w-24" :src="product.mainImage" alt="" />
                      </div>
                    </div>
                  </td>
                  <td v-if="optionModal.name" class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0">
                    {{ makeShortText(product.name, 40) }}
                  </td>
                  <td v-if="optionModal.category" class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0">
                    {{ makeShortText(product.categoryData.name, 40) }}
                  </td>
                  <td v-if="optionModal.priceDefault" class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0">
                    {{ FormatCurrencyVND(product.price) }}
                  </td>
                  <td v-if="optionModal.timeSale" class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0">
                    <div v-if="product.saleStart">
                      <div>{{ formatTime(product.saleStart) }}</div>
                      <div>{{ formatTime(product.saleEnd) }}</div>
                    </div>
                    <divv-else>Null</divv-else>
                  </td>
                  <td v-if="optionModal.priceSale" class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0">
                    <div v-if="product.salePrice">{{ FormatCurrencyVND(product.salePrice) }}</div>
                    <div v-else>Null</div>
                  </td>
                  <td v-if="optionModal.price" class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0">
                    <div :class="{ 'text-red-600 font-semibold text-base': getPrice(product).isSale }">
                      {{ FormatCurrencyVND(getPrice(product).value) }}</div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0">
                    <select v-model="product.status1" @change="showChangeStatusModal(product.id, product.status1)"
                      class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-indigo-500">
                      <option v-for="option in statusActive" :key="option.value" :value="option.value">
                        {{ option.label }}
                      </option>
                    </select>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0">
                    <div class="flex justify-start gap-x-3" v-if="store.role == 1">
                      <button @click="openUpdateProduct(true, product.id)" class="text-indigo-600 hover:text-indigo-900">
                        <PencilSquareIcon class="h-5 w-5" aria-hidden="true" />
                        <span class="sr-only">Edit, {{ product.id }}</span>
                      </button>

                      <!-- <button @click="openDeleteModal(product.id)" class="text-red-700 hover:text-indigo-900">
                        <TrashIcon class="h- w-5" aria-hidden="true" />
                        <span class="sr-only">Play, {{ product.id }}</span>
                      </button> -->

                      <button @click="openSaleModal(product.id)" class="text-orange-400 hover:text-indigo-900">
                        <BoltIcon class="h- w-5" aria-hidden="true" />
                      </button>

                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <nav v-if="filterVal.totalPages > 0" class="flex justify-end mt-5">
        <v-pagination v-model="filterVal.page" :pages="filterVal.totalPages" :range-size="1" active-color="#DCEDFF"
          @update:modelValue="loadFilter" />
      </nav>
    </div>

    <!-- Layout List Product -->

    <!-- update product -->
    <form v-if="isUpdateModalOpen" @submit.prevent="submitEditForm">
      <div class="space-y-12 mb-10">
        <!-- Thông tin cơ bản -->
        <div>
          <h1 class="font-medium text-xl">Thông tin cơ bản</h1>
          <div class="mt-5 mx-2">
            <div class="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label for="productName" class="block text-sm font-medium leading-6 text-gray-900">Tên sản phẩm</label>
                <div class="mt-1 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                  <input type="text" v-model="updateProduct.name" name="productName" id="productName"
                    autocomplete="productName"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    placeholder="Áo ...." />
                </div>
              </div>
              <!-- thể loại -->
              <div class="sm:col-span-3">
                <label for="productName" class="block text-sm font-medium leading-6 text-gray-900">Danh mục</label>
                <div class="relative mt-1 rounded-md">
                  <select v-model="updateProduct.categoryData.id"
                    class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                    <option v-for="(category) in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
              </div>
              <!-- thể loại -->
            </div>
          </div>
        </div>
        <!-- Thông tin cơ bản -->

        <!-- Chi tiết Sản phẩm -->
        <div>
          <h1 class="font-medium text-xl">Chi tiết Sản phẩm</h1>
          <div class="mt-5 mx-2">
            <!-- thêm ảnh -->
            <div class="col-span-full">
              <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Ảnh sản phẩm</label>
              <div class="flex items-center flex-row mt-1 ">
                <img :src="updateProduct.mainImage" v-if="updateProduct.mainImage.length > 0"
                  class="h-52 max-w-xs object-cover mr-5 rounded-lg" />
                <div v-else class="p-5 rounded-lg border border-dashed mr-5 border-gray-900/25">
                  <PhotoIcon class="h-20 w-20 opacity-50" />
                </div>
                <label for="image-upload" class="text-sm flex flex-col">
                  <span>Lựa chọn ảnh đại diện cho sản phẩm</span>
                  <span type="submit"
                    class="rounded-md bg-indigo-600 mt-2 py-2 text-sm font-semibold
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         text-white shadow-sm hover:bg-indigo-500 text-center w-20">
                    Chọn ảnh
                  </span>
                </label>
                <input type="file" id="image-upload" ref="imageInputRef" @change="handleImageUpload" accept="image/*"
                  class="hidden" />
              </div>
            </div>
            <!-- thêm ảnh -->

            <!-- Mô tả sản phẩm -->
            <div class="mt-6">
              <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Mô tả sản phẩm sản
                phẩm</label>
              <textarea id="myTextarea" placeholder="Thông tin sản phẩm ..." v-model="updateProduct.description"
                class="w-full mt-1 h-32 p-2 text-base rounded-lg border border-solid border-gray-900/25 focus:outline-none focus:border-indigo-500"></textarea>
            </div>
            <!-- Mô tả sản phẩm -->
          </div>
        </div>
        <!-- Chi tiết Sản phẩm -->

        <!-- thông tin bán hàng -->
        <div>
          <h1 class="font-medium text-xl">Thông tin Bán hàng</h1>
          <div class="mt-5 mx-2">
            <div class="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <!-- Giá bán lẻ -->
              <div class="sm:col-span-full">
                <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Giá bán lẻ</label>
                <div class="mt-1">
                  <input v-model="updateProduct.price" @input="validateQuantityPrice()" type="number" min="0"
                    name="first-name" id="first-name" autocomplete="given-name"
                    class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <p class="text-sm font-normal">Giá tiền: {{ FormatCurrencyVND(updateProduct.price) }}</p>
              </div>
              <!-- Giá bán lẻ -->
              <!-- thêm số lượng sản phẩm -->
              <div class="sm:col-span-full mt-4">
                <div class="overflow-x-auto mb-4">
                  <table class="min-w-full bg-white border border-gray-300 rounded-md">
                    <thead>
                      <tr>
                        <th class="py-2 px-4 border-b">Kích cỡ</th>
                        <th class="py-2 px-4 border-b">Màu sản phẩm</th>
                        <th class="py-2 px-4 border-b">Số lượng</th>
                        <th class="py-2 px-4 border-b"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in productData" :key="index" class="hover:bg-gray-100 transition">
                        <td class="py-2 px-4 border-b">
                          <div class="relative">
                            <select v-model="item.sizeData.id" @change="
                              ChooseCombobox(
                                false,
                                index,
                                $event.target.value
                              )
                            "
                              class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                              <option v-for="(size, sizeIndex) in sizeOptions" :key="sizeIndex" :value="size.id">
                                {{ size.name }}
                              </option>
                            </select>
                          </div>
                        </td>
                        <td class="py-2 px-4 border-b">
                          <div class="relative">
                            <select v-model="item.colorData.id" @change="
                              ChooseCombobox(true, index, $event.target.value)
                            "
                              class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                              <option v-for="(color, colorIndex) in colorOptions" :key="colorIndex" :value="color.id">
                                {{ color.name }}
                              </option>
                            </select>
                          </div>
                        </td>
                        <td class="py-2 px-4 border-b">
                          <input type="number" v-model="item.amount" @input="validateQuantityColorSize(index)"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600" />
                        </td>
                        <td v-if="index > 0 && !(isEditProduct && !item.isNew)" class="py-2 px-4 border-b">
                          <button @click="removeItem(index)" type="button"
                            class="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-xs md:text-base">
                            Xoá
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button @click="addItem" type="button"
                  class="bg-green-500 hover:bg-green-600 text-sm font-semibold text-white py-2 px-4 rounded inline-flex items-center">
                  <PlusIcon class="h-5 w-5" aria-hidden="true" />
                  Thêm thành phần
                </button>
              </div>
              <!-- thêm số lượng sản phẩm -->
            </div>
          </div>
        </div>
        <!-- thông tin bán hàng -->
      </div>

      <div class="flex items-center justify-between py-2 px-3 border-2 w-full bg-gray-50 rounded-lg"
        style="position: fixed; bottom : 0; right : 0;">
        <h2 class=" lg:ml-72 text-base font-semibold">Xác nhận quá trình ?</h2>
        <div class="flex gap-x-6">
          <button type="button" @click="onCloseUpdateProduct"
            class="flex rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
            <BackspaceIcon class="h-5 w-5" aria-hidden="true" />
            Trở về
          </button>
          <button type="submit"
            class="flex rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <BookmarkIcon class="h-5 w-5" aria-hidden="true" />
            Lưu
          </button>
        </div>
      </div>
    </form>
    <!-- update product -->

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
                    class="mx-auto  flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
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
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" @click="onChangeStatus"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                  Xác nhận
                </button>
                <button type="button" @click="closeChangeStatusModal"
                  class="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm hover:bg-gray-100 sm:ml-3 sm:w-auto">
                  Huỷ
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- delete modal -->
    <!-- sale modal -->
    <div v-show="isSaleModalOpen" class="fixed inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
        <div class="relative bg-white p-8 rounded-lg w-96 lg:ml-64 mt-10">
          <h3 class="text-lg font-semibold mb-4 text-center">
            Cập nhật sale
          </h3>
          <form>
            <!-- <div class="mb-4">
              <label for="saleStart" class="block text-sm font-medium text-gray-700">
                Ngày bắt đầu
              </label>
              <VueDatePicker class="mt-1 py-1.5 w-full" v-model="saleStart" id="saleStart" name="saleStart"
                placeholder="Ngày bắt đầu" text-input />
            </div>

            <div class="mb-4">
              <label for="saleEnd" class="block text-sm font-medium text-gray-700">
                Ngày kết thúc
              </label>
              <VueDatePicker class="mt-1 py-1.5 w-full" v-model="saleEnd" id="saleEnd" name="saleEnd"
                placeholder="Ngày kết thúc" text-input />
            </div> -->

            <div class="mb-4">
              <label for="salePrice" class="block text-sm font-medium text-gray-700">
                Giá bán
              </label>
              <input type="number" v-model="salePrice" @input="validateQuantityPriceSale()" id="salePrice"
                name="salePrice" placeholder="Giá bán"
                class="mt-1 p-1.5 px-2.5 w-full border border-gray-200 rounded-md" />
              <p class="text-sm font-normal">Giá tiền : {{ FormatCurrencyVND(salePrice) }}</p>
            </div>

            <div class="flex justify-between">
              <button type="button" @click="resetSaleModal()"
                class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto">
                <TrashIcon class="h-5 w-5" aria-hidden="true" />
              </button>
              <div>
                <button type="button"
                  class="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm hover:text-gray-600 sm:w-auto"
                  @click="closeSaleModal()">
                  <div class="h-5 w-5 opacity-0" aria-hidden="true" />
                  Hủy
                </button>
                <button type="button" @click="submitSaleModal()"
                  class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:w-auto">
                  <BookmarkIcon class="w-5 h-5 mr-2" aria-hidden="true" />
                  Lưu
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- sale modal -->

    <!-- filter modal -->
    <div v-if="isOpenFilterModal" class="fixed inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

        <div class="relative bg-white p-8 rounded-lg lg:ml-64 mt-10">
          <h3 class="text-lg font-semibold mb-4 text-center">
            Bộ lọc tìm kiếm
          </h3>

          <!-- Form for adding a new product -->
          <form @submit.prevent="searchOrApplyFilterModal">
            <div class="mb-4">
              <label for="priceRange" class="block text-base font-medium text-gray-700">
                Khoảng giá :
              </label>
              <div id="priceRange" name='priceRange' class="flex items-center justify-between mt-1 gap-x-3">
                <div>
                  <label for="minPrice" class="block text-sm font-medium text-gray-700">
                    Tối thiểu :
                  </label>
                  <input v-model="filterVal.minPrice" type="number" min="0" id="minPrice" name="minPrice"
                    class="mt-1 p-2 w-full border rounded-md" />
                  <p class="text-sm font-normal">Giá tiền: {{ FormatCurrencyVND(filterVal.minPrice) }}</p>
                </div>
                <div>
                  <label for="maxPrice" class="block text-sm font-medium text-gray-700">
                    Tối đa :
                  </label>
                  <input v-model="filterVal.maxPrice" type="number" min="0" id="maxPrice" name="maxPrice"
                    class="mt-1 p-2 w-full border rounded-md" />
                  <p class="text-sm font-normal">Giá tiền: {{ FormatCurrencyVND(filterVal.maxPrice) }}</p>
                </div>
              </div>
            </div>

            <div class="mb-4">
              <label for="category" class="block text-base font-medium text-gray-700">
                Danh mục :
              </label>
              <div class="relative mt-1 rounded-md" id="category" name="category">
                <select v-model="filterVal.categoryId"
                  class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                  <option v-for="(category, index) in categoriesFilter" :key="index" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="mb-4">
              <label for="status" class="block text-base font-medium text-gray-700">
                Tình trạng :
              </label>
              <input type="checkbox" v-model="filterVal.isNew" /> Hàng mới
            </div>

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
                <button type="button" @click="ResetFilter" class="mr-2 text-gray-500 hover:text-gray-700 mx-6">
                  Thiết lập lại
                </button>
              </div>
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
    </div>
    <!-- filter modal -->

    <!-- option modal -->
    <div v-if="isOpenOptionModal" class="fixed inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

        <div class="relative bg-white p-8 rounded-lg lg:ml-64 mt-10">
          <h3 class="text-lg font-semibold mb-4 text-center">
            Bộ lọc hiển thị
          </h3>

          <!-- Form for adding a new product -->
          <form @submit.prevent="applyOption">
            <table class="mb-3">
              <tr>
                <td class="px-5 py-4">
                  <input type="checkbox" class="mr-2" v-model="optionModalUI.id" />
                  <span>ID</span>
                </td>
                <td class="px-5 py-4">
                  <input type="checkbox" class="mr-2" v-model="optionModalUI.picture" />
                  <span>Ảnh sản phẩm</span>
                </td>
              </tr>
              <tr>
                <td class="px-5 py-4">
                  <input type="checkbox" class="mr-2" v-model="optionModalUI.name" />
                  <span>Tên sản phẩm</span>
                </td>
                <td class="px-5 py-4">
                  <input type="checkbox" class="mr-2" v-model="optionModalUI.category" />
                  <span>Danh mục</span>
                </td>
              </tr>
              <tr>
                <td class="px-5 py-4">
                  <input type="checkbox" class="mr-2" v-model="optionModalUI.priceDefault" />
                  <span>Giá ban đầu</span>
                </td>
                <td class="px-5 py-4">
                  <input type="checkbox" class="mr-2" v-model="optionModalUI.timeSale" />
                  <span>Thời gian sale</span>
                </td>
              </tr>
              <tr>
                <td class="px-5 py-4">
                  <input type="checkbox" class="mr-2" v-model="optionModalUI.priceSale" />
                  <span>Giá sale</span>
                </td>
                <td class="px-5 py-4">
                  <input type="checkbox" class="mr-2" v-model="optionModalUI.price" />
                  <span>Giá bán</span>
                </td>
              </tr>
            </table>
            <div class="flex justify-end items-center">
              <button type="button" @click="closeOptionModal" class="mr-2 text-gray-500 hover:text-gray-700 mx-6">
                Hủy
              </button>
              <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
                Áp dụng
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- option modal -->

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
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import VueApexCharts from "vue3-apexcharts";
import moment from 'moment';
import { FwbSpinner } from 'flowbite-vue'
import { showToast } from '../assets/Toastify'
import { instance } from '../assets/axios-instance';
import {
  TrashIcon, PhotoIcon, PencilSquareIcon, PlusIcon, BoltIcon,
  UserCircleIcon, BookmarkIcon, XCircleIcon, CheckIcon, MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon, FunnelIcon, BackspaceIcon, PlayCircleIcon, PauseCircleIcon, FireIcon
} from "@heroicons/vue/20/solid";
import * as API from "../assets/API";
import { computed, ref, onMounted, watch } from "vue";
import { useToken } from "../store/tokenStore";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";
import { FormatCurrencyVND } from "../assets/formatCurrency";
const ShowLoading = ref(false);
const products = ref([
  {
    "id": 1,
    "name": "Product 1",
    "mainImage": "https://via.placeholder.com/500",
    "price": 100000,
    "description": "This is Product 1",
    "categoryData": {
      "id": 1,
      "name": "Category 1"
    },
    "productData": [
      {
        "id": 1,
        "amount": 100,
        "price": 100000,
        "colorData": {
          "id": 1,
          "name": "Red"
        },
        "sizeData": {
          "id": 1,
          "name": "XS"
        }
      },
    ]
  },
]);



// Update Product {
const itemProductDataDefault = {
  "amount": 0,
  "price": 0,
  "colorData": {
    "id": -1,
  },
  "sizeData": {
    "id": -1,
  },
  'isEdited': false,
}
const updateProduct = ref(null);
const productData = ref(null);
const sizeOptions = ref([
  { id: 1, name: "XS" },
  { id: 2, name: "S" },
  { id: 3, name: "M" },
]);
const colorOptions = ref(
  [
    { id: 1, name: "Red" },
    { id: 2, name: "Blue" },
    { id: 3, name: "Green" },
  ]
);
let updateProductGetAPI = null;
let productDataGetAPI = null;
let isEditProduct = false;
const isUpdateModalOpen = ref(false);
const categories = ref([
  { id: 1, name: "Áo polo" },
  { id: 2, name: "Áo thun" },
  { id: 3, name: "Áo sơ mi" },
  { id: 4, name: "Áo khoác" },
  { id: 5, name: "Áo vest" },
  { id: 6, name: "Áo len" },
  { id: 7, name: "Áo hoodie" },
]);
// } Update Product

// delete modal {
const isDeleteModalOpen = ref(false);
const isShowDeleteModal = ref(false);
const selectedId = ref(0);
const statusActive = [
  { value: 1, label: "Mở bán" },
  { value: 0, label: "Ngừng bán" },
]
const statusSelected = ref(0);
// } delete modal

// sale {
const isSaleModalOpen = ref(false);
const saleStart = ref(null);
const saleEnd = ref(null);
const salePrice = ref(0);
let idSale = -1;
// } sale

// filter option {
const statusProducts = [
  { name: 'Mở bán', inStock: true },
  { name: 'Ngừng bán', inStock: true },
]
const categoriesFilter = ref([
  { id: 1, name: "Áo polo" },
  { id: 2, name: "Áo thun" },
  { id: 3, name: "Áo sơ mi" },
  { id: 4, name: "Áo khoác" },
  { id: 5, name: "Áo vest" },
  { id: 6, name: "Áo len" },
  { id: 7, name: "Áo hoodie" },
]);
const filterVal = ref({
  categoryId: -1,
  sortPrice: 2,
  page: 1,
  pageSize: 10,
  totalPages: 1,
  keyword: '',
  minPrice: 0,
  maxPrice: 0,
  isNew: false,
  statusProduct: statusProducts[0],
});

let filterVal_ = {
  categoryId: -1,
  minPrice: 0,
  maxPrice: 0,
  isNew: false,
  keyword: '',
  statusProduct: statusProducts[0],
};
const numberFilter = ref(0);
const isOpenFilterModal = ref(false);
const isOpenOptionModal = ref(false);
// } filter option
const store = useToken();

// load Data {
onMounted(() => {
  if (store.role == 1) {
    store.onSetCurrentPage({ index: 2, child: 1 });
  } else {
    store.onSetCurrentPage({ index: 0, child: 1 });
  }

  updateCategories();
  updateSizes();
  updateColors();
  loadFilter();
});

const updateCategories = async () => {
  await instance.get(API.GETCategories).then(res => {
    categories.value = res.data.data;
    categoriesFilter.value = res.data.data;
  }).catch(err => {
    const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
    showToast(mess, true);
    console.error(mess, err);
  });
}

const updateSizes = async () => {
  await instance.get(API.GETSizes)
    .then(res => {
      sizeOptions.value = res.data.data;
    })
    .catch(err => {
      const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
      showToast(mess, true);
      console.error(mess, err);
    });
}
const updateColors = async () => {
  await instance.get(API.GETColors)
    .then(res => {
      colorOptions.value = res.data.data;
    })
    .catch(err => {
      const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
      showToast(mess, true);
      console.error(mess, err);
    });
}
// search  và update phân trang


// } load Data 



// Update Product {

const openUpdateProduct = async (isEditProduct_, id) => {
  // Clone the person object to avoid modifying the original data
  isEditProduct = isEditProduct_;
  if (isEditProduct_) {
    updateLoading(true);
    await instance.get(`${API.GETProduct}/${id}`)
      .then(res => {
        updateProductGetAPI = res.data.data;
        productDataGetAPI = updateProductGetAPI.productData;
        LoadUpdateData();
        updateLoading(false);
      })
      .catch(err => {
        updateLoading(false);
        const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
        showToast(mess, true);
        console.error(mess, err);
        return;
      });
  } else {
    updateProductGetAPI = {
      "name": "",
      "mainImage": "",
      "price": 0,
      "description": "Mô tả sản phẩm",
      "categoryData": {
        'id': categories.value[0].id,
      },
    };
    productDataGetAPI = [JSON.parse(JSON.stringify(itemProductDataDefault))];
    LoadUpdateData();
  }
  isUpdateModalOpen.value = true;
}
const onCloseUpdateProduct = () => {
  isUpdateModalOpen.value = false;
  isEditProduct = false;
  updateLoading(false);
};
const LoadUpdateData = () => {
  updateProductGetAPI.imageFile = null;
  updateProduct.value = JSON.parse(JSON.stringify(updateProductGetAPI));
  productData.value = JSON.parse(JSON.stringify(productDataGetAPI));
  console.log(updateProduct.value);
  console.log(productData.value);
}
const submitEditForm = async () => {

  if (!checkSubmit()) return;

  if (!productData.value.find(x => x.colorData.id != -1 && x.sizeData.id != -1 && x.amount >= 0)) return;
  updateLoading(true);
  if (!updateProduct.value.price) {
    updateProduct.value.price = 0;
  }
  const formProduct = new FormData();
  if (isEditProduct) {
    let check = false;

    if (updateProduct.value.name != updateProductGetAPI.name) {
      check = true;
      formProduct.append('name', updateProduct.value.name);
    }
    if (updateProduct.value.imageFile) {
      check = true;
      formProduct.append('mainImage', updateProduct.value.imageFile);
    }
    if (updateProduct.value.categoryData.id != updateProductGetAPI.categoryData.id) {
      check = true;
      formProduct.append('categoryId', updateProduct.value.categoryData.id);
    }
    const des = updateProduct.value.description.length == 0 ? ' ' : updateProduct.value.description;
    if (des != updateProductGetAPI.description) {
      check = true;
      formProduct.append('description', des);
    }
    if (updateProduct.value.price != updateProductGetAPI.price) {
      check = true;
      formProduct.append('price', updateProduct.value.price);
    }

    if (check) {
      await instance.put(`${API.PUTProduct}/${updateProduct.value.id}`, formProduct)
        .then(res => {
          showToast("Cập nhật thành công", false);
          loadFilter();
          updateColorSize(updateProduct.value.id);
          onCloseUpdateProduct();
        })
        .catch(err => {
          updateLoading(false);
          const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
          showToast(mess, true);
          console.error(mess, err);
          return;
        });
    }
  } else {
    formProduct.append('name', updateProduct.value.name);
    formProduct.append('mainImage', updateProduct.value.imageFile);
    formProduct.append('categoryId', updateProduct.value.categoryData.id);
    formProduct.append('price', updateProduct.value.price);
    formProduct.append('description', updateProduct.value.description.length == 0 ? ' ' : updateProduct.value.description);

    await instance.post(API.POSTProduct, formProduct)
      .then(res => {
        updateColorSize(res.data.data.id);
        loadFilter();
        showToast("Cập nhật thành công", false);
        onCloseUpdateProduct();
      })
      .catch(err => {
        updateLoading(false);
        const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
        showToast(mess, true);
        console.error(mess, err);
        return;
      });
  }
}
const checkSubmit = () => {

  if (!updateProduct.value) {
    showToast("Lỗi", true);
    return false;
  }

  if (updateProduct.value.name.length == 0) {
    showToast("Tên sản phẩm bị thiếu", true);
    return false;
  }

  if (updateProduct.value.mainImage.length == 0) {
    showToast("Ảnh sản phẩm bị thiếu", true);
    return false;
  }

  if (productData.value.length == 0) {
    showToast("Thông tin sản phẩm bị thiếu", true);
    return false;
  } else if (productData.value.length == 1) {
    if (productData.value[0].sizeData.id == -1 || productData.value[0].colorData.id == -1) {
      showToast("Thông tin sản phẩm bị thiếu", true);
      return false;
    }
  }

  return true;
}
const updateColorSize = (id) => {
  if (isEditProduct) {
    productData.value.forEach(x => {
      if (x.hasOwnProperty('isEdit')) {
        const formItemColorSize = new FormData();
        formItemColorSize.append('productId', id);
        formItemColorSize.append('sizeId', x.sizeData.id);
        formItemColorSize.append('colorId', x.colorData.id);
        formItemColorSize.append('amount', x.amount ? x.amount : 0);
        formItemColorSize.append('price', 0);
        if (x.isNew) {
          //instance.post(API.POSTProduct_Size_Color, formItemColorSize);
          UpAPIColorSize(true, API.POSTProduct_Size_Color, formItemColorSize);
        } else {
          //instance.put(`${API.POSTProduct_Size_Color}/${x.id}`, formItemColorSize);
          UpAPIColorSize(false, `${API.POSTProduct_Size_Color}/${x.id}`, formItemColorSize);
        }

      }
    });
  } else {
    productData.value.forEach(x => {
      if (x.colorData.id >= 0 && x.sizeData.id >= 0) {
        const formItemColorSize = new FormData();
        formItemColorSize.append('productId', id);
        formItemColorSize.append('sizeId', x.sizeData.id);
        formItemColorSize.append('colorId', x.colorData.id);
        formItemColorSize.append('amount', x.amount ? x.amount : 0);
        formItemColorSize.append('price', 0);
        UpAPIColorSize(true, API.POSTProduct_Size_Color, formItemColorSize);
      }
    });
  }
}
const UpAPIColorSize = async (isPost, api, data) => {
  if (isPost) {
    await instance.post(api, data)
      .catch(err => {
        updateLoading(false);
        const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
        showToast(mess, true);
        console.error(mess, err);
        return;
      });
  } else {
    await instance.put(api, data)
      .catch(err => {
        updateLoading(false);
        const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
        showToast(mess, true);
        console.error(mess, err);
        return;
      });
  }
}
const removeItem = (index) => {
  productData.value.splice(index, 1);
};
const addItem = () => {
  console.log(productData.value);
  productData.value.push(JSON.parse(JSON.stringify(itemProductDataDefault)));
  productData.value[productData.value.length - 1].isNew = true;
};
const ChooseCombobox = (isColor, index, value) => {
  if (
    (productData.value[index].sizeData.id == -1 && isColor) ||
    (productData.value[index].colorData.id == -1 && !isColor)
  )
    return;

  const c = isColor ? value : productData.value[index].colorData.id;
  const s = isColor ? productData.value[index].sizeData.id : value;

  for (let i = 0; i < productData.value.length; i++) {

    if (i == index) continue;

    let itemF = productData.value[i];

    if (itemF.sizeData.id == s && itemF.colorData.id == c) {
      showToast("Thông tin đã tồn tại", true);
      if (isColor) {
        productData.value[index].colorData.id = -1;
      } else {
        productData.value[index].sizeData.id = -1;
      }
      return;
    }
  }
  if (isEditProduct) {
    productData.value[index].isEdit = true;
  }
};

// } Update Product




//delete modal {

const showChangeStatusModal = async (id, status) => {
  statusSelected.value = status;
  selectedId.value = id;
  isDeleteModalOpen.value = true;
  await delay(100);
  isShowDeleteModal.value = true;
};

const onChangeStatus = async () => {
  updateLoading(true);
  try {
    const index = products.value.findIndex((person) => person.id === selectedId.value);

    if (index !== -1) {
      await instance.delete(`${API.DELProduct}/${selectedId.value}`)
        .then(res => {
          if (products.value.length == 1 && filterVal.value.page == filterVal.value.totalPages) {
            filterVal.value.page--;
          }
          loadFilter();
          showToast("Xoá thành công");
        })
        .catch(err => {
          updateLoading(false);
          const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
          showToast(mess, true);
          console.error(mess, err);
          return;
        });
    }
  } catch (error) {
    showToast("Lỗi", true);
    updateLoading(false);
    console.error(err);
    return;
  }
  updateLoading(false);
  closeChangeStatusModal();
}

const closeChangeStatusModal = async () => {
  if (selectedId.value >= 0) {
    const index = products.value.findIndex(x => x.id == selectedId.value);
    products.value[index].status1 = products.value[index].status;
  }
  isShowDeleteModal.value = false;
  await delay(500);
  isDeleteModalOpen.value = false;
}
// } delete modal 



//Sale {
const validateQuantityPriceSale = () => {
  if (salePrice.value < 0) salePrice.value = 0;
}

const openSaleModal = (id) => {
  const pr = products.value.find(x => x.id == id);
  if (!pr) {
    showToast("Lỗi", true);
    return;
  }
  idSale = id;
  saleStart.value = pr.saleStart;
  saleEnd.value = pr.saleEnd;
  salePrice.value = pr.salePrice ? pr.salePrice : 0;
  isSaleModalOpen.value = true;
};

const closeSaleModal = () => {
  updateLoading(false);
  isSaleModalOpen.value = false;
};

const resetSaleModal = () => {
  saleStart.value = null;
  saleEnd.value = null;
  priceSale.value = 0;
};

const submitSaleModal = async () => {
  if (idSale == -1) {
    showToast("Lỗi", true);
    return;
  }
  updateLoading(true);
  // if (!saleStart.value || !saleEnd.value) {
  //   showToast("Thông tin thiếu", true);
  //   return;
  // }

  const formSale = new FormData();
  // formSale.append('saleStart', saleStart.value);
  // formSale.append('saleEnd', saleEnd.value);
  formSale.append('salePrice', salePrice.value);
  await instance.put(`${API.PUTSale}/${idSale}`, formSale)
    .then(res => {
      showToast("Tạo giảm giá thành công", false);
      loadFilter();
      closeSaleModal();
      return;
    })
    .catch(err => {
      const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
      showToast(mess, true);
      console.error(mess, err);
      updateLoading(false);
      return;
    });
};
// } Sale 


// filter {

const searchOrApplyFilterModal = () => {
  filterVal.value.page = 0;
  loadFilter();
}
const changeSort = () => {
  filterVal.value.sortPrice++;
  if (filterVal.value.sortPrice > 2) {
    filterVal.value.sortPrice = 0;
  }
  loadFilter();
}


const loadFilter = async () => {
  updateLoading(true);
  const params = {};
  if (filterVal.value.sortPrice < 2) {
    params.sortPrice = filterVal.value.sortPrice;
  }

  numberFilter.value = 0;

  params.page = filterVal.value.page < 0 ? 1 : filterVal.value.page;
  params.pageSize = filterVal.value.pageSize < 0 ? 1 : filterVal.value.pageSize;

  if (filterVal.value.keyword.toString().trim().length > 0) {
    params.keyword = filterVal.value.keyword.toString().trim();
  }
  if (filterVal.value.maxPrice > filterVal.value.minPrice) {
    params.maxPrice = filterVal.value.maxPrice;
    params.minPrice = filterVal.value.minPrice;
    numberFilter.value++;
  } else {
    filterVal.value.maxPrice = 0;
    filterVal.value.minPrice = 0;
  }

  if (filterVal.value.categoryId >= 0) {
    params.categoryId = filterVal.value.categoryId;
    numberFilter.value++;
  }

  if (filterVal.value.isNew) {
    params.isNew = filterVal.value.isNew;
    numberFilter.value++;
  }
  UpdateValueFilter();
  closeFilterModal();
  await instance.get(API.GETFilter, {
    params: params,
  })
    .then(res => {
      products.value = res.data.data.products;
      products.value.forEach(x => {
        if (x.deletedAt) {
          x.status = 0;
          x.status1 = 0;
        } else {
          x.status = 1;
          x.status1 = 1;
        }
      })
      filterVal.value.totalPages = res.data.data.pagination.totalPages;
      filterVal.value.page = res.data.data.pagination.currentPage;
    })
    .catch(err => {
      products.value = [];
      filterVal.value.totalPages = 0;
      filterVal.value.page = 1;
      const mess = err.response.data.message ? err.response.data.message : 'Lỗi';
      showToast(mess, true);
      console.error(mess, err);
    });

  console.log(params);

  updateLoading(false);

}

const openFilterModal = () => {
  isOpenFilterModal.value = true;
}

const closeFilterModal = () => {
  BackValueFilter();
  isOpenFilterModal.value = false;
}

const ResetFilter = () => {
  filterVal.value.minPrice = 0;
  filterVal.value.maxPrice = 0;
  filterVal.value.isNew = false;
  filterVal.value.categoryId = -1;
  filterVal.value.statusProduct = statusProducts[0];
}

const BackValueFilter = () => {
  filterVal.value.categoryId = filterVal_.categoryId;
  filterVal.value.maxPrice = filterVal_.maxPrice;
  filterVal.value.minPrice = filterVal_.minPrice;
  filterVal.value.isNew = filterVal_.isNew;
  filterVal.value.statusProduct = filterVal_.statusProduct;
}

const UpdateValueFilter = () => {
  filterVal_.categoryId = filterVal.value.categoryId;
  filterVal_.maxPrice = filterVal.value.maxPrice;
  filterVal_.minPrice = filterVal.value.minPrice;
  filterVal_.isNew = filterVal.value.isNew;
  filterVal_.statusProduct = filterVal.value.statusProduct;
}

// } filter

// option {
const optionModal = ref({
  id: true,
  picture: true,
  name: true,
  category: true,
  priceDefault: false,
  timeSale: false,
  priceSale: false,
  price: true,
  action: true,
});
const optionModalUI = ref({
  id: true,
  picture: true,
  name: true,
  category: true,
  priceDefault: false,
  timeSale: false,
  priceSale: false,
  price: true,
  action: true,
});

const applyOption = () => {
  optionModal.value = { ...optionModalUI.value };
  closeOptionModal();
}

const openOptionModal = () => {
  isOpenOptionModal.value = true;
}

const closeOptionModal = () => {
  isOpenOptionModal.value = false;
  optionModalUI.value = { ...optionModal.value };
}

// } option 

const handleImageUpload = (event) => {
  // Xử lý khi người dùng chọn file ảnh
  const file = event.target.files[0];
  if (file) {
    updateProduct.value.imageFile = file;
    // Xử lý và cập nhật đường dẫn ảnh
    updateProduct.value.mainImage = URL.createObjectURL(file);
  }
};
const validateQuantityColorSize = (index) => {
  if (productData.value[index].amount < 0) {
    productData.value[index].amount = 0;
  }
  if (isEditProduct && productData.value[index].sizeData.id != -1 && productData.value[index].colorData.id != -1) {
    productData.value[index].isEdit = true;
  }
};
const validateQuantityPrice = () => {
  if (updateProduct.value.price < 0) {
    updateProduct.value.price = 0;
  }
};


const getPrice = (product) => {
  if (product.saleStart) {
    return { isSale: true, value: product.salePrice }
  } else {
    return { isSale: false, value: product.price };
  }
}

const formatTime = (time) => {
  return moment(time).format("HH:mm - DD/MM/yyyy");
}

const updateLoading = (check) => {
  ShowLoading.value = check;
}

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
