import { createApp } from 'vue'

import App from './App.vue'
import { createVuetify } from 'vuetify';
import 'vuetify/lib/styles/main.sass';
import { mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
import router from './router/router';
import { createPinia } from 'pinia';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      sets: {
        mdi,
      },
    },
  });


const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.use(vuetify);
app.mount('#app');

