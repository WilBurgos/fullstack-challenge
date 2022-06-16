import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'index',
        component:  require('../components/auth/LoginComponent').default
    },
    {
        path: '/login',
        name: 'login',
        component:  require('../components/auth/LoginComponent').default,
        meta:{
            requiresVisitor:true
        }
    },
    {
        path: '/register',
        name: 'register',
        component:  require('../components/auth/RegisterComponent').default,
        meta:{
            requiresVisitor:true
        }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component:  require('../components/ExampleComponent').default,
        meta:{
            requiresAuth:true
        }
    }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.MIX_BASE_URL,
  routes,
});

export default router;
