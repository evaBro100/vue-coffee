<script setup>
import { ref, watch, provide, computed } from 'vue'
import axios from 'axios'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import { useAuthStore } from '@/store'

const store = useAuthStore()
const cartItems = ref([])
const totalPrice = computed(() => cartItems.value.reduce((acc, item) => acc + item.price, 0))
const tips = computed(() => Math.round(totalPrice.value * 0.05))


const drawerOpen = ref(false)
const closeDrawer = () => {
  drawerOpen.value = false
}
const openDrawer = () => {
  drawerOpen.value = true
}

const handleCart = (item) => {
  cartItems.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cartItems.value.splice(cartItems.value.indexOf(item), 1)
  item.isAdded = false
}

const apiUrl = import.meta.env.VITE_HOST_API

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

watch(
  () => store.isAuth,
  (newVal) => {
    if (newVal) {
      fetchItems();
    }
  }
);

const fetchItems = async () => {
    try {
    const params = {
        sortBy: filters.sortBy
        // userId: store.user.id
    }
    if (filters.searchQuery) {
        params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://869ed7102af9fbd3.mokky.dev/items`, {
        params
    })
    items.value = data.map((obj) => ({
        ...obj,
        isFavorite: false,
        favoriteId: null,
        isAdded: false
    }))

    // if (filters.searchQuery) {
    //   params.searchTerm = `${filters.searchQuery}`
    // }
    // const { data } = await axios.get(`${apiUrl}products`, {
    //   params
    // })
    // items.value = data.map((obj) => ({
    //   ...obj,
    //   imageUrl: obj.images[0],
    //   isAdded: false
    // }))
    } catch (err) {
    console.log(err)
    }
}


// watch(store.isAuth, fetchItems)

</script>

<template>
  <Drawer
    v-if="drawerOpen"
    :totalPrice="totalPrice"
    :tips="tips"
  />
  <div class="bg-white w-4/5 m-auto mt-14 rounded-xl shadow-2xl">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />
    <div class="p-10">
      <RouterView />
    </div>
  </div>
</template>
