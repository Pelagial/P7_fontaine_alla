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
                    </div>
                    <button @click.prevent="createAccount()" :class="{'button--disabled' : !validatedFields }"><strong>SIGN UP</strong></button>
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
            </div>
            <button @click.prevent="login()" type="submit" :class="{ 'button--disabled' : !validatedFields }"><RouterLink to="/home">LOGIN</RouterLink></button>
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
        }  
    },
    methods:{
        switchToSignUp(){
            this.mode ='signup';
        },
        switchToLogin(){
            this.mode ='login';
        },
        login(){
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            }).then(function(response){
            console.log(response);
            }, function (error){
                console.log(error);
            })
        }, 
        createAccount(){
            this.$store.dispatch('createAccount', {
                username: this.username,
                email: this.email,
                password: this.password
            }).then(function(response){
            console.log(response);
            }, function (error){
                console.log(error);
            })
        },
        validUsername(){
            if (/^[a-z\d]+$/i.test(this.username) != true){
                console.log('username invalid');
            } else {
                console.log('username valid');
            }
        },
        validEmail(){
            if (/^[a-zA-Z]{5,30}@[a-z\._-]{5,20}$/.test(this.username) != true){
                console.log('email invalid');
            } else {
                console.log('email valid');
            }
        },
        validPassword(){
            if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 3}$/.test(this.password) != true){
                console.log('password invalid');
            } else {
                console.log('password valid');
            }
        }
    }
}
</script>