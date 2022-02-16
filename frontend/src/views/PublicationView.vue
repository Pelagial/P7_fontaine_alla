<template>
  <div class="profile">
    <header class="profile_header">
      <RouterLink to="/">
        <fa class="profile_header-home" icon="arrow-left" />
      </RouterLink>
                <!--user_profil_info-->
          <RouterLink to="/profile">
            <div class="publication-card_user-profile">
              <h1 class="publication-card_user-name">Tom Ramalho</h1>
              <div class="publication-card_user-img">
                <img
                  src="../assets/images/profile_picture/default/tom-ramalho-NZaFD7tKhC8-unsplash.jpg"
                  alt="Photo de profil de tom-ramalho"
                />
              </div>
            </div>
          </RouterLink>
          <!--user_profil_info_end-->
      
    </header>
  </div>  
</template>