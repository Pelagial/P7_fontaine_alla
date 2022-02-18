import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import App from './App.vue'
import router from './router'
import store from './store'

library.add(fas, far);

const app = createApp(App)

app.use(router)
app.use(store)
app.component('fa',FontAwesomeIcon)
app.mount('#app')
