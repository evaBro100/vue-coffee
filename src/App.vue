<script setup>
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import CardList from './components/CardList.vue'
</script>

<template>
  <!-- <Drawer/> -->
  <div class="bg-white w-4/5 m-auto mt-14 rounded-xl shadow-2xl">
    <Header />
    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-10">Меню</h2>

        <div class="flex gap-4">
          <select class="py-2 px-3 border rounded-md outline-none">
            <option>По наименованию</option>
            <option>По цене (дешевле)</option>
            <option>По цене (дороже)</option>
          </select>
          <div class="relative">
            <img class="absolute left-4 top-3" src="/search.svg" />

            <input
              class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
              type="text"
              placeholder="Поиск..."
            />
          </div>
        </div>
      </div>
      <CardList />
    </div>
  </div>
</template>
