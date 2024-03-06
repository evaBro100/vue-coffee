<script setup>
import Header from './components/Header.vue';
import CardList from './components/CardList.vue';
</script>

<template>
	<div class="bg-white w-4/5 m-auto mt-14 rounded-xl shadow-2xl">
		<Header />
		<div class="p-10">
			<h2 class="text-3xl font-bold mb-10">Меню</h2>

			<CardList/>
		</div>
	</div>
</template>
