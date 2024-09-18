<template>
  <h3>Generate Your Flashs Cards and Quizzes by AI</h3>
  <UploadPdf @selectedFiles="selectedFiles"></UploadPdf>
  <button type="submit" @click="submitFile">Submit</button>
  <div v-if="extractedText">{{ extractedText }}</div>

  <div v-if="questionsAndAnswers">
    {{ questionsAndAnswers }}
  </div>
</template>

<script>
import storeDataToDatabase from '@/composables/StoreDataToDatabse';
import UploadPdf from '../components/UploadPdf.vue'
import { ref } from 'vue';
import extractText from '@/composables/ExtractText';
import * as pdfjsLib from "pdfjs-dist";
import genQuizzes from '@/composables/GenQuizzes';
import axios from 'axios';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';

export default {
  components: {
    UploadPdf,
    },
    setup(){
        let files = ref(null);
        let {uploadFile, err} = storeDataToDatabase();
        let extractedText = ref(null);
        let { extractTextFromPDF } = extractText();
        let {  generateQuizFromText, getAnswersForQuestions, generateDistractors } = genQuizzes();
        let quizes = ref(null);
        let loading = ref(false);
        let questions = ref(null);
        let questionsAndAnswers = ref(null);
        let contexts = ref(null);
        let generatedQuesAndAns = ref([]);
        let quizOrgData = ref({
                            id: 1,
                            img: '',
                            title: '',
                            questions: [ ],});

        let selectedFiles = (selectedFiles) => {
            files.value = selectedFiles;
        }

        let submitFile = async () => {
          loading.value = true;
          quizes.value = null;
          try {
            let downloadUrl = await uploadFile(files.value[0].file);
            console.log(downloadUrl);
            
            const reader = new FileReader();
            reader.onload = async (e) => {
                const typedArray = new Uint8Array(e.target.result);
                extractedText.value = await extractTextFromPDF(typedArray);

                if(extractedText.value){
                  let {allGeneratedQuizzes,contextss} = await generateQuizFromText(extractedText.value);
                  questions.value = allGeneratedQuizzes;
                  contexts.value = contextss;
                  console.log("Generated Questions:", questions.value);

                  questionsAndAnswers.value = await getAnswersForQuestions(extractedText.value, questions.value);
                  console.log("Questions and Answers:", questionsAndAnswers.value);

                  for (let i = 0; i < questionsAndAnswers.value.length; i++) {
                    const { question, answer } = questionsAndAnswers.value[i];

                    // Generate 3 distractors for each question
                    const distractor1 = await generateDistractors(contexts.value[i+1], question, answer);
                    const distractor2 = await generateDistractors(contexts.value[(i + 2) % contexts.value.length], question, answer);
                    const distractor3 = await generateDistractors(contexts.value[(i + 3) % contexts.value.length], question, answer);

                    console.log(`Distractors for Question ${i + 1}:`);
                    console.log("Distractor 1: ", distractor1);
                    console.log("Distractor 2: ", distractor2);
                    console.log("Distractor 3: ", distractor3);

                    generatedQuesAndAns.value.push({question: question,answer: answer,distractors:[distractor1,distractor2,distractor3]});

                  }

                  creatQuizAutomation();
                  console.log(quizOrgData.value)

                }
                console.log(generatedQuesAndAns.value[0])
                console.log(quizOrgData.value.questions[0].options[0])
                loading.value = false;
            };

            reader.readAsArrayBuffer(files.value[0].file);
          } catch (error) {
            console.error("Error during submission:", error);
            loading.value = false; // End loading state on error
          }
        }

        let creatQuizAutomation = () => {
          quizOrgData.value.questions = generatedQuesAndAns.value.map((item, index) => ({
            id: index + 1,
            text: item.question,
            options: [
              { id: 1, label: 'A', text: item.answer, isCorrect: true },
              ...item.distractors.map((distractor, idx) => ({
                id: idx + 2, // IDs for distractors
                label: String.fromCharCode(66 + idx), // B, C, D
                text: distractor,
                isCorrect: false,
              })),
            ],
          }));

        }

        
        return {files, selectedFiles,submitFile,extractedText,quizes,questionsAndAnswers};
    }

}
</script>


<style>

</style>