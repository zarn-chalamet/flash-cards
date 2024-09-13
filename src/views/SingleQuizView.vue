<template>
  <div v-if="showResult" class="result-container">
    <h3>Total Mark: {{ total_mark }}</h3>
    <UploadFile></UploadFile>
  </div>
  <div v-else>
    <div v-if="quiz">
      <QuizHeader :quiz="quiz" :current="currentQuizIndex"></QuizHeader>
      <h3 class="quiz-title">{{ quiz.title }}</h3>
      
      <div class="question-container">
        <h3 class="question-text">{{ quiz.questions[currentQuizIndex].text }}</h3>
        
        <div v-for="option in quiz.questions[currentQuizIndex].options" :key="option.id" class="option">
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

      <button @click="goForward" class="navigation-button">
        Forward
      </button>
    </div>
  </div>
</template>

<script>
import UploadFile from '../components/UploadFile.vue'
import OptionsBody from '../components/OptionsBody.vue';
import QuizHeader from '../components/QuizHeader.vue';
import { onMounted, ref } from 'vue';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

export default {
  components: {
    UploadFile,
    OptionsBody,
    QuizHeader,
  },
  props: ['id'],
  setup(props) {
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

    const goForward = () => {
      if (selectedOption.value) {
        const selected = quiz.value.questions[currentQuizIndex.value].options[selectedOption.value - 1];
        if (selected.isCorrect) {
          total_mark.value++;
        }

        if (currentQuizIndex.value + 1 < quiz.value.questions.length) {
          currentQuizIndex.value++;
          selectedOption.value = null; // Reset selected option for the next question
        } else {
          showResult.value = true; // Show result at the end
        }
      } else {
        alert("Please select an option before proceeding."); // Alert if no option is selected
      }
    };

    return { quiz, currentQuizIndex, goForward, selectedOption, total_mark, showResult };
  }
}
</script>

<style scoped>
  .quiz-title {
    font-size: 2em;
    margin-bottom: 20px;
    color: #4a4a4a;
  }

  .question-container {
    margin-bottom: 20px;
  }

  .question-text {
    font-size: 1.5em;
    margin-bottom: 15px;
    color: #333;
  }

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
    padding: 25px 30px 25px 0;
    width: 5%;
    background-color: azure;
    text-align: center;
    margin: 5px 0;
  }



.navigation-button {
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.navigation-button:hover {
  background-color: #357abf;
}

.selected-option {
  margin-top: 20px;
  font-weight: bold;
}
.result-container {
  margin: 40px auto;
  text-align: center;
  font-size: 2em;
}
</style>
