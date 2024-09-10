<template>
  <div class="card-single">
      <label for="">{{ index }}</label>
      <label>Term</label>
      <input type="text" v-model="term" @keypress.enter.prevent="">
      <label>Definiton</label>
      <input type="text" v-model="definition" @keypress.enter.prevent="sendData">
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
    props:['index'],
    setup(props,context){

        let term = ref("");
        let definition = ref("");

        let sendData = () => {
            let newCard = {
                id: props.index,
                term: term.value,
                definition: definition.value
            }
            context.emit("addCard",newCard);
        }

        return {term, definition, sendData};
    }
}
</script>

<style>
    .card-single{
        background-color: white;
        padding: 20px;
        border-radius: 20px;
        margin-top: 40px;
    }
</style>