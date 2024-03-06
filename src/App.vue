<script setup>
import MyCode from './components/MyCode.vue'
</script>

<template>
	<div class="bg-white w-4/5 h-screen m-auto mt-14 rounded-xl shadow-2xl">
		<header>
			<div>
				<img src="/logo.png" alt="Logo">
				<div>
					<h2>Название магазина</h2>
					<p>Онлайн-магазин кроссовок</p>
				</div>
			</div>

			<ul>
				<li>
					<img src="/cart.svg" alt="Cart">
					<b>0 руб.</b>
				</li>
				<li>
					<img src="/heart.svg" alt="Heart">
					<b>Избранное</b>
				</li>
				<li>
					<img src="/profile.svg" alt="Profile">
					<b>Профиль</b>
				</li>
			</ul>
		</header>
	</div>
</template>
