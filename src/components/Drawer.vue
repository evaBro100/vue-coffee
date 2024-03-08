<script setup>
    import CartItemList from './CartItemList.vue'
    import DrawerHead from './DrawerHead.vue'
</script>


<template>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
    <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
        <DrawerHead /> 

        <CartItemList />

    <div class="flex flex-col gap-3 mt-7">
            <div class="flex gap-2">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>269 руб.</b>
        </div>


        <div class="flex gap-2">
            <span>Чаевые:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>15 руб.</b>
        </div>

        <button class="mt-4 transition bg-orange-900 text-white disabled:bg-slate-300 w-full rounded-xl py-3 hover:bg-orange-950 cursor-pointer"
        disabled=""
    >
        Оформить заказ
    </button>
    </div>
    </div> 
</template>