import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

let createUser = () => {
  let error = ref(null);
  const auth = getAuth();
  let signUpFun = async (email, password, displayName) => {
    try {
      let res = await createUserWithEmailAndPassword(auth, email, password);

      console.log(email, password);

      if (!res) {
        throw new Error("Could not create new user");
      }

      await updateProfile(res.user, { displayName });

      return res;
    } catch (err) {
      error.value = err.message;
    }
  };

  return { error, signUpFun };
};

export default createUser;
