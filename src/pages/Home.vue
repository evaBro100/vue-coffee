<script setup>
    import CardList from '../components/CardList.vue'
    import axios from 'axios'
    import { inject } from 'vue'
    import {reactive, watch, ref, onMounted} from 'vue'
    import { useAuthStore } from '@/store'

    const {handleCart, removeFromCart} = inject('cart')
    
    const store = useAuthStore()
    const items = ref([])
    const cartItems = ref([])
    

    const filters = reactive({
    sortBy: 'title',
    searchQuery: ''
})

    const onChangeSelect = (event) => {
    filters.sortBy = event.target.value
}
    const onChangeSearchInput = (event) => {
    filters.searchQuery = event.target.value
}

const onClickAddPlus = (item) => {
    if (!item.isAdded) {
        handleCart(item)
    } else {
        removeFromCart(item)
    }
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

    // адаптация под бэк
    // const obj = {
    //   // TODO выделить в отд переменную
    //   userId: store.user.id,
    //   productId: item.id
    // }
    // const { data } = await axios.post(`${apiUrl}favorites`, obj)
    item.isFavorite = true
    item.favoriteId = data.id
} else {
    await axios.delete(`https://869ed7102af9fbd3.mokky.dev/favorites/${item.favoriteId}`)
    // адаптация под бэк
    // await axios.delete(`${apiUrl}favorites/${store.user.id}/${item.id}`)
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

onMounted(async () => {
    const localCart = localStorage.getItem('cart')
    cartItems.value = localCart ? JSON.parse(localCart) : []
    // убрать при исп бд
    store.isAuth = true
    store.initUser()
    await fetchItems()
    // TODO закомментить
    await fetchFavorites()
    items.value = items.value.map((item) => ({
        ...item,
        isAdded: cartItems.value.some((cartItem) => cartItem.id === item.id)
    }))
})

watch(cartItems, () => {
    items.value = items.value.map((item) => ({
        ...item,
        isAdded: false
    }))
})

// watch(store.isAuth, fetchItems)
watch(filters, fetchItems)

</script>

<template>
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
</template>