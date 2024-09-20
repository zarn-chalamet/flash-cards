<template>
    <header>
      <div class="nav-bar">
        <div class="nav-buttons">
          <button class="b-nav" @click="goToFlash" :class="{ active: isShowFlash === 'true' }">Flash Card</button>
          <button class="b-nav" @click="goToQuiz" :class="{ active: isShowFlash === 'false'}">Quiz</button>
        </div>
        <div>
          <router-link to="/generate">
            <button class="b-nav">
              create by AI
            </button>
          </router-link>
        </div>
      </div>
    </header>
  </template>
  
  <script>
import { useRouter } from 'vue-router';
  
  export default {
    props: ['isShowFlash'],
    setup() {
        const router = useRouter();
      const goToFlash = () => {
        router.push({ name: 'home', params: { bol: true } });
      };
  
      const goToQuiz = () => {
        router.push({ name: 'home', params: { bol: false } });
      };
  
      return { goToFlash, goToQuiz };
    },
  };
  </script>
  
  <style>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  flex-wrap: nowrap; /* Prevents wrapping */
}

.nav-buttons {
  display: flex;
  flex-wrap: nowrap; /* Ensures buttons stay on one line */
}

.b-nav {
  background: none;
  border: none;
  color: #8e8e90;
  outline: none;
  font-size: 12px;
  text-transform: uppercase;
  margin-left: 0;
  margin-right: 10px;
  letter-spacing: 1px;
  font-weight: bold;
  cursor: pointer;
  flex-shrink: 1; /* Allows the buttons to shrink */
}

.b-nav.active {
  color: #0a0a0a;
  font-weight: bold;
}

@media (max-width: 600px) {
  .nav-bar {
    flex-direction: row; /* Keep the layout in one row */
  }

  .b-nav {
    font-size: 10px; /* Make text smaller on smaller screens */
    margin-right: 5px; /* Adjust margins for small screens */
  }
}
</style>
  