<template>
    <div class="row" style="margin:2% auto; width:420px;margin-bottom:30px;">
        <div class="container col s12">
            <div class="heading">
                <center><h5>Sign In</h5></center>
            </div>
            <div class="progress" v-if="isProgress">
                <div class="indeterminate"></div>
            </div>
            <div class="alert alert-danger" v-if="loginError && errors.message">
                <span>{{ errors.message[0] }}</span>
            </div>
            <div class="login-form">
                <div class="row">
                    <div class="input-field col s12">
                        <input id="email" type="text" class="validate" v-model="email">
                        <label for="email">Email</label>
                        <span class="text text-danger" v-if="loginError && errors.email">{{ errors.email[0] }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="password" type="password" class="validate" v-model="password">
                        <label for="password">Password</label>
                        <span class="text text-danger" v-if="loginError && errors.password">{{ errors.password[0] }}</span>
                    </div>
                </div>
                <button class="btn btn-block waves-effect waves-light submit" type="button" name="action" @click="login()">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
    // import GSignInButton from 'vue-google-signin-button'
    // Vue.use(GSignInButton)
    import store from '../store'
    export default {
        data() {
            return {
                email: '',
                password: '',
                loginError: false,
                errors: {},
                isProgress: false,
                googleSignInParams: {
                    client_id: '519675463204-7bc7lvaqti1teo41im6e5he5lbjjvthk.apps.googleusercontent.com'
                }
            }
        },
        methods: {
            login() {
                this.loginError = false;
                this.axios.post('api/auth/login', {
                    email: this.email,
                    password: this.password
                }).then(response => {
                    this.isProgress = true;
                    if(response.data.success == true)
                    {
                        setTimeout(() => {
                            this.isProgress = false;
                            store.commit('LoginUser', response.data);
                            this.$router.push({name: 'dashboard'})
                        },2000);
                    }
                    else{

                        this.isProgress = true;
                        setTimeout(() => {
                            this.isProgress = false;
                            this.loginError = true;
                            this.errors = response.data.errors
                        },1000);
                    }
                }).catch(error => {
                    this.isProgress = false;
                    this.loginError = true;
                    this.errors = error.response.data.errors
                });
            },
        }
    }
</script>

<style scoped>
    .form-wrapper {
        min-height: 100%;
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
    .form-signin {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
    }
    .form-signin .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
    }
    .form-signin .form-control:focus {
        z-index: 2;
    }
    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    .google{

        color:red;
        font-size:30px;
    }

    .heading{
        color: white;
        background: #ED9E9E;
        padding: 30px;
        border: none;
    }
    .login-form{
        background: white;
        padding: 30px;
    }
    .submit:hover{
        color:white;
    }
    .btn{
        background-color: #ED9E9E!important;
    }
    .btn:focus{
        color:white;
    }
    .progress{
        margin:0px;
        background-color: transparent;
    }
    .alert{
        margin-bottom:0px;
    }
    .g-signin-btn{
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #3c82f7;
        color: #fff;
        box-shadow: 0 3px 0 #0f69ff;
    }
</style>