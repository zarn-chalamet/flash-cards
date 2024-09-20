<template>
 
  <NavBar @goToPage="goToPage" :isShowFlash="bol"></NavBar>
  
  <div v-if="bol=== 'true'">
    <SearchBox :source="flashs" @emitSource="receiveSource"></SearchBox>
    <div class="options-container">
      <div v-for="flash in filteredFlashs" :key="flash.id">
        <router-link :to="{ name: 'single-view', params: { id: flash.id } }">
          <SingleCard :flash="flash"></SingleCard>
        </router-link>
      </div>
    </div>
  </div>
  <div v-else>
    <SearchBox :source="quizzs" @emitSource="receiveSource"></SearchBox>
    <div class="options-container">
      <div v-for="quiz in filteredQuizzs" :key="quiz.id">
        <router-link :to="{ name: 'single-quiz-view', params: { id: quiz.id } }">
          <SingleQuizGrid :quiz="quiz"></SingleQuizGrid>
        </router-link>
      </div>
    </div>
  </div>
  
</template>

<script>
import SearchBox from '../components/SearchBox.vue';
import SingleQuizGrid from '../components/SingleQuizGrid.vue';
import NavBar from '../components/NavBar.vue';
import { onMounted, ref, watch } from 'vue';
import SingleCard from '../components/SingleCard.vue';
import { query, getFirestore, collection, onSnapshot } from 'firebase/firestore';
import getUser from '@/composables/GetUser';
import { useRouter } from 'vue-router';

export default {
  components: {
    SearchBox,
    SingleQuizGrid,
    NavBar,
    SingleCard,
  },
  props: ['bol'],
  setup(props) {
    const db = getFirestore();
    let flashs = ref([]);
    let quizzs = ref([]);
    let isShowFlash = ref(props.bol);
    let filteredFlashs = ref([]);
    let filteredQuizzs = ref([]);

    let {user} = getUser(); 
    const router = useRouter();
   
    watch(user,()=>{
      router.push("/");
    });

    watch(() => props.bol, (newVal) => {
      isShowFlash.value = newVal;
    });

    const receiveSource = (filteredSources) => {
      console.log("is show flash value"+ isShowFlash.value)
      if (isShowFlash.value === 'true') {
        filteredFlashs.value = filteredSources;
      } else {
        filteredQuizzs.value = filteredSources;
      }
    };

    onMounted(() => {
      const q = query(collection(db, 'flash-cards'));
      onSnapshot(q, (snap) => {
        let results = [];
        snap.docs.forEach((doc) => {
          let document = { ...doc.data(), id: doc.id };
          if (doc.data()) {
            results.push(document);
          }
        });
        flashs.value = results;
        filteredFlashs.value = results;
        console.log(results);
      });

      const qs = query(collection(db, 'quizzs'));
      onSnapshot(qs, (snap) => {
        let results = [];
        snap.docs.forEach((doc) => {
          let document = { ...doc.data(), id: doc.id };
          if (doc.data()) {
            results.push(document);
          }
        });
        quizzs.value = results;
        filteredQuizzs.value = results;
        console.log(results);
      });
    });

    const goToPage = (isFlashShow) => {
      isShowFlash.value = isFlashShow;
    };

    return {
      flashs,
      isShowFlash,
      goToPage,
      quizzs,
      receiveSource,
      filteredFlashs,
      filteredQuizzs,
      user
    };
  },
};
</script>

<style>
.options-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
}
</style>
