<template>
  <div v-if="flash">
    <h2>{{ flash.title }}</h2>
    <h4>{{ flash.description }}</h4>
    <div class="card-s" @click="showTerm=!showTerm">
      <div>
        <h4 v-if="showTerm">{{ flash.cards[currentCardIndex].term }}</h4>
        <p v-else>{{ flash.cards[currentCardIndex].definition }}</p>
      </div>
    </div>
    <button @click="goBack">
      backward
    </button>
    <button @click="goForward">
      forward
    </button>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getFirestore,doc,onSnapshot } from 'firebase/firestore';

export default {
    props: ['id'],
    setup(props){
      const db = getFirestore();
      let flash = ref(null);
      let currentCardIndex = ref(0); 
      let showTerm = ref(true);

      onMounted(() => {
        const docRef = doc(db, 'flash-cards', props.id);
        onSnapshot(docRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            flash.value = { ...docSnapshot.data(), id: docSnapshot.id };
            console.log(flash.value);
          } else {
            console.log('No such document!');
          }
        }, (error) => {
          console.error('Error fetching document:', error);
        });
      });

      let goBack = () => {
        if (currentCardIndex.value > 0) {
          currentCardIndex.value--;
          showTerm.value = true;
        }
      };

      let goForward =(()=>{
        if (currentCardIndex.value < flash.value.cards.length - 1) {
          currentCardIndex.value++;
          showTerm.value= true;
        }
      });
      return{flash,goBack,goForward,currentCardIndex,showTerm};
    }
}
</script>

<style>
  .card-s{
    display: block;
    max-width: 800px;
    background-color: grey;
    padding: 70px;
    border-radius: 30px;
    text-align: center;
    cursor: pointer;
  }
</style>