<script setup>
import CartItemList from './CartItemList.vue'
import DrawerHead from './DrawerHead.vue'
import InfoBlock from './InfoBlock.vue'
import { ref, inject, computed } from 'vue'
import axios from 'axios'

const props = defineProps({
  totalPrice: Number,
  tips: Number,
  buttonDisabled: Boolean
})

const { cartItems, closeDrawer } = inject('cart')

const cartIsEmpty = computed(() => cartItems.value.length === 0)
const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value)

const isCreating = ref(false)
const orderId = ref(null)

const createOrder = async () => {
  try {
    isCreating.value = true

    const { data } = await axios.post('https://869ed7102af9fbd3.mokky.dev/orders', {
      items: cartItems.value,
      totalPrice: props.totalPrice.value
    })

    // адаптация под бэк
    // const { data } = await axios.post(`${apiUrl}orders`, {
    //   userId: 1,
    //   items: cartItems.value.map((i) => ({ ...i, quantity: 1, productId: i.id })),
    //   totalPrice: totalPrice.value
    // })

    cartItems.value = []

    orderId.value = data.id
  } catch (err) {
    console.log(err)
  } finally {
    isCreating.value = false
  }
}
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />

    <div v-if="!totalPrice || orderId" class="flex h-full items-center">
      <InfoBlock
        v-if="!totalPrice && !orderId"
        title="Корзина пустая"
        description="Добавьте хотя бы одну позицию, чтобы оформить заказ"
        imageUrl="/public/package-icon.png"
      />
      <InfoBlock
        v-if="orderId"
        title="Заказ оформлен"
        :description="`Ваш заказ #${orderId} скоро будет передан бариста`"
        imageUrl="/order-success-icon.png"
      />
    </div>

    <CartItemList v-if="totalPrice > 0" />

    <div v-if="totalPrice > 0" class="flex flex-col gap-3 mt-7">
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ totalPrice }} руб.</b>
      </div>

      <div class="flex gap-2">
        <span>Чаевые:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ tips }} руб.</b>
      </div>

      <button
        class="mt-4 transition bg-orange-900 text-white disabled:bg-slate-300 w-full rounded-xl py-3 hover:bg-orange-950 cursor-pointer"
        @click="createOrder"
        :disabled="buttonDisabled"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>
