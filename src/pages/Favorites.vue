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
    <h1>Мои избранные</h1>
    <CardList :items="favorites" />
</template>