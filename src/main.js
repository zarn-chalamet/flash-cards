import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import "./firebase/init";
import router from "./router";

const app = createApp(App);

app.use(router);

app.mount("#app");
