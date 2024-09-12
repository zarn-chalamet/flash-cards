<template>
  <header>
    <nav @click="closeModal">
        <router-link to="/">FLASH </router-link>
        <router-link to="" @click="showModal = true">CREATE</router-link>

    <!-- Custom Bottom Modal -->
        <div v-if="showModal" class="modal-backdrop" @click="showModal = false">
          <div class="modal-content" @click.stop>
            <h3>Select a Page</h3>
            <button @click="goToPage('create')">Create Flash</button>
            <button @click="goToPage('create-quiz')">Create Quiz</button>
          </div>
        </div>

    </nav>
  </header>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup(){
      let router = useRouter();
      let showModal = ref(false);
      

      let goToPage = ((page) =>{
        router.push({name: page});
        showModal.value = false;
      })
      return {showModal,goToPage};
    }
}
</script>

<style scoped>
    nav{
        display: flex;
        justify-content: space-between;
    }
    .modal-backdrop {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
      }

    .modal-content {
      position: fixed;
      top:0;
      right: 0;
      background: white;
      padding: 20px;
      border-radius: 10px 10px 0 0;
      transition: transform 0.3s;
    }

    
</style>