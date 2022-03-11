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
  <main>
    <div class="publication-main_wrapper">
      <div v-if="posts != null" class="publications_wrapper" v-for='post of posts'>
      <!--Publication_card-->
      <div class="publication-card">

          <!--user_profil_info--> 
            <div class="publication-card_user-profile">
              <h2 class="publication-card_user-name">{{ post.User.pseudo }}</h2>
              <div class="publication-card_user-img">
                <img v-if="post.User.photo" :src="post.User.photo" alt="Photo de profil de l'utilisateur"/>
                <fa v-else="user.photo === null" class="default_userIcon" icon="circle-user"></fa>
              </div>
            </div>
          <!--user_profil_info_end-->

          <!--publication_media-->
          <div class="publication-card_media-upload">
            <img
              class="publication_media"
              :src="post.imageUrl"
              alt="image postée par l'utilisateur"
              @dblclick="like()"
            />
          </div>
          <!--publication_media_end-->
          <!--publication_text-->
          <div class="publication-card_infos">
            <div class="publication-card_under-media-bar">
              <div class="publication-card_datetime">
                <p><strong>Publié le {{ moment(post.createdAt).format('DD-MM-YYYY à HH:mm')}}</strong></p>
              </div>
              <div class="publication-card_btn">
                  <fa v-if="
                  $store.state.user.id === post.User.id ||
                  $store.state.user.admin === true"
                  class="publication-card_delete-btn"
                  icon="trash"
                  @click="deletePost(post.id)"/>
              </div>
            </div>
            <div class="publication-card_text">
              <h2>
                {{ post.title }}
              </h2>
              <p>
                {{ post.message }}
              </p>
            </div>
            <div class="comment"></div>
          </div>
          <!--publication_text_end-->
      </div>
      <!--Publication_card_END-->
    </div>
    <div v-else >
      <h2>Bienvenue sur le Social Network de Groupomania<br>
      commencer à partager du contenu</h2>
    </div>
   </div> 
  </main> 
<!--publication_end-->
  
  <RouterView />
</template>


<script>
import moment from 'moment'

export default {
  name: 'home',
  props: {
    post: {
      type: Object,
    },
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
    moment: function (date) {
      return moment(date);
    },
    async reloadFeed() {
      try {
        const response = await PostService.getPosts();
        console.log(response.data);
        this.posts = response.data;
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },
    getProfile(id) {
      this.$router.push(`/account/${id}`);
    },
    deletePost(id) {
      this.$store.dispatch("deletePost", id);
    },
    getOnePost(id) {
      this.$router.push(`posts/${id}`);
    }
  },
}
</script>
