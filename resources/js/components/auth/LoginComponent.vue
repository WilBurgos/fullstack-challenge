<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Login</div>

                    <div class="card-body">
                        <form>

                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">Correo</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" :class="'form-control '+(this.errors.email?'is-invalid':'')" name="email" v-model="email" required autocomplete="email" autofocus>
                                    <div v-if="this.errors.email" class="invalid-feedback">
                                        <strong>{{ errors.email[0] }}</strong>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Contraseña</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" :class="'form-control '+(this.errors.password?'is-invalid':'')" name="password" v-model="pass" required autocomplete="current-password">
                                    <div v-if="this.errors.password" class="invalid-feedback">
                                        <strong>{{ errors.password[0] }}</strong>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-md-6 offset-md-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="remember" id="remember" v-model="remember">
                                        <label class="form-check-label" for="remember">
                                            Recordarme
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button class="btn btn-primary" @click="login">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                email: '',
                pass: '',
                remember: false,
                errors: {}
            }
        },
        props:{

        },
        created(){

        },
        mounted(){

        },
        methods:{
            login: function(event){
                event.preventDefault();

                this.$store.dispatch('auth/LOGIN',{
                    email: this.email,
                    password: this.pass,
                    remember: this.remember
                })
                .then(response => {
                    this.$router.push({ name:'dashboard' })
                }).catch(error => {
                    this.errors = error.response.data.errors
                    this.$store.commit("alert/show", {
                        icon: "error",
                        text: error.response.data.message,
                    });
                })
            }
        }
    }
</script>
<style>
.invalid-feedback{
    display: block;
}
</style>
