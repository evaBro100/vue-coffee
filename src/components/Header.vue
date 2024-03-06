<template>
	<header class="flex justify-between border-b border-slate-300 px-8">
		<div class="flex items-center gap-4">
			<img src="/logo.png" alt="Logo" class="w-10">
			<div>
				<h2 class="text-xl font-bold uppercase">МышАтте</h2>
				<p class="text-gray-500">Всегда самый вкусный</p>
			</div>
		</div>

		<ul class="flex items-center gap-10">
			<li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
				<img src="/cart.svg" alt="Cart">
				<b>0 руб.</b>
			</li>
			<li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
				<img src="/heart.svg" alt="Heart">
				<span>Избранное</span>
			</li>
			<li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
				<img src="/profile.svg" alt="Profile">
				<span>Профиль</span>
			</li>
		</ul>
	</header>
</template>
