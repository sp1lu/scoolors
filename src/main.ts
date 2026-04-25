/* Dependencies */
import { createApp } from 'vue'

/* Style */
import './style.css'

/* Components */
import App from './App.vue'

/* Router */
import { router } from './app/router'

/* Bootstrap */
createApp(App)
    .use(router)
    .mount('#app')