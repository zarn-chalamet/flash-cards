<template>
  <header>
    <nav @click="closeModal">
      <div class="logo">
        <router-link :to="{name: 'home', params:{bol: true}}">FLASH</router-link>
      </div>
      <div class="nav-actions">
        <router-link to="" @click="toggleModal" class="create-button"><span class="material-symbols-outlined">
add
</span></router-link>
        
        <!-- Circle Avatar -->
        <div class="avatar" @click="toggleAvatarModal">
          <div v-if="user.photoURL">
            <img :src="user.photoURL" alt="Avatar" class="avatar-img" />
          </div>
          <div v-else>
            <img src="https://cdn-icons-png.flaticon.com/512/168/168732.png" alt="Avatar" class="avatar-img" />
          </div>
        </div>
      </div>

      <!-- Modal for Phone Users (CREATE) -->
      <div v-if="showModal && isPhone" class="modal-backdrop" @click="showModal = false">
        <div class="modal-content-phone" @click.stop>
          <button class="modal-btn" @click="goToPage('create')">Create Flash</button>
          <button class="modal-btn" @click="goToPage('create-quiz')">Create Quiz</button>
        </div>
      </div>

      <!-- Modal for Phone Users (AVATAR) -->
      <div v-if="showAvatarModal && isPhone" class="modal-backdrop" @click="showAvatarModal = false">
        <div class="modal-content-phone" @click.stop>
          <div class="info">
            <span>{{ user.displayName }}</span>
            <br>
            <span>{{ user.email }}</span>
          </div>
          <!-- <button class="modal-btn" @click="goToPage('profile')">View Profile</button> -->
          <button class="modal-btn" @click="logOut">Logout</button>
        </div>
      </div>

      <!-- Modal for Web Users (CREATE) -->
      <div v-if="showModal && !isPhone" class="modal-content-web" @click.stop>
        <button class="modal-btn" @click="goToPage('create')">Create Flash</button>
        <button class="modal-btn" @click="goToPage('create-quiz')">Create Quiz</button>
      </div>

      <!-- Modal for Web Users (AVATAR) -->
      <div v-if="showAvatarModal && !isPhone" class="modal-content-web" @click.stop>
        <!-- <button class="modal-btn" @click="goToPage('profile')">View Profile</button> -->
        <div class="info">
            <span>{{ user.displayName }}</span>
            <br>
            <span>{{ user.email }}</span>
          </div>
        <button class="modal-btn" @click="logOut">Logout</button>
      </div>
    </nav>
  </header>
</template>

<script>
import getUser from '@/composables/GetUser';
import { getAuth } from 'firebase/auth';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    let router = useRouter();
    let showModal = ref(false);
    let showAvatarModal = ref(false); // State for avatar modal
    let isPhone = ref(false);
    let isFlashWorking = ref(false);
    let isAvatarWorking = ref(false);
    let { user } = getUser();
    const auth = getAuth();

    const toggleModal = (event) => {
      event.preventDefault();
      
      if(!isAvatarWorking.value){
        showModal.value = ! showModal.value;
        isFlashWorking.value = !isFlashWorking.value;
      }
    };

    const toggleAvatarModal = (event) => {
      event.preventDefault();
      
      if(!isFlashWorking.value){
        showAvatarModal.value = !showAvatarModal.value;
        isAvatarWorking.value = !isAvatarWorking.value;
      }
    };

    const goToPage = (page) => {
      router.push({ name: page });
      showModal.value = false;
      showAvatarModal.value = false; // Close avatar modal when navigating
    };

    const checkDevice = () => {
      isPhone.value = window.innerWidth <= 768; // Detect phone size
    };

    let logOut = async () => {
      console.log('runned');
      try{
        console.log(auth.currentUser);
        await auth.signOut();
        console.log(auth.currentUser);
      }
      catch(err){
        error.value = err.message;
      }
    }

    onMounted(() => {
      console.log("URL");
      console.log(user.value.photoURL);
      checkDevice();
      window.addEventListener('resize', checkDevice);
    });

    return { showModal, goToPage, isPhone, toggleModal, toggleAvatarModal, showAvatarModal,logOut, user};
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

.nav-actions {
  display: flex;
  align-items: center;
}

.create-button {
  background-color: white;
  color: #45abc4;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  margin-right: 10px;
}

.create-button:hover {
  background-color: #f8f9fa;
  color: #0056b3;
}

/* Circle Avatar */
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.info span{
  color: black;
}
</style>
