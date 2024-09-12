<template>
  <div class="quiz-form">
    <h2>Create Quiz</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Quiz Title</label>
        <input type="text" v-model="quizData.name" required />
      </div>

      <div class="form-group">
        <label>Image Link</label>
        <input type="text" v-model="quizData.img" required />
      </div>

      <div v-for="(question, qIndex) in quizData.questions" :key="qIndex" class="question-group">
        <h3>Question {{ qIndex + 1 }}</h3>

        <div class="form-group">
          <label>Question Text</label>
          <input type="text" v-model="question.text" required />
        </div>

        <div v-for="(option, oIndex) in question.options" :key="oIndex" class="form-group option-group">
          <label>Option {{ oIndex + 1 }}</label>
          <input type="text" v-model="option.text" required />
          <label class="radio-label">
            <input type="radio" :name="'question' + qIndex" @click="setCorrectOption(qIndex, oIndex)" />
            Correct
          </label>
        </div>

        <button type="button" class="add-button" @click="addOption(qIndex)">Add Option</button>
        <hr />
      </div>

      <button type="button" class="add-button" @click="addQuestion">Add Question</button>
      <button type="submit" class="submit-button">Submit Quiz</button>
    </form>
  </div>
</template>

<script>
import useCollection from '@/composables/useCollection';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    let { error, addDocument } = useCollection("quizzs");
    let router = useRouter();
    let quizData = ref({
      id: 1,
      img: '',
      title: '',
      questions: [
        {
          id: 1,
          text: '',
          options: [
            { id: 1, label: 'A', text: '', isCorrect: false },
            { id: 2, label: 'B', text: '', isCorrect: false },
          ],
        },
      ],
    });

    let addQuestion = () => {
      quizData.value.questions.push({
        id: quizData.value.questions.length + 1,
        text: '',
        options: [
          { id: 1, label: 'A', text: '', isCorrect: false },
          { id: 2, label: 'B', text: '', isCorrect: false },
        ],
      });
    };

    let addOption = (qIndex) => {
      const question = quizData.value.questions[qIndex];
      const optionId = question.options.length + 1;
      question.options.push({ id: optionId, label: String.fromCharCode(64 + optionId), text: '', isCorrect: false });
    };

    let setCorrectOption = (qIndex, oIndex) => {
      const question = quizData.value.questions[qIndex];
      question.options.forEach((option, index) => {
        option.isCorrect = index === oIndex;
      });
    };

    let submitForm = async () => {
      await addDocument(quizData.value);
      router.push("/");
    };

    return { quizData, addQuestion, addOption, setCorrectOption, submitForm };
  },
};
</script>

<style scoped>
.quiz-form {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 0.85em;
  text-transform: uppercase;
  color: #666;
  margin-bottom: 5px;
}

input[type="text"] {
  width: 90%;
  padding: 10px;
  border: none;
  border-bottom: 2px solid #ccc;
  font-size: 1em;
  outline: none;
  transition: border-color 0.3s;
}

input[type="text"]:focus {
  border-bottom-color: #3498db;
}

.add-button, .submit-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #45abc4;
  color: #fff;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-button:hover, .submit-button:hover {
  background-color: #2980b9;
}

h3 {
  color: #3498db;
  font-size: 1.2em;
  text-transform: uppercase;
}

h2{
  text-transform: uppercase;
}

.radio-label {
  margin-left: 10px;
}

hr {
  border: none;
  border-bottom: 1px solid #ddd;
  margin: 20px 0;
}
</style>
