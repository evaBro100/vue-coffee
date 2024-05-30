<script setup>
import Card from './Card.vue'

defineProps({
  items: Array,
  isFavorites:Boolean
})

const emit = defineEmits(['handleFavorite', 'handleCart'])
</script>

<template>
  <div class="grid grid-cols-4 gap-5" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :onClickFavorite="isFavorites ? null:() => emit('handleFavorite', item)"
      :onClickAdd="isFavorites ? null : () => emit('handleCart', item)"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
    />
  </div>
</template>
