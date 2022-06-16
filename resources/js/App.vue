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
                        <li class="nav-item" v-if="!loggedIn">
                            <router-link class="nav-link" to="/login">login</router-link>
                        </li>
                        <li class="nav-item" v-if="!loggedIn">
                            <router-link class="nav-link" to="/login">register</router-link>
                        </li>
                        <li class="nav-item" v-if="loggedIn">
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
import { mapState } from "vuex";
export default {
    created(){
        if( this.loggedIn ){
            this.$router.push({ name:'dashboard' })
        }
    },
    computed:{
        ...mapState({
            loggedIn: (state) => state.auth.token !== null,
        })
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
