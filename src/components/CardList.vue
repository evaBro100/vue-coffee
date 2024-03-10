<script setup>
import Card from './Card.vue'
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
	<Card 
	  title="Эспрессо" 
	  imageUrl="/coffe/espresso.png" 
	  :price="200" 
	  :isFavorite="false"
	/>
	<Card 
	  title="Американо" 
	  imageUrl="/coffe/americano.png" 
	  :price="250" 
	  :isFavorite="false"
	/>
    <Card 
	  title="Капучино" 
	  imageUrl="/coffe/cappuccino.png" 
	  :price="250" 
	  :isFavorite="false"
	/>
    <Card 
	  title="Капучино с карамелью" 
	  imageUrl="/coffe/cappuccinoCaramel.png" 
	  :price="300"
	/>
    <Card 
	  title="Латте" 
	  imageUrl="/coffe/latte.png" 
	  :price="250" 
	  :isFavorite="false"
	/>
	<Card 
	  title="Латте с карамелью" 
	  imageUrl="/coffe/latteCaramel.png" 
	  :price="250" 
	  :isFavorite="false"
	/>
	<Card 
	  title="Латте с шоколадом" 
	  imageUrl="/coffe/latteChocolate.png" 
	  :price="300" 
	  :isFavorite="false"
	/>
	<Card 
	  title="Флэт Уайт" 
	  imageUrl="/coffe/flat.png" 
	  :price="300" 
	  :isFavorite="false"
	/>
	<Card 
	  title="Черный чай" 
	  imageUrl="/coffe/tea.png" 
	  :price="200" 
	  :isFavorite="false"
	/>
	<Card 
	  title="Зеленый чай" 
	  imageUrl="/coffe/teagreen.png" 
	  :price="200" 
	  :isFavorite="false"
	/>
	<Card 
	  title="Чай с грейпфрутом" 
	  imageUrl="/coffe/teaGrapefruit.png" 
	  :price="250" 
	  :isFavorite="false"
	/>
	<Card 
	  title="Чай с апельсином" 
	  imageUrl="/coffe/teaOrange.png" 
	  :price="250" 
	  :isFavorite="false"
	/>
  </div>
</template>
