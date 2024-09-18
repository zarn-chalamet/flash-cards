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
        let {  generateQuizFromText, getAnswersForQuestions } = genQuizzes();
        let quizes = ref(null);
        let loading = ref(false);
        let questions = ref(null);
        let questionsAndAnswers = ref(null);

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
                  questions.value = await generateQuizFromText(extractedText.value);
                  console.log("Generated Questions:", questions.value);

                  questionsAndAnswers.value = await getAnswersForQuestions(extractedText.value, questions.value);
                  console.log("Questions and Answers:", questionsAndAnswers.value);

                }
                loading.value = false;
            };

            reader.readAsArrayBuffer(files.value[0].file);
          } catch (error) {
            console.error("Error during submission:", error);
            loading.value = false; // End loading state on error
          }
        }

        
        return {files, selectedFiles,submitFile,extractedText,quizes,questionsAndAnswers};
    }

}
</script>


<style>

</style>