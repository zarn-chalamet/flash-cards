<template>
  <div class="welcome container">
        <div v-if="showLogin">
          <Login @enterChatroom="enterChatroom"></Login>
          <p>Don't have an account? <span @click= "showLogin = !showLogin">Register Here</span></p>
        </div>
        <div v-else>
          <Signup @enterChatroom="enterChatroom"></Signup>
          <p>Already have an account? <span @click= "showLogin = !showLogin">Login here</span></p>
        </div>
    </div>
</template>

<script>
import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    Signup, Login },
  setup(){
    let router = useRouter();
    let showLogin = ref(true);

    let enterChatroom = () =>{
      router.push({ name: 'home', params: { bol: true } });
    }
    return {showLogin,enterChatroom}
  }
}
</script>

<style>
  .welcome {
    text-align: center;
    padding: 20px 0;
    background-color: white;
    width: 90%;
    max-width: 900px;
    border-radius: 10px;
    margin: 80px auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  /* form styles */
  .welcome form {
    width: 300px;
    margin: 20px auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  /* .welcome label {
    display: block;
    margin: 20px 0 10px;
  } */
  .welcome input {
    width: 70%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #eee;
    outline: none;
    color: #999;
    margin: 10px auto;
  }
  .welcome span{
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }
  p{
    font-size: small;
  }
</style>