import { getAuth } from "firebase/auth";
import { ref } from "vue";

let getUser = () => {
  const auth = getAuth();

  let user = ref(auth.currentUser);

  auth.onAuthStateChanged((_user) => {
    user.value = _user;
  });

  return { user };
};
export default getUser;
