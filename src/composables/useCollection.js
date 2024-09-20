import {
  collection,
  getFirestore,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
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

  // Update an existing document in the collection
  let updateDocument = async (id, updatedData) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, updatedData);
      console.log("updated properly!!!");
    } catch (err) {
      console.log(err.message);
      error.value = "Could not update the document";
    }
  };

  return { error, addDocument, updateDocument };
};

export default useCollection;
