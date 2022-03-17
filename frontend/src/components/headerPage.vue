<template>
<!--header-->
  <header>
    <div class="header_logo-groupomania">
      <img alt="Logo de Groupomania" class="logo" src="@/assets/images/logos/logo-black.png" />
    </div>
  </header>
<!--header_end-->

<!--nav_bar_header-->
  <nav class="nav-bar-header_wrapper">
      <div class="nav-bar-header_logo-groupomania">
        <img alt="Logo de Groupomania" class="logo" src="../assets/images/logos/logo-black.png" />
      </div>
      <div class="nav-bar-header_menu">
        <a href="#"><fa class="nav-bar-header_home" icon="house" @click="reloadFeed"/></a>
      <RouterLink to="/Post">
        <fa class="nav-bar-header_add-post" icon="circle-plus" />
      </RouterLink>
      <RouterLink to="/account">
        <div class="nav-bar-header_user-profile">
          <img v-if="user.photo" class="user_img" :src="user.photo" alt="Photo de profil de l'utilisateur" />
          <fa v-else="user.photo === null" class="default_userIcon" icon="circle-user"></fa>
        </div>
      </RouterLink>
      </div>
    </nav>
<!--nav_bar_header_end-->

<!--nav_bar_bottom-->
  <nav class="nav-bar_wrapper">
     <a href="#"><fa class="nav-bar_home" icon="house" @click="reloadFeed" /></a> 
    <RouterLink to="/post">
      <fa class="nav-bar_add-post" icon="circle-plus" />
    </RouterLink>
    <RouterLink to="/account">
      <div class="nav-bar_user-profile">
        <img v-if="user.photo != null" class="user_img" :src="user.photo" alt="Photo de profil de l'utilisateur" />
        <fa v-else class="default_userIcon" icon="circle-user"></fa>
      </div>
    </RouterLink>
  </nav>
<!--nav_bar_bottom_end-->

</template>
<script>
export default {
  name: 'headerPage',
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }, 
  },
  methods: {
    reloadFeed() {
        location.reload();
    }
  }
};
</script>