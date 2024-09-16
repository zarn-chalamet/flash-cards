<template>
    <div>
      <span class="choose-btn" @click="selectFile">
        <span class="material-symbols-outlined">attach_file</span>
      </span>
      <input 
        name="file" 
        type="file" 
        ref="fileInput" 
        @change="onFileSelect" 
        accept=".pdf,.doc,.docx" 
        style="display: none;" 
      />
  
      <div v-if="selectedFiles.length > 0" class="file-container">
        <div v-for="(selectedFile, index) in selectedFiles" :key="index" class="file-box">
          <span class="file-name">{{ selectedFile.name }}</span>
          <span class="remove-btn" @click="removeFile(index)">×</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup(props, context) {
      const selectedFiles = ref([]);
      const fileInput = ref(null);
  
      const selectFile = () => {
        fileInput.value.click();
      };
  
      const onFileSelect = (event) => {
        const files = event.target.files;
        if (files.length === 0) return;
  
        const file = files[0]; // Only take the first file
        const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        if (!validTypes.includes(file.type)) return; // Check if it's a valid type (PDF or DOC)
  
        selectedFiles.value = [{ name: file.name, file }]; // Replace previous file
        context.emit('selectedFiles', selectedFiles.value); // Emit the updated array
      };
  
      const removeFile = (index) => {
        selectedFiles.value.splice(index, 1);
        context.emit('selectedFiles', selectedFiles.value); // Emit updated array if the file is removed
      };
  
      return {
        selectFile,
        onFileSelect,
        removeFile,
        selectedFiles,
        fileInput,
      };
    },
  };
  </script>
  
  <style scoped>
    .choose-btn {
      background-color: #4CAF50;
      color: white;
      padding: 15px 20px 5px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;
    }
  
    .choose-btn:hover {
      background-color: #45a049;
    }
  
    .file-container {
      margin-top: 20px;
    }
  
    .file-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      margin: 10px 0;
      border: 2px solid #ddd;
      border-radius: 10px;
      background-color: #f9f9f9;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .file-name {
      font-size: 14px;
      color: #333;
    }
  
    .remove-btn {
      background-color: rgba(255, 0, 0, 0.7);
      color: white;
      border: none;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
      line-height: 20px;
      transition: background-color 0.3s;
    }
  
    .remove-btn:hover {
      background-color: rgba(255, 0, 0, 1);
    }
  
    .material-symbols-outlined {
      font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24;
    }
  </style>
  