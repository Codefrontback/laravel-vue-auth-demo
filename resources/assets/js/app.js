import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import Dashboard from './components/Dashboard.vue';
import Home from './components/Home.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import store from './store';
import InfiniteScroll from 'v-infinite-scroll'
import 'v-infinite-scroll/dist/v-infinite-scroll.css';
import Dropzone from './components/Dropzone.vue'
import VueAuthenticate from 'vue-authenticate'

Vue.use(InfiniteScroll);
Vue.use(VueRouter);
// Vue.use(axios);
Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {
    baseUrl: 'http://lara-vue-auth.test', // Your API domain

    providers: {
        google: {
            clientId: '519675463204-7bc7lvaqti1teo41im6e5he5lbjjvthk.apps.googleusercontent.com',
            redirectUri: 'http://localhost:8000/' // Your client app URL
        }
    }
});

//vue-toaster
import Toaster from 'v-toaster';
import 'v-toaster/dist/v-toaster.css';

Vue.use(Toaster, {timeout: 2000});

const router = new VueRouter({
    mode: 'history',
    routes: [
    {
        path: '/',
        name: 'home',
        component: Home
    },

    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            auth: false
        }
    },

    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            auth: false
        }
    },

    {
        path: '/dropzone',
        name: 'dropzone',
        component: Dropzone,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    }]
});

router.beforeEach((to, from, next) => {

    // check if the route requires authentication and user is not logged in
    if (to.matched.some(route => route.meta.requiresAuth) && !store.state.isLoggedIn) {
        // redirect to login page
        next({ name: 'login' })
        return
    }

    // if logged in redirect to dashboard
    if(to.path === '/login' && store.state.isLoggedIn) {
        next({ name: 'dashboard' })
        return
    }

    next()
});
Vue.router = router
// Vue.use(require('@websanova/vue-auth'), {
//     auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
//     http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
//     router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
// });
App.router = Vue.router
// new Vue(App).$mount('#app');
new Vue({
    store,
    el: '#app',
    render: h => h(App)
});