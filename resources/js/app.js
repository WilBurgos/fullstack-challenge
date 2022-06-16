
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
require('./bootstrap');

library.add(faTrashCan);
window.Vue = require('vue');
Vue.component('font-awesome-icon', FontAwesomeIcon)

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters["auth/loggedIn"]) {
            next({
                name: 'login',
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters["auth/loggedIn"]) {
            next({
                name: 'dashboard',
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount("#app");
