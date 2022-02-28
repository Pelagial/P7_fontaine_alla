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
            <form action="/action_page.php">
                <div class="sign-up_choice-title">
                    <h1>SIGN UP</h1>
                    <h1 class="inactive" @click="switchToLogin()">LOGIN</h1>
                </div>
                <div class="sign-up_formcontainer">
                    <div class="sign-up_container">
                        <label for="username"><strong>Username</strong></label>
                        <input v-model="username" type="text" placeholder="Enter Username" name="username" required>
                        <label for="email"><strong>E-mail</strong></label>
                        <input v-model="email" type="email" placeholder="Enter E-mail" name="email" required>
                        <label for="password"><strong>Password</strong></label>
                        <input v-model="password" type="password" placeholder="Enter Password" name="password" required>
                        <span class="form-row" v-if="status == 'error_create'">
                                Erreur <br>
                                merci d'utiliser un mail valide (exemple@nom.com)<br>
                                un username compris entre 5 et 12 caractères<br>
                                et un mot de passe compris entre 4 et 12 caractères<br>
                                et contenant au moins un chiffre.
                        </span>
                    </div>
                    <button @click.prevent="createAccount()" :class="{'button--disabled' : !validatedFields }" :disabled="!validatedFields"><strong>
                        <p v-if="status == 'loading'">Création en cours...</p>
                        <p v-else>SIGN UP</p>
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
            <form action="/action_page.php">
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
                <span class="form-row" v-if="status == 'error_login'">
                    Adresse mail et/ou mot de passe invalide
                </span>
            </div>
            <button @click.prevent="login()" type="submit" :class="{ 'button--disabled' : !validatedFields }" :disabled="!validatedFields"><strong>
                <p v-if="status == 'loading'">Connexion en cours...</p>
                <p v-else>LOGIN</p>
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

export default {
    name: 'signup',
    data: function (){
        return{
            mode:'signup',
            username:'',
            email:'',
            password:'',
        }
    },
    mounted: function(){
    if(this.$store.state.user.userId != -1){
      this.$router.push('/home');
      return;
    }
    },
    computed: {
        validatedFields(){
            if (this.mode =='signup') {
                if(this.username != "" && this.email != "" && this.password != "") {
                    return true;
                } else {
                    return false;
                }
            } else {
                if(this.email != "" && this.password != "") {
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
        login(){
            const self = this;
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            }).then(function(){
                self.$router.push('home');
            }, function (error){
                console.log(error);
            })
        }, 
        createAccount(){
            const self = this;
            this.$store.dispatch('createAccount', {
                username: this.username,
                email: this.email,
                password: this.password
            })
            .then(function(){
                self.login();
            }, function (error){
                console.log(error);
            })
        },
    }
}
</script>