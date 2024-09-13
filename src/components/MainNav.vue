<template>
  <header>
    <nav @click="closeModal">
      <div class="logo">
        <router-link :to="{name: 'home', params:{bol: true}}">FLASH</router-link>
      </div>
      <div class="nav-actions">
        <router-link to="" @click="toggleModal" class="create-button">CREATE</router-link>
      </div>

      <!-- Modal for Phone Users (Bottom Modal) -->
      <div v-if="showModal && isPhone" class="modal-backdrop" @click="showModal = false">
        <div class="modal-content-phone" @click.stop>
          <!-- <h3>Select a Page</h3> -->
          <button class="modal-btn" @click="goToPage('create')">Create Flash</button>
          <button class="modal-btn" @click="goToPage('create-quiz')">Create Quiz</button>
        </div>
      </div>

      <!-- Modal for Web Users (Small Modal Below Button) -->
      <div v-if="showModal && !isPhone" class="modal-content-web" @click.stop>
        <!-- <h3>Select a Page</h3> -->
        <button class="modal-btn" @click="goToPage('create')">Create Flash</button>
        <button class="modal-btn" @click="goToPage('create-quiz')">Create Quiz</button>
      </div>
    </nav>
  </header>
</template>



<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    let router = useRouter();
    let showModal = ref(false);
    let isPhone = ref(false);

    const toggleModal = (event) => {
      event.preventDefault();
      showModal.value = !showModal.value;
    };

    const goToPage = (page) => {
      router.push({ name: page });
      showModal.value = false;
    };

    const checkDevice = () => {
      isPhone.value = window.innerWidth <= 768; // Detect phone size
    };

    onMounted(() => {
      checkDevice();
      window.addEventListener('resize', checkDevice);
    });

    return { showModal, goToPage, isPhone, toggleModal };
  },
};
</script>



<style scoped>
/* Navigation Bar */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #45abc4;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-actions .create-button {
  background-color: white;
  color: #45abc4;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
}

.nav-actions .create-button:hover {
  background-color: #f8f9fa;
  color: #0056b3;
}

/* Modal Backdrop for Phone */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
}

/* Modal for Phone Users */
.modal-content-phone {
  background-color: white;
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  border-radius: 15px 15px 0 0;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease-in-out;
}

.modal-content-phone h3 {
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.modal-btn {
  background-color: #0d6efd;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0.5rem 0;
  width: 100%;
  text-transform: uppercase;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.modal-btn:hover {
  background-color: #0056b3;
}

.modal-btn:active {
  transform: scale(0.98);
}


.modal-content-web {
  position: absolute;
  top: 100px;
  right: 15px; 
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 1001;
  width: 180px;
}

.modal-content-web h3 {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.modal-content-web .modal-btn, .modal-content-phone .modal-btn {
  background-color: #45abc4;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  width: 100%;
  margin: 0.5rem 0;
  cursor: pointer;
}

.modal-content-web .modal-btn:hover, .modal-content-phone .modal-btn:hover {
  background-color: #0056b3;
}

.modal-content-web .modal-btn:active, .modal-content-phone .modal-btn:active {
  transform: scale(0.98);
}

@media screen and (max-width: 768px) {
  .modal-content-web {
    display: none;
  }
}

@media screen and (min-width: 769px) {
  .modal-backdrop {
    display: none;
  }
}
</style>
