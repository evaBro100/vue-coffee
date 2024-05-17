<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { cartItems, removeFromCart } = inject('cart')
</script>

<template>
  <div class="flex flex-col flex-1 gap-4">
    <CartItem
      v-for="item in cartItems"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :image-url="item.imageUrl"
      @on-click-remove="() => removeFromCart(item)"
    />
  </div>
</template>
