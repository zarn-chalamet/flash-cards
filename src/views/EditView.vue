<template>
  <div>
    <h3>Edit Page</h3>
    <div class="options-container">
      <div v-for="quiz in quizzs" :key="quiz.id">
        <SingleQuizGrid :quiz="quiz" :edit="edit = true"></SingleQuizGrid>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import SingleQuizGrid from '../components/SingleQuizGrid.vue'
import { query, getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
export default {
  components: { SingleQuizGrid },
  setup(){
    const auth = getAuth();
    const db = getFirestore();
    let quizzs = ref(null);
    onMounted(()=>{
      const qs = query(collection(db, 'quizzs'));
      onSnapshot(qs, (snap) => {
        let results = [];
        snap.docs.forEach((doc) => {
          let document = { ...doc.data(), id: doc.id };
          if (doc.data()) {
            results.push(document);
          }
        });
        quizzs.value = results.filter((quiz) => {
          return quiz.owner_email === auth.currentUser.email;
        })
        
        console.log("Filtered Quizzes:")
        console.log(quizzs.value);
      });
    })
    return {quizzs};
  }
}
</script>

<style>

</style>