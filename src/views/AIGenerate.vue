<template>
  <h3>Generate Your Flashs Cards and Quizzes by AI</h3>
  <UploadPdf @selectedFiles="selectedFiles"></UploadPdf>
  <button type="submit" @click="submitFile">Submit</button>
</template>

<script>
import storeDataToDatabase from '@/composables/StoreDataToDatabse';
import UploadPdf from '../components/UploadPdf.vue'
import { ref } from 'vue';
export default {
  components: {
    UploadPdf,
    },
    setup(){
        let files = ref(null);
        let {uploadFile, err} = storeDataToDatabase();

        let selectedFiles = (selectedFiles) => {
            files.value = selectedFiles;
        }

        let submitFile = async () => {
            let downloadUrl = await uploadFile(files.value[0].file);
            console.log(downloadUrl);
            alert("added to the firebase storage." + downloadUrl)
        }

        return {files, selectedFiles,submitFile};
    }

}
</script>


<style>

</style>