<template>
    <!--header-->
  <header>
    <div class="header-login">
      <img alt="Logo de Groupomania" class="logo" src="@/assets/images/logos/logo-black.png" />
    </div>
  </header>
<!--header_end-->
    <body class="sign-up">
        <div class="sign-up_formular">
            <form action="/action_page.php">
                <div class="sign-up_choice-title">
                    <h1>SIGN UP</h1>
                    <h1 class="inactive">LOGIN</h1>
                </div>
                <div class="sign-up_formcontainer">
                    <div class="sign-up_container">
                        <label for="uname"><strong>Username</strong></label>
                        <input type="text" placeholder="Enter Username" name="uname" required>
                        <label for="mail"><strong>E-mail</strong></label>
                        <input type="text" placeholder="Enter E-mail" name="mail" required>
                        <label for="psw"><strong>Password</strong></label>
                        <input type="password" placeholder="Enter Password" name="psw" required>
                    </div>
                    <button type="submit"><strong>SIGN UP</strong></button>
                    <div class="sign-up_container-remember-me" style="background-color: #eee">
                        <label style="padding-left: 15px">
                        <input type="checkbox"  check="checked" name="remember"> Remember me
                        </label>
                        <span class="psw"><a href="#">Forgot password?</a></span>
                    </div>
                </div>
            </form>
        </div>
  </body>

  <body class="login">
    <div class="login_formular">
        <form action="/action_page.php">
            <div class="login_choice-title">
                <h1 class="inactive">SIGN UP</h1>
                <h1>LOGIN</h1>
            </div>
        <div class="login_formcontainer">
        <hr/>
        <div class="login_container">
            <label for="uname"><strong>Username</strong></label>
            <input type="text" placeholder="Enter Username" name="uname" required>
            <label for="psw"><strong>Password</strong></label>
            <input type="password" placeholder="Enter Password" name="psw" required>
        </div>
        <button type="submit">LOGIN</button>
        <div class="login_container-remember-me" style="background-color: #eee">
            <label style="padding-left: 15px">
            <input type="checkbox"  check="checked" name="remember"> Remember me
            </label>
            <span class="psw"><a href="#"> Forgot password?</a></span>
        </div>
        </div>
        </form>
    </div>
  </body>
</template>