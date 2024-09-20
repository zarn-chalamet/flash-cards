<template>
    <div>
        <router-link :to="{name: 'home', params:{bol: false}}">
            <button>Back to Quizzes</button>
        </router-link>
    </div>
    <div class="quiz-view">
      <header class="quiz-header">
        <h3>Quiz View</h3>
        <h4>Total Marks: {{ mark }}</h4>
      </header>
  
      <div class="result-box">
        <div v-for="question in quiz.questions" :key="question.id" class="question-container">
          <h3 class="question-text">{{ question.text }}</h3>
  
          <div class="options-container">
            <div 
              v-for="option in question.options" 
              :key="option.id" 
              :class="['option', { correct: option.isCorrect, incorrect: !option.isCorrect }]"
            >
              <div class="option-label">
                <h5>{{ option.label }}</h5>
              </div>
              <div class="option-text">
                <h5>{{ option.text }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['mark', 'quiz'],
  }
  </script>
  
  <style scoped>
  .quiz-view {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .quiz-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .result-box {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  .question-container {
    margin-bottom: 30px;
  }
  
  .question-text {
    margin-bottom: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: left;
  }
  
  .options-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .option {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 10px;
    background-color: #fff;
    flex-basis: calc(50% - 10px);
  }
  
  .option-label {
    margin-right: 10px;
  }
  
  .correct {
    background-color: #d4edda;
    border-color: #28a745;
  }
  
  .incorrect {
    background-color: #f8d7da;
    border-color: #dc3545;
  }
  
  h5 {
    margin: 0;
    font-size: 1rem;
  }
  </style>
  