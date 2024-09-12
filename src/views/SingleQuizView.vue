<template>
  <div v-if="showResult">
    <h3>Total mark {{ total_mark }}</h3>
  </div>
  <div v-else>
    <div v-if="quiz">
      <QuizHeader :quiz = 'quiz' :current="currentQuizIndex"></QuizHeader>
      <h3>{{ quiz.title}}</h3>
      <div>
        <h3>{{ quiz.questions[currentQuizIndex].text }}</h3>
          <div v-for="option in quiz.questions[currentQuizIndex].options" :key="option.id">
            <div>
              <div class="option">
                <div class="label">
                  <h5>{{ option.label }}</h5>
                </div>
                <div class="text">
                  <h5>{{ option.text }}</h5>
                </div>
                <div class="choice">
                  <input type="radio" :value="option.id" v-model="selectedOption">
                </div>
              </div>
            </div>
          </div>
      </div>
      <button @click="goForward">
        forward
      </button>

      <h3>{{ selectedOption }}</h3>
      
    </div>
  </div>
</template>

<script>
import OptionsBody from '../components/OptionsBody.vue'
import QuizHeader from '../components/QuizHeader.vue'
import { onMounted, ref } from 'vue';
import { getFirestore,doc,onSnapshot } from 'firebase/firestore';
export default {
  components: {
    OptionsBody,
    QuizHeader },
    props:['id'],
    setup(props){
        const db = getFirestore();
        let quiz = ref(null);
        let selectedOption = ref(null);
        let currentQuizIndex = ref(0);
        let total_mark = ref(0);
        let showResult = ref(false);
        onMounted(() => {
            const docRef = doc(db, 'quizzs', props.id);
            onSnapshot(docRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                quiz.value = { ...docSnapshot.data(), id: docSnapshot.id };
                console.log(quiz.value);
            } else {
                console.log('No such document!');
            }
            }, (error) => {
            console.error('Error fetching document:', error);
            });
        });

        let goForward = (() => {
          // console.log(quiz.value.questions[currentQuizIndex.value].options[selectedOption.value -1].isCorrect);
          if(quiz.value.questions[currentQuizIndex.value].options[selectedOption.value -1].isCorrect){
            total_mark.value++;
          }
          if(currentQuizIndex.value +1 < quiz.value.questions.length){
            currentQuizIndex.value++;
            selectedOption.value = null;
          }else{
            showResult.value = true;
          }
          
        })

        return {quiz,currentQuizIndex,goForward,selectedOption,total_mark,showResult};
    }
}
</script>

<style>
  .option{
    display: flex;
    justify-content: left;
  }
  .label{
    display: inline-block;
    padding: 5px 20px;
    background-color: bisque;
    margin: 5px 0 5px 5px;
  }
  .text{
    display: inline-block;
    padding: 5px 20px;
    width: 75%;
    background-color: azure;
    margin: 5px 0;
  }
  .choice{
    display: inline-block;
    padding: 20px 40px 20px 0;
    width: 5%;
    background-color: azure;
    text-align: center;
    margin: 5px 0;
  }
</style>