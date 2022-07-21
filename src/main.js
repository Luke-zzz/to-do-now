import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Store from './store'

let app=createApp(App)
app.use(router).use(Store).mount('#app')
