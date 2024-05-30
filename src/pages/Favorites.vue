<script setup>
    import axios from 'axios';
    import { ref, onMounted } from 'vue';
    import CardList from '../components/CardList.vue';

    const favorites = ref([]);
    onMounted(async ()=>{
        try {
            const {data} = await axios.get(
                'https://869ed7102af9fbd3.mokky.dev/favorite?_relations=items'
            ); 

            favorites.value =  data.map(obj => obj.item);
        } catch(err){
            console.log(err)
        }
    });

</script>

<template>
    <h2 class="text-3xl font-bold mb-10">Избранное</h2>
    <CardList :items="favorites" is-favorites/>
</template>