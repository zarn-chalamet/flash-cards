<template>
    <h2>SignUp</h2>
    <form @submit.prevent="signUp">
      <input type="text" placeholder="display name" v-model="displayName">
      <input type="email" placeholder="email" v-model="email">
      <input type="password" placeholder="password" v-model="password">
      <p v-if="error">{{ error }}</p>
      <button>
          Sign up
      </button>
    </form>
</template>

<script>
import createUser from '@/composables/SignupAcc';
import { ref } from 'vue';

export default {
    setup(props,context){
        let displayName = ref("");
        let email = ref("");
        let password = ref("");

        let {error, signUpFun} = createUser();

        let signUp = async() => {
            let res = await signUpFun(email.value,password.value,displayName.value);

            if(res){
                context.emit("enterChatroom");
            }
        };
        return {displayName,email,password,signUp,error};
    },
}
</script>

<style>

</style>