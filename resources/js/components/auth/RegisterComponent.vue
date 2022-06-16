<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Registro</div>

                    <div class="card-body">
                        <form>
                            <div class="form-group row">
                                <label for="name" class="col-md-4 col-form-label text-md-right">Nombre</label>
                                <div class="col-md-6">
                                    <input id="name" type="text" :class="'form-control '+(this.errors.name?'is-invalid':'')" name="name" v-model="name" required autocomplete="name" autofocus>
                                    <div v-if="this.errors.name" class="invalid-feedback">
                                        <strong>{{ errors.name[0] }}</strong>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">Correo</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" :class="'form-control '+(this.errors.email?'is-invalid':'')" name="email" v-model="email" required autocomplete="email">
                                    <div v-if="this.errors.email" class="invalid-feedback">
                                        <strong>{{ errors.email[0] }}</strong>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Contraseña</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" :class="'form-control '+(this.errors.password?'is-invalid':'')" name="password" v-model="password" required autocomplete="new-password">
                                    <div v-if="this.errors.password" class="invalid-feedback">
                                        <strong>{{ errors.password[0] }}</strong>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirmar contraseña</label>
                                <div class="col-md-6">
                                    <input id="password-confirm" type="password" class="form-control" name="password_confirmation" v-model="password_confirmation" required autocomplete="new-password">
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary" @click="register">
                                        Registrar
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
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                errors:{}
            }
        },
        props:{

        },
        created(){

        },
        mounted(){

        },
        methods:{
            register: function(event){
                event.preventDefault();

                this.$store.dispatch('auth/REGISTER',{
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation
                })
                .then(response => {
                    this.name = '',
                    this.email = '',
                    this.password = '',
                    this.password_confirmation =  ''

                    this.$store.commit("alert/show", {
                        icon: "success",
                        text: response.data.message,
                    });
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
