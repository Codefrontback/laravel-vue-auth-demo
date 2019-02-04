<template>
    <!--<div>-->
        <!--<div class="alert alert-danger" v-if="error && !success">-->
            <!--<p>There was an error, unable to complete registration.</p>-->
        <!--</div>-->
        <!--<div class="alert alert-success" v-if="success">-->
            <!--<p>Registration completed. You can now <router-link :to="{name:'login'}">sign in.</router-link></p>-->
        <!--</div>-->
        <!--<form autocomplete="off" @submit.prevent="register" v-if="!success" method="post">-->
            <!--<div class="form-group" v-bind:class="{ 'has-error': error && errors.name }">-->
                <!--<label for="name">Name</label>-->
                <!--<input type="text" id="name" class="form-control" v-model="name">-->
                <!--<span class="help-block" v-if="error && errors.name">{{ errors.name }}</span>-->
            <!--</div>-->
            <!--<div class="form-group" v-bind:class="{ 'has-error': error && errors.email }">-->
                <!--<label for="email">E-mail</label>-->
                <!--<input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="email">-->
                <!--<span class="help-block" v-if="error && errors.email">{{ errors.email }}</span>-->
            <!--</div>-->
            <!--<div class="form-group" v-bind:class="{ 'has-error': error && errors.password }">-->
                <!--<label for="password">Password</label>-->
                <!--<input type="password" id="password" class="form-control" v-model="password">-->
                <!--<span class="help-block" v-if="error && errors.password">{{ errors.password }}</span>-->
            <!--</div>-->
            <!--<button type="submit" class="btn btn-default">Submit</button>-->
        <!--</form>-->
    <!--</div>-->
    <div class="row" style="margin:2% auto; width:420px; margin-bottom:90px;">
        <div class="container col s12">
            <div class="heading">
                <center><h5>Sign Up</h5></center>
            </div>
            <div class="progress" v-if="isProgress">
                <div class="indeterminate"></div>
            </div>
            <div class="login-form">
                <div class="row">
                    <div class="input-field col s12">
                        <input id="name" type="text" class="validate" v-model="name">
                        <label for="name">Name</label>
                        <span class="text text-danger" v-if="error && errors.name">{{ errors.name[0] }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="email" type="text" class="validate" v-model="email">
                        <label for="email">Email</label>
                        <span class="text text-danger" v-if="error && errors.email">{{ errors.email[0] }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="password" type="password" class="validate" v-model="password">
                        <label for="password">Password</label>
                        <span class="text text-danger" v-if="error && errors.password">{{ errors.password[0] }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="confirm_password" type="password" class="validate" v-model="confirmPassword">
                        <label for="confirm_password">Confirm Password</label>
                        <span class="text text-danger" v-if="error && errors.confirmPassword">{{ errors.confirmPassword[0] }}</span>
                    </div>
                </div>
                <button class="btn btn-block waves-effect waves-light submit" type="button" name="action" @click.prevent="register()">Register</button>
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
                confirmPassword:'',
                error: false,
                errors: {},
                success: false,
                isProgress: false
            };
        },
        methods: {
            register(){
                this.axios.post('api/auth/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    confirmPassword: this.confirmPassword
                }).then(response => {
                    this.isProgress = true;
                    if(response.data.success == true)
                    {
                        setTimeout(() => {
                            this.isProgress = false;
                            this.$router.push({ name: 'login'})
                            this.$toaster.success('Sign up successfully...')
                        }, 2000)
                    }
                }).catch(error => {
                    this.isProgress = false;
                    this.error = true;
                    this.errors = error.response.data.errors
                });
            }
        }
    }
</script>

<style scoped>
    .submit:hover{
        color:white;
    }
    .btn{
        background-color: #ED9E9E!important;
    }
    .btn:focus{
        color:white;
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
    .progress{
        margin:0px;
        background-color: transparent;
    }
</style>