<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand">
                    NOSE
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        <!-- <div v-if="!loggedIn"> -->
                            <li class="nav-item" v-if="!loggedIn">
                                <router-link class="nav-link" to="/login">login</router-link>
                            </li>
                            <li class="nav-item" v-if="!loggedIn">
                                <router-link class="nav-link" to="/login">register</router-link>
                            </li>
                        <!-- </div> -->
                        <!-- <div v-else> -->
                            <li class="nav-item" v-if="loggedIn">
                                <!-- <router-link class="nav-link" to="/login">logout</router-link> -->
                                <a class="nav-link" @click="logout">logout</a>
                            </li>
                        <!-- </div> -->
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
    // data(){
    //     return {
    //         login: this.$store.auth.getters.loggedIn,
    //     }
    // },
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
