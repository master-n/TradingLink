import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import i18n from './i18n'
import './utils/filters'
import '../public/frontend/assets/js/main'
import * as VueGoogleMaps from "vue2-google-maps"
import router from './router'
import store from './store/store'
import "@/assets/scss/app-css.scss"
import ImageMagnifier from 'vue-image-magnifier'
import { initializeApp } from "firebase/app"

Vue.use(ImageMagnifier)
Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: "places"
  },
  installComponents: true
})

const firebaseConfig = {
  apiKey:            process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain:        process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL:       process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId:         process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.VUE_APP_FIREBASE_APP_ID,
}

initializeApp(firebaseConfig)

Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
