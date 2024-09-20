<template>
    <div class="card">
      <img :src="quiz.img" alt="">
      <div class="card-text">
            <h2>{{ quiz.title }}</h2>
            <div class="edit-box">
              <div class="length">
                {{ quiz.questions.length }} questions <br>
                <p>{{ quiz.owner_email }}</p>
              </div>
              <div class="edit-icon" v-if="edit">
                <router-link :to="{name:'Quiz-Edit',params:{id:quiz.id}}">
                  <span class="material-symbols-outlined">
                    edit
                  </span>
                </router-link>
              </div>
            </div>
            
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props:['quiz','edit']
  }
  </script>
  
  <style scoped>
    .card {
      width: 310px;
      overflow: hidden;
      border-radius: 2%;
      box-shadow: 1px 1px 10px rgba(0,0,0,0.1);
      margin-bottom: 35px;
      margin-right: 20px;
      cursor: pointer;
    }

    .card img {
      width: 100%;
      height: 190px;
      margin: 0
    }

    .card .card-text {
      padding: 0 5px
    }

    .card .card-text h2 {
      font-weight: bold;
      padding-left: 20px;
    }
    .card .length{
      padding-bottom: 15px;
      padding-left: 20px;
    }
    .edit-box{
      display: flex;
      justify-content: space-between;
    }
    .edit-icon{
      margin-right: 20px;
    }
</style>