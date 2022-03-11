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
        <RouterLink to="/home">
        <fa class="nav-bar-header_home" icon="house" />
      </RouterLink>
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
    <RouterLink to="/home">
      <fa class="nav-bar_home" icon="house" />
    </RouterLink>
    <RouterLink to="/post">
      <fa class="nav-bar_add-post" icon="circle-plus" />
    </RouterLink>
    <RouterLink to="/account">
      <div class="nav-bar_user-profile">
        <img v-if="user.photo != null" class="user_img" :src="user.photo" alt="Photo de profil de {{ user.pseudo }}" />
        <fa v-else class="default_userIcon" icon="circle-user"></fa>
      </div>
    </RouterLink>
  </nav>
<!--nav_bar_end-->

<!--publication-->
  <main v-if="post != null">
      <postsCards
      v-for="post of posts"
      :key="post.id"
      :post="post"
      :id="post.id"
      @deletePost="deletePost(post.id)"
      />
  </main> 
<!--publication_end-->
  <main v-else >
    <h2>Bienvenue sur le Social Network de Groupomania<br>
    commencer à partager du contenu</h2>
  </main>

  <RouterView />
</template>


<script>
import moment from 'moment'
import postsCards from '../components/postscard.vue'

export default {
  name: 'home',
  components: {
    postsCards,
  },
  data: function (){
        return{
            mode:'home',
        }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    posts() {
      return this.$store.getters.posts;
    },
  },
  beforeMount() {
    this.$store.dispatch("getUserById");
    this.$store.dispatch("getPosts");
  },
  methods: {
    async reloadFeed() {
      try {
        const response = await PostService.getPosts();
        console.log(response.data);
        this.posts = response.data;
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },
    moment: function (date) {
      return moment(date);
    },
  },
}
</script>
