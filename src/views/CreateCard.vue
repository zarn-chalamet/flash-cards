<template>
  <div class="main-form">
    <form @submit.prevent="submitForm">
      <div class="title-bar">
        <label for="">Title</label>
        <input type="text" v-model="title" placeholder="Enter title" required>
        <label for="">Description</label>
        <input type="text" v-model="description" placeholder="Enter description" required>
      </div>
      <div class="card-container">
        <div v-for="(card, index) in cards" :key="index">
          <CreateSingleCard :index="index" @addCard="addCard"></CreateSingleCard>
        </div>
      </div>
      <button class="add-button" type="button" @click="addSingleCard">
        Add Card
      </button>
      <button class="create-button" type="submit">Create</button>
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

    const cards = ref([{ id: 0, term: '', definition: '' }]);

    let { error, addDocument } = useCollection("flash-cards");

    let addSingleCard = () => {
      cards.value.push({ id: cards.value.length, term: '', definition: '' });
    };

    let addCard = (newCard) => {
      const index = cards.value.findIndex(card => card.id === newCard.id);
      if (index !== -1) cards.value[index] = newCard;
      else cards.value.push(newCard);
    };

    let submitForm = async () => {
      let newFlashCard = {
        title: title.value,
        description: description.value,
        cards: cards.value
      };
      await addDocument(newFlashCard);
      router.push({ name: 'home', params: { bol: true } });
    };

    return { cards, title, description, error, addSingleCard, addCard, submitForm };
  }
}
</script>

<style scoped>
.main-form {
  max-width: 750px;
  margin: 70px auto;
  background-color: #f8f9fa;
  padding: 40px 30px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.title-bar {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  color: #333;
  text-transform: uppercase;
  margin-bottom: 10px;
}

input {
  display: block;
  width: 100%;
  padding: 10px 0;
  margin-bottom: 20px;
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

.card-container {
  margin-bottom: 20px;
}

.add-button,
.create-button {
  background-color: #45abc4;
  color: #fff;
  border: none;
  border-radius: 25px;
  padding: 12px 25px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
}

.add-button i {
  margin-right: 8px;
}

.add-button:hover,
.create-button:hover {
  background-color: #2b66a4;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.create-button {
  float: right;
}

button:active {
  transform: translateY(0);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
