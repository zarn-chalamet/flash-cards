<template>
  <header>
    <div class="nav-bar">
        <button class="b-nav" @click="goToFlash" :class="{ active: isShowFlash }">Flash Card</button>
        <button class="b-nav" @click="goToQuiz" :class="{ active: !isShowFlash }">Quiz</button>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue';

export default {
    setup(props,context){
        let isShowFlash = ref(true);

        let goToFlash = () => {
            isShowFlash.value = true
            context.emit("goToPage",isShowFlash.value);
        }

        let goToQuiz = () => {
            isShowFlash.value = false;
            context.emit("goToPage",isShowFlash.value)
        }

        return {goToFlash,goToQuiz,isShowFlash};
    }
}
</script>

<style>
    .nav-bar{
        display: flex;
        justify-content: left;
        margin: 0 20px;
        margin-top: 30px;
        
    }
    .b-nav{
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
        color: #333;
    }
</style>