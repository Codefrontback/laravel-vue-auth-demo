<template>
    <div>
        <nav>
            <div class="container">
                <div class="nav-wrapper">
                    <ul id="nav-mobile" class="left hide-on-med-and-down">
                        <li>
                            <router-link :to="{ name: 'home' }">Home</router-link>
                        </li>
                    </ul>
                    <ul id="nav-mobile2" class="right">
                        <li v-if="!this.$store.state.isLoggedIn">
                            <router-link :to="{ name: 'login' }">Login</router-link>
                        </li>

                        <li v-if="!this.$store.state.isLoggedIn">
                            <router-link :to="{ name: 'register' }">Register</router-link>
                        </li>
                        <li v-if="this.$store.state.isLoggedIn">
                            <a href="#" class="" @click="logout()">Logout</a>
                        </li>
                        <li>
                            <a href="https://www.google.com" target="_blank" class="github"><i class="fa fa-github"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <footer class="page-footer">
            <div class="footer-copyright">
                <div class="container">
                    <span>&copy; 2020</span>  <a href="https://artixun.com" target="_blank" style="color:white;text-decoration:none">Artixun Softwares.</a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>

    export default {

        methods: {

            logout() {

                this.axios.get('api/auth/logout?token=' + this.$store.state.token).then(response => {
                    if(response.data.success == true)
                    {
                        // login user, store the token and redirect to dashboard
                        this.$store.commit('LogoutUser')
                        this.$router.push({name: 'login'})
                    }
                }).catch(error => {
                    //
                });
            }
        }
    }

</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.2s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }

    .container{
        padding:0px;
        width:88%;
    }
    #nav-mobile a:hover{
        text-decoration: none !important;
        color:white;
    }
    #nav-mobile a:focus{
        text-decoration: none !important;
        color:white;
        background-color:rgba(0,0,0,0.1);
    }

    #nav-mobile2 a:hover{
        text-decoration: none !important;
        color:white;
    }
    #nav-mobile2 a:focus{
        text-decoration: none !important;
        color:white;
        background-color:rgba(0,0,0,0.1);
    }

    .page-footer{
        padding-top:0px;
        position:fixed;
        bottom:0;
        width:100%;
        z-index: 999;
    }
    .github
    {
        font-size:25px;
    }

    .github:hover{
        color:white;
    }

    .github:focus{
        color:white;
    }

</style>