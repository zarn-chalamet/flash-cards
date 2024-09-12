<template>
    <div class="card-single">
      <label>Card {{ index + 1 }}</label>
      <label>Term</label>
      <input type="text" v-model="term" placeholder="Enter term" @keypress.enter.prevent="">
      <label>Definition</label>
      <input type="text" v-model="definition" placeholder="Enter definition" @keypress.enter.prevent="sendData">
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    props: ['index'],
    setup(props, context) {
      let term = ref("");
      let definition = ref("");
  
      let sendData = () => {
        let newCard = { id: props.index, term: term.value, definition: definition.value };
        context.emit("addCard", newCard);
      };
  
      return { term, definition, sendData };
    }
  }
  </script>
  
  <style scoped>
  .card-single {
    background-color: #fff;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    margin-top: 30px;
    margin-bottom: 20px;
    transition: all 0.3s ease;
  }
  
  .card-single:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    margin-top: 10px;
    text-transform: uppercase;
    color: #333;
  }
  
  input {
    display: block;
    width: 100%;
    padding: 10px 0;
    margin-bottom: 15px;
    border: none;
    border-bottom: 2px solid #ced4da;
    background-color: transparent;
    font-size: 1em;
    transition: border-color 0.3s ease;
  }
  
  input:focus {
    border-color: #79bbea;
    outline: none;
  }
  </style>
  