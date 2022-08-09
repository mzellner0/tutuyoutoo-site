import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Translation from './assets/local/translations';

const app = createApp(App);

app.config.globalProperties.$tr = Translation;

export default app
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .mount('#app');


