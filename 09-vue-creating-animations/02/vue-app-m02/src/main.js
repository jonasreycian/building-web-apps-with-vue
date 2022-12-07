import { createApp, h } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue'

import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'

const routes = [
    { path: '/', component: App },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

//createApp(App).use(router).mount('#app')

const app = createApp({
    render: () => h(App)
  })
  
  new WaveUI(app, {
    // Some Wave UI options.
  })

app.use(router)
app.mount('#app')
