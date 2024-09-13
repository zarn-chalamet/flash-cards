import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import "./firebase/init";
import router from "./router";
import { getAuth } from "firebase/auth";

const auth = getAuth();

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(router);

    app.mount("#app");
  }
});
