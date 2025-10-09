import { createApp } from 'vue'
import App from '../src/views/App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import 'jquery'
import 'popper.js'
import router from "./router"


const app = createApp(App)
app.use(router).mount('#app')