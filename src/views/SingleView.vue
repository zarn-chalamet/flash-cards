<template>
  <div v-if="flash" class="flash-m">
    <h1>{{ flash.title }}</h1>
    <h4>{{ flash.description }}</h4>
    
    <div class="card-s" @click="showTerm = !showTerm">
      <div>
        <h4 v-if="showTerm">{{ flash.cards[currentCardIndex].term }}</h4>
        <p v-else>{{ flash.cards[currentCardIndex].definition }}</p>
      </div>
    </div>

    <div class="navigation">
      <button @click="goBack" :disabled="currentCardIndex === 0" class="nav-button">
        Backward
      </button>
      <button @click="goForward" :disabled="currentCardIndex === flash.cards.length - 1" class="nav-button">
        Forward
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

export default {
  props: ['id'],
  setup(props) {
    const db = getFirestore();
    let flash = ref(null);
    let currentCardIndex = ref(0); 
    let showTerm = ref(true);

    onMounted(() => {
      const docRef = doc(db, 'flash-cards', props.id);
      onSnapshot(docRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          flash.value = { ...docSnapshot.data(), id: docSnapshot.id };
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

    let goForward = () => {
      if (currentCardIndex.value < flash.value.cards.length - 1) {
        currentCardIndex.value++;
        showTerm.value = true;
      }
    };

    return { flash, goBack, goForward, currentCardIndex, showTerm };
  }
}
</script>

<style scoped>
.flash-m {
  margin: 40px auto;
  padding: 20px;
  max-width: 800px;
  text-align: center;
}

.flash-m h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
  color: #4a4a4a;
}

.flash-m h4 {
  font-size: 1.2em;
  margin-bottom: 30px;
  color: #7a7a7a;
}

.card-s {
  background-color: #698af8;
  padding: 70px;
  height: 300px;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.card-s:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
}

.card-s h4, .card-s p {
  color: white;
  font-size: 1.5em;
}

.navigation {
  display: flex;
  justify-content: space-between;
  max-width: 300px;
  margin: 20px auto 0;
}

.nav-button {
  background-color: #698af8;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nav-button:disabled {
  background-color: #ced4da;
  cursor: not-allowed;
}

.nav-button:hover:not(:disabled) {
  background-color: #5b7de6;
}
</style>
