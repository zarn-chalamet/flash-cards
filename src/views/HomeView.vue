<template>
  <div class="grid-view">
    <div v-for="flash in flashs" :key="flash.id">
      <router-link :to="{name:'single-view', params:{id:flash.id}}">
        <SingleCard :flash="flash"></SingleCard>
      </router-link>
    </div>
  </div>
</template>

<script>

import { onMounted, ref } from 'vue';
import SingleCard from '../components/SingleCard.vue'
import { query,getFirestore, collection,onSnapshot} from 'firebase/firestore';
export default {
  components: {
    SingleCard, },

  setup(){
    const db = getFirestore();
    let flashs = ref([]);

    onMounted(() => {
      const q = query(collection(db, "flash-cards"));
      onSnapshot(q, (snap) => {
          let results = [];
          snap.docs.forEach((doc) => {
          let document = { ...doc.data(), id: doc.id };
          if (doc.data()) {
              results.push(document);
          }
          });
          flashs.value = results;
          console.log(results)
      });
    });

    return {flashs}

  }

}
</script>

<style>
  .grid-view {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding: 16px;
  }
</style>
