
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";


require('./bootstrap');

window.Vue = require('vue');

new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount("#app");
