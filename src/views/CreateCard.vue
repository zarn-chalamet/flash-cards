<template>
  <div class="main-form">
    <form @submit.prevent="submitForm">
      <div class="title-bar">
        <label for="">Title</label>
        <input type="text" v-model="title" required>
        <label for="">Description</label>
        <input type="text" v-model="description" required>
      </div>
      <div>
        <div v-for="(card,index) in cards" :key="index" >
          <CreateSingleCard :index="index" @addCard="addCard"></CreateSingleCard>
        </div>
      </div>
      <button type="button" @click="addSingleCard">Add Card</button>
      <button type="submit">Create</button>
    </form>

  </div>  
</template>

<script>
import { ref } from 'vue';
import CreateSingleCard from '../components/CreateSingleCard.vue'
import useCollection from '@/composables/useCollection';
import { useRouter } from 'vue-router';
export default {
  components: { CreateSingleCard },
  setup(){

    let router = useRouter();

    let title = ref("");
    let description = ref("");

    const cards = ref([{
                id: 0,
                term: '',
                definition: ''
            }]);

    let {error,addDocument} = useCollection("flash-cards");

    let addSingleCard = () => {
      cards.value.push({
                id: cards.value.length,
                term: '',
                definition: ''
            });
    }

    let addCard = (newCard) => {
  
      const index = cards.value.findIndex(card => card.id === newCard.id);

      if (index !== -1) {
        
        cards.value[index] = newCard;
      } else {
        
        cards.value.push(newCard);
      }
    }

    let submitForm = async ()=> {
      let newFlashCard = {
        title : title.value,
        description: description.value,
        cards: cards.value
      }
      await addDocument(newFlashCard);
      router.push("/");
    }

    return {cards,title,description,error,addSingleCard,addCard,submitForm};
  }
}
</script>

<style>
  .main-form{
    max-width: 700px;
    margin: 50px auto;
  }
  label{
    display: block;
    text-transform: uppercase;
    padding: 0 20px;
    font-size: 0.75em;
  }
  input{
    display: block;
    width: 90%;
    margin: 10px 20px;
    padding: 5px;
    border: none;
    background-color: transparent;
    border-bottom: 1px solid rgb(222, 224, 228);
  }
  button {
    background-color: white;
    margin-top: 10px;
    margin-right: 5px;
    color: black;
    border: none; 
    border-radius: 50px; 
    padding: 15px 30px; 
    font-size: 12px;
    text-transform: uppercase;
    font-weight: bold; 
    letter-spacing: 1px; 
    cursor: pointer; 
    transition: all 0.3s ease; 
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  button:hover {
    background-color: #79bbea;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }

  button:active {
    transform: translateY(0);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

</style>