<template>
    <h2>Log In</h2>
    <form @submit.prevent="loginFun">
        <input type="email" placeholder="email" v-model="email">
        <input type="password" placeholder="password" v-model="password">
        <p v-if="error">{{ error }}</p>
        <button>
            Login
        </button>
        <div class="avatar" @click="signInWithGoogle">
          <img src="../assets/google.jpg" alt="Avatar" class="avatar-img" />
        </div>
      
    </form>
</template>

<script>
import loginAcc from '@/composables/LoginAcc';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ref } from 'vue';

export default {
    setup(props,context){
        let email = ref("");
        let password = ref("");
        let {error, logIn} = loginAcc();
        const auth = getAuth();

        let loginFun = async() =>{
            let res = await logIn(email.value,password.value);
            if(res){
                context.emit("enterChatroom");
            }
        };

        let signInWithGoogle = async () => {
            const provider = new GoogleAuthProvider();
            try{
                const result = await signInWithPopup(auth,provider);
                if(result.user){
                    context.emit("enterChatroom");
                }
            }catch(err){
                console.log(err);
            }
        }
        return {loginFun,email,password,error,signInWithGoogle}
    }
}
</script>

<style scoped>
/* Circle Avatar */
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  margin: 10px auto;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>