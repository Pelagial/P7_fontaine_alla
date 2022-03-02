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
      <RouterLink to="/Publication">
        <fa class="nav-bar-header_add-post" icon="circle-plus" />
      </RouterLink>
      <RouterLink to="/profile">
        <div class="nav-bar-header_user-profile">
          <img
            class="user_img"
            :src="user.picture" alt="Photo de profil de l'utilisateur"
          />
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
    <RouterLink to="/Publication">
      <fa class="nav-bar_add-post" icon="circle-plus" />
    </RouterLink>
    <RouterLink to="/profile">
      <div class="nav-bar_user-profile">
        <img
            class="user_img"
            :src="user.picture" alt="Photo de profil de l'utilisateur"
        />
      </div>
    </RouterLink>
  </nav>
<!--nav_bar_end-->

<!--publication-->
  <main>
    <div class="publications_wrapper">
      <!--Publication_card-->
      <div class="publication-card" v-for="publication of publications" :key="publication.id" :id="publication.id">

          <!--user_profil_info-->
          <RouterLink to="/profile">
            <div class="publication-card_user-profile">
              <h2 class="publication-card_user-name">{{ publication.User.username }}</h2>
              <div class="publication-card_user-img">
                <img
                  :src="publication.User.picture" alt="Photo de profil de l'utilisateur"
                />
              </div>
            </div>
          </RouterLink>
          <!--user_profil_info_end-->

          <!--publication_media-->
          <div class="publication-card_media-upload">
            <img
              class="publication_media"
              src="../assets/images/fabio-alves-IQCwKOpIQro-unsplash.jpg"
              alt="Photo de plusieur personnes qui boivent un verre"
            />
          </div>
          <!--publication_media_end-->
          <!--publication_text-->
          <div class="publication-card_infos">
            <div class="publication-card_under-media-bar">
              <div class="publication-card_datetime">
                <p><strong>Publié le {{ publication.createdAt }}</strong></p>
              </div>
              <div class="publication-card_btn">
                <fa class="publication-card_delete-btn" icon="trash-can" @click.prevent="getPublicationId" />
                <!-- <fa class="liked publication-card_like-btn" icon="heart" /> -->
                <fa class="publication-card_like-btn" :icon="['far', 'heart']"  />
              </div>
            </div>
            <div class="publication-card_text">
              <h2>
                {{ publication.title }}
              </h2>
              <p>
                {{ publication.message }}
              </p>
            </div>
            <div class="comment"></div>
          </div>
          <!--publication_text_end-->
      </div>
      <!--Publication_card_END-->
    </div>
  </main>
<!--publication_end-->


  <RouterView />
</template>


<script>
import { mapState } from 'vuex'

export default {
  name: 'home',
  beforeMount(){
      if (this.$store.state.user.userId == -1) {
      this.$router.push('/');
      return;
      };
  },
  mounted: function () {
    this.$store.dispatch('getUserInfos');
    this.$store.dispatch('getAllPublication');
  },
  computed: {
    ...mapState({
      user: 'userInfos',
      publications: 'publications'
    })
  },
  methods: {
    getPublicationId() {
      console.log(publication.id);
    },
  }
}
</script>
