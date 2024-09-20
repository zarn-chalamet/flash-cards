<template>
    <header>
      <div class="nav-bar">
        <div>
          <button class="b-nav" @click="goToFlash" :class="{ active: isShowFlash === 'true' }">Flash Card</button>
          <button class="b-nav" @click="goToQuiz" :class="{ active: isShowFlash === 'false'}">Quiz</button>
        </div>
        <div>
          <router-link to="/generate">
            <button>
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
    margin-top: 30px;
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
  }
  .b-nav.active {
    color: #0a0a0a;
    font-weight: bold;
  }
  </style>
  