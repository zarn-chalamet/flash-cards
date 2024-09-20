<template>
  <h4>Single Edit Page {{ id }}</h4>
  <div class="quiz-form" v-if="quizData">
    <h2>Edit Quiz</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Quiz Title</label>
        <input type="text" v-model="quizData.title" required />
      </div>

      <UploadFile @selectedImages="selectedImages" :current="quizData.img"></UploadFile>

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
            <!-- Bind the radio button to the correctOption value -->
            <input 
              type="radio" 
              :name="'question' + qIndex" 
              v-model="question.correctOption" 
              :value="oIndex" 
            />
            Correct
          </label>
        </div>

        <button type="button" class="add-button" @click="addOption(qIndex)">Add Option</button>
        <hr />
      </div>

      <button type="button" class="add-button" @click="addQuestion">Add Question</button>
      <button type="submit" class="submit-button">Update Quiz</button>
    </form>
  </div>
</template>

<script>
import UploadFile from '../components/UploadFile.vue';
import storeDataToDatabase from '@/composables/StoreDataToDatabse';
import useCollection from '@/composables/useCollection';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: { UploadFile },
  props: ['id'],
  setup(props) {
    let { error, addDocument, updateDocument } = useCollection('quizzs');
    const db = getFirestore();
    let router = useRouter();
    let images = ref(null);
    let { uploadFile, err } = storeDataToDatabase();
    let quizData = ref(null);

    onMounted(() => {
      const docRef = doc(db, 'quizzs', props.id);
      onSnapshot(docRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          quizData.value = { ...docSnapshot.data(), id: docSnapshot.id };
          // Initialize the correctOption for each question based on isCorrect
          quizData.value.questions.forEach((question) => {
            const correctOption = question.options.findIndex((option) => option.isCorrect);
            question.correctOption = correctOption !== -1 ? correctOption : null;
          });
          console.log(quizData.value);
        } else {
          console.log('No such document!');
        }
      }, (error) => {
        console.error('Error fetching document:', error);
      });
    });

    let addQuestion = () => {
      quizData.value.questions.push({
        id: quizData.value.questions.length + 1,
        text: '',
        correctOption: null,
        options: [
          { id: 1, label: 'A', text: '', isCorrect: false },
          { id: 2, label: 'B', text: '', isCorrect: false },
        ],
      });
    };

    let addOption = (qIndex) => {
      const question = quizData.value.questions[qIndex];
      const optionId = question.options.length + 1;
      question.options.push({
        id: optionId,
        label: String.fromCharCode(64 + optionId),
        text: '',
        isCorrect: false,
      });
    };

    let submitForm = async () => {
      try {
        if (images.value && images.value.length > 0) 
        {
          let downloadUrl = await uploadFile(images.value[0].realFile);
          quizData.value.img = downloadUrl;
        }

        quizData.value.questions.forEach((question) => {
          question.options.forEach((option, index) => {
            option.isCorrect = index === question.correctOption;
          });
        });

        await updateDocument(props.id,quizData.value);

        router.push({ name: 'home', params: { bol: false } });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };

    let selectedImages = (selectedImagess) => {
      images.value = selectedImagess;
    };

    return {
      quizData,
      addQuestion,
      addOption,
      submitForm,
      selectedImages,
      images,
    };
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

h2 {
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
