<script setup>
    import Card from './Card.vue'

    
</script>

<template>
    <div class="grid grid-cols-4 gap-5">
				<Card 
                title="Латте" 
                imageUrl="/coffe/latte.png" 
                :price="250"
                />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</div>
</template>