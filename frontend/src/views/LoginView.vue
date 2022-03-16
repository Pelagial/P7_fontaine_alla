<template>
<!--header-->
    <header>
        <div class="header-login">
        <img alt="Logo de Groupomania" class="logo" src="@/assets/images/logos/logo-black.png" />
        </div>
    </header>
<!--header_end-->

    <body class="sign-up" v-if="mode == 'signup'">
        <div class="sign-up_formular">
            <form>
                <div class="sign-up_choice-title">
                    <h1>SIGN UP</h1>
                    <h1 class="inactive" @click="switchToLogin()">LOGIN</h1>
                </div>
                <div class="sign-up_formcontainer">
                    <div class="sign-up_container">
                        <label for="pseudo"><strong>Pseudo</strong></label>
                        <input v-model="pseudo" type="text" placeholder="Enter Pseudo" name="pseudo" required>
                        <label for="email"><strong>E-mail</strong></label>
                        <input v-model="email" type="email" placeholder="Enter E-mail" name="email" required>
                        <label for="password"><strong>Password</strong></label>
                        <input v-model="password" type="password" placeholder="Enter Password" name="password" required>
                        <span class="alert_message" v-html="errorMessage" />
                        <span class="alert-message" v-html="message" />
                    </div>
                    <button @click.prevent="signup" :class="{'button--disabled' : !validatedFields }" :disabled="!validatedFields"><strong>
                        <p>SIGN UP</p>
                    </strong></button>
                    <div class="sign-up_container-remember-me" style="background-color: #eee">
                        <div class="rememberAndCheckbox">
                            <input type="checkbox"  check="checked" name="remember">
                            <label>Remember me</label>
                        </div>
                        <span class="psw"><a href="#">Forgot password?</a></span>
                    </div>
                </div>
            </form>
        </div>
    </body>

    <body class="login" v-else>
        <div class="login_formular">
            <form>
                <div class="login_choice-title">
                    <h1 class="inactive" @click="switchToSignUp()">SIGN UP</h1>
                    <h1>LOGIN</h1>
                </div>
            <div class="login_formcontainer">
            <hr/>
            <div class="login_container">
                <label for="email"><strong>E-mail</strong></label>
                <input v-model="email" type="email" placeholder="Enter Your E-mail" name="email" required>
                <label for="password"><strong>Password</strong></label>
                <input v-model="password" type="password" placeholder="Enter Password" name="password" required>
                <span class="alert_message" v-html="errorMessage" />
                <span class="alert_message" v-html="message" />
            </div>
            <button @click.prevent="login()" type="submit" :class="{ 'button--disabled' : !validatedFields }" :disabled="!validatedFields"><strong>
                <p>LOGIN</p>
            </strong></button>
            <div class="sign-up_container-remember-me" style="background-color: #eee">
                <div class="rememberAndCheckbox">
                    <input type="checkbox"  check="checked" name="remember">
                    <label>Remember me</label>
                </div>
                <span class="psw"><a href="#">Forgot password?</a></span>
            </div>
            </div>
            </form>
        </div>
    </body>
</template>

<script>
import { mapState } from 'vuex'
import Auth from '../services/Auth';

export default {
    name: 'signup',
    data() {
        return {
            mode:'signup',
            pseudo: '',
            email: '',
            password: '',
            errorMessage: null,
            message: null,
        };
    },
    computed: {
        validatedFields(){
            if (this.mode =='signup') {
                if(this.pseudo != '' && this.email != '' && this.password != '' ) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if(this.email != '' && this.password != '' ) {
                        return true;
                    } else {
                        return false;
                    }
            }
        },
        ...mapState(['status'])
    },
    methods:{
        switchToSignUp(){
            this.mode ='signup';
        },
        switchToLogin(){
            this.mode ='login';
        },
        async login() {
            try {
                const response = await Auth.login({
                email: this.email,
                password: this.password,
                });
                this.message = response.data.message;
        
                this.$store.dispatch('setToken', response.data.token);
                this.$store.dispatch('setUser', response.data.user);
                this.$store.dispatch('getUserById', response.data.user.id);
                let router = this.$router;
                setTimeout(function() {
                router.push('/home');
                }, 1500);
            } catch (error) {
                this.errorMessage = error.response.data.error;
                setTimeout(() => {
                this.email= '';
                this.password= '';
                this.errorMessage = '';
                }, 5000);
            }
        },
        async signup() {
            try {
                const response = await Auth.signup({
                pseudo: this.pseudo,
                email: this.email,
                password: this.password,
                });
                this.message = response.data.message;
                this.$store.dispatch('setToken', response.data.token);
                this.$store.dispatch('setUser', response.data.user);
                this.$store.dispatch('getUserById', response.data.user.id);

                let router = this.$router;
                setTimeout(function() {
                router.push('/home');
                }, 1500);
            } catch (error) {
                this.errorMessage = error.response.data.error;
                setTimeout(() => {
                this.errorMessage = '';
                }, 5000);
            }
        },
  },
}
</script>