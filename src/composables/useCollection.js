import { collection, getFirestore, addDoc } from "firebase/firestore";
import { ref } from "vue";

let useCollection = (collectionName) => {
  let error = ref(null);
  const db = getFirestore();

  let addDocument = async (doc) => {
    try {
      const collectionRef = collection(db, collectionName);
      await addDoc(collectionRef, doc);
    } catch (err) {
      console.log(err.message);
      error.value = "Could not send the message";
    }
  };

  return { error, addDocument };
};

export default useCollection;
