<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand">
                    DASHBOARD
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">

                    </ul>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item menu-nav" v-if="!loggedIn">
                            <router-link class="nav-link" to="/login">login</router-link>
                        </li>
                        <li class="nav-item menu-nav" v-if="!loggedIn">
                            <router-link class="nav-link" to="/register">register</router-link>
                        </li>
                        <li class="nav-item menu-nav" v-if="loggedIn">
                            <a class="nav-link" @click="logout">logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <router-view></router-view>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
    created(){
        if( this.loggedIn ){
            this.$store.dispatch('auth/GET_USER')
            .then(response => {
            })
            .catch(error => {
                this.$router.push({ name:'login' })
            })
        }
    },
    computed:{
        loggedIn(){
            return this.$store.getters["auth/loggedIn"]
        }
    },
    methods:{
        logout: function(event){
            event.preventDefault();

            this.$store.dispatch('auth/LOGOUT',{
                email: this.email,
                password: this.pass
            })
            .then(response => {
                this.$router.push({ name:'login' })
            })
        }
    }
}
</script>
<style>
.menu-nav{
    cursor: pointer;
}
</style>
