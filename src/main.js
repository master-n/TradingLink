// import $ from 'jquery';
// window.jQuery = $;
// window.$ = $;

import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import i18n from './i18n'
// import VueSlideBar from 'vue-slide-bar'
import './utils/filters'

import '../public/frontend/assets/js/main'

import * as VueGoogleMaps from "vue2-google-maps";



import router from './router'
import store from './store/store';

import "@/assets/scss/app-css.scss";


import ImageMagnifier from 'vue-image-magnifier'
// import VueDraggable from "vue-draggable";

Vue.use(ImageMagnifier)

import {initializeApp} from "firebase/app";




Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDh6omW0tuZo8Kjy6UJtn2W00-1L1DHQqE",
    libraries: "places"
  },
    installComponents: true
});

const firebaseConfig = {
    apiKey: "AIzaSyBCyDzjOoDo9Ps3y2yP5wH1w1UFHsTe9VE",
    authDomain: "redcabs-326d4.firebaseapp.com",
    databaseURL: "https://redcabs-326d4-default-rtdb.firebaseio.com",
    projectId: "redcabs-326d4",
    storageBucket: "redcabs-326d4.appspot.com",
    messagingSenderId: "114266712759",
    appId: "1:114266712759:web:4c212de3390a1e2797bb32",
    measurementId: "G-BK7HJ77JDX"
};


// Initialize Firebase
initializeApp(firebaseConfig);


// Vue.use(VueDraggable)
// Vue.use(VueQuillEditor)
// Vue.use(VueMask)

Vue.use(BootstrapVue)




new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app')
