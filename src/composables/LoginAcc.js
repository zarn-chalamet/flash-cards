import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";

let loginAcc = () => {
  const auth = getAuth();
  let error = ref(null);

  let logIn = async (email, password) => {
    try {
      let res = await signInWithEmailAndPassword(auth, email, password);
      if (!res) {
        throw new Error("can't login account");
      }
      return res;
    } catch (err) {
      error.value = err.message;
    }
  };

  return { error, logIn };
};
export default loginAcc;
