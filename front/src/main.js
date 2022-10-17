import { createApp } from 'vue';
import { router } from './routes/router.js';
import './index.css';
import App from './App.vue';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)

app.use(router);
app.use(VueSweetalert2);

app.mount('#app')