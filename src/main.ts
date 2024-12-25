import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import './assets/index.css'
import { createAuth0 } from '@auth0/auth0-vue'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)
//
app.use(
  createAuth0({
    domain: 'dev-2nle7jf7nt5rhoan.eu.auth0.com',
    clientId: 'eMNJKbceQj8mcoMAkeceG5plRKNgqqY3',
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: 'https://api.sparesti.com'
    }
  })
)

app.mount('#app')
