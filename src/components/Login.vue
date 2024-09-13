<template>
    <h2>Log In</h2>
    <form @submit.prevent="loginFun">
        <input type="email" placeholder="email" v-model="email">
        <input type="password" placeholder="password" v-model="password">
        <p v-if="error">{{ error }}</p>
        <button>
            Login
        </button>
    </form>
</template>

<script>
import loginAcc from '@/composables/LoginAcc';
import { ref } from 'vue';

export default {
    setup(props,context){
        let email = ref("");
        let password = ref("");
        let {error, logIn} = loginAcc();

        let loginFun = async() =>{
            let res = await logIn(email.value,password.value);
            if(res){
                context.emit("enterChatroom");
            }
        };
        return {loginFun,email,password,error}
    }
}
</script>

<style>

</style>