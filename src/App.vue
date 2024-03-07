<script setup>
import Header from './components/Header.vue';
import Card from './components/Card.vue';
</script>

<template>
	<div class="bg-white w-4/5 m-auto mt-14 rounded-xl shadow-2xl">
		<Header />
		<div class="p-10">
			<h2 class="text-3xl font-bold mb-8">Меню</h2>
			<div class="grid grid-cols-4 gap-5">
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</div>
		</div>
	</div>
</template>
