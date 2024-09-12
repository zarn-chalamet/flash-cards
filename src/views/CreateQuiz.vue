<template>
  <div>
    <h2>Create Quiz</h2>
    <form @submit.prevent="submitForm">
      <label>Quiz Title</label>
      <input type="text" v-model="quizData.name" required />

      <label>Image Link</label>
      <input type="text" v-model="quizData.img" required />

      <div v-for="(question, qIndex) in quizData.questions" :key="qIndex">
        <h3>Question {{ qIndex + 1 }}</h3>

        <label>Question Text</label>
        <input type="text" v-model="question.text" required />

        <div v-for="(option, oIndex) in question.options" :key="oIndex">
          <label>Option {{ oIndex + 1 }}</label>
          <input type="text" v-model="option.text" required />
          <label>
            <input type="radio" :name="'question' + qIndex" @click="setCorrectOption(qIndex, oIndex)" />
            Correct
          </label>
        </div>

        <button type="button" @click="addOption(qIndex)">Add Option</button>
        <hr />
      </div>

      <button type="button" @click="addQuestion">Add Question</button>
      <button type="submit">Submit Quiz</button>
    </form>

    <pre>{{ quizData }}</pre> <!-- For previewing the quizData object -->
  </div>
</template>

<script>
import useCollection from '@/composables/useCollection';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup(){
    let { error, addDocument } = useCollection("quizzs");
    let router = useRouter();
    let quizData = ref({
        id: 1, // This can be dynamically generated
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

    let addQuestion = (() => {
      quizData.value.questions.push({
        id: quizData.value.questions.length + 1,
        text: '',
        options: [
          { id: 1, label: 'A', text: '', isCorrect: false },
          { id: 2, label: 'B', text: '', isCorrect: false },
        ],
      });
    });

    let addOption = ((qIndex) => {
      const question = quizData.value.questions[qIndex];
      const optionId = question.options.length + 1;
      question.options.push({ id: optionId, label: String.fromCharCode(64 + optionId), text: '', isCorrect: false });
    });

    let setCorrectOption = ((qIndex,oIndex) => {
      const question = quizData.value.questions[qIndex];
      question.options.forEach((option, index) => {
        option.isCorrect = index === oIndex;
      });
    });

    let submitForm = async () => {
      await addDocument(quizData.value);
      router.push("/");
    };

    return {quizData,addQuestion,addOption,setCorrectOption,submitForm};
  }
}
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
</style>
