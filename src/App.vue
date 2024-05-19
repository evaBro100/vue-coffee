<script setup>
import { onMounted, ref, watch, reactive, provide, computed } from 'vue'
import axios from 'axios'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import CardList from './components/CardList.vue'
import { useAuthStore } from '@/store'

const store = useAuthStore()

const items = ref([])
const cartItems = ref([])
const isCreatingOrders = ref(false)
const totalPrice = computed(() => cartItems.value.reduce((acc, item) => acc + item.price, 0))
const tips = computed(() => Math.round(totalPrice.value * 0.05))
const cartIsEmpty = computed(() => cartItems.value.length === 0)
const cartButtonDisabled = computed(() => isCreatingOrders.value || cartIsEmpty.value)
const drawerOpen = ref(false)
const closeDrawer = () => {
  drawerOpen.value = false
}
const openDrawer = () => {
  drawerOpen.value = true
}

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const handleCart = (item) => {
  cartItems.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cartItems.value.splice(cartItems.value.indexOf(item), 1)
  item.isAdded = false
}

const createOrder = async () => {
  try {
    isCreatingOrders.value = true
    const { data } = await axios.post('https://869ed7102af9fbd3.mokky.dev/zorders', {
      items: cartItems.value,
      totalPrice: totalPrice.value
    })

    // адаптация под бэк
    // const { data } = await axios.post(`${import.meta.env.VITE_HOST_API}orders`, {
    //   userId: 1,
    //   items: cartItems.value.map((i) => ({ ...i, quantity: 1, productId: i.id })),
    //   totalPrice: totalPrice.value
    // })

    cartItems.value = []
    return data
  } catch (err) {
    console.log(err)
  } finally {
    isCreatingOrders.value = false
  }
}

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    handleCart(item)
  } else {
    removeFromCart(item)
  }
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}
const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://869ed7102af9fbd3.mokky.dev/favorites`)
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)

      if (!favorite) return item
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const handleFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id
      }
      const { data } = await axios.post(`https://869ed7102af9fbd3.mokky.dev/favorites`, obj)
      item.isFavorite = true
      item.favoriteId = data.id
    } else {
      await axios.delete(`https://869ed7102af9fbd3.mokky.dev/favorites/${item.favoriteId}`)
      item.isFavorite = false
      item.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
      userId: store.user.id
    }

    // if (filters.searchQuery) {
    //   params.title = `*${filters.searchQuery}*`
    // }

    // const { data } = await axios.get(`https://869ed7102af9fbd3.mokky.dev/items`, {
    //   params
    // })
    // items.value = data.map((obj) => ({
    //   ...obj,
    //   isFavorite: false,
    //   favoriteId: null,
    //   isAdded: false
    // }))

    if (filters.searchQuery) {
      params.searchTerm = `${filters.searchQuery}`
    }
    const { data } = await axios.get(`${import.meta.env.VITE_HOST_API}products`, {
      params
    })
    items.value = data.map((obj) => ({
      ...obj,
      imageUrl: obj.images[0],
      isAdded: false
    }))
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cartItems.value = localCart ? JSON.parse(localCart) : []
  await fetchItems()
  await fetchFavorites()
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cartItems.value.some((cartItem) => cartItem.id === item.id)
  }))
  store.initUser()
})
watch(filters, fetchItems)

watch(cartItems, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

watch(
  cartItems,
  () => {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  },
  { deep: true }
)

provide('cart', {
  cartItems,
  closeDrawer,
  openDrawer,
  handleCart,
  removeFromCart
})
</script>

<template>
  <Drawer
    v-if="drawerOpen"
    :totalPrice="totalPrice"
    :tips="tips"
    @create-order="createOrder"
    :button-disabled="cartButtonDisabled"
  />
  <div class="bg-white w-4/5 m-auto mt-14 rounded-xl shadow-2xl">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />
    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-10">Меню</h2>

        <div class="flex gap-4">
          <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
            <option value="title">По наименованию</option>
            <option value="price">По цене (дешевле)</option>
            <option value="-price">По цене (дороже)</option>
          </select>
          <div class="relative">
            <img class="absolute left-4 top-3" src="/search.svg" />

            <input
              @input="onChangeSearchInput"
              class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
              type="text"
              placeholder="Поиск..."
            />
          </div>
        </div>
      </div>
      <div class="mt-10">
        <CardList :items="items" @handleFavorite="handleFavorite" @handleCart="onClickAddPlus" />
      </div>
    </div>
  </div>
</template>
