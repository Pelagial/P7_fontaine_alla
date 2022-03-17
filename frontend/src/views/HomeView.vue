<template>
<!--header-->
   <headerPage/>
<!--header_end-->

<!--post-->
  <main>
<!--if_there_is_post-->
    <div v-if="posts != []" class="post-main_wrapper">
      <div  class="posts_wrapper" v-for='post of posts'>
      <!--Publication_card-->
      <div class="post-card">

          <!--user_profil_info--> 
            <div class="post-card_user-profile">
              <h2 class="post-card_user-name">{{ post.User.pseudo }}</h2>
              <div class="post-card_user-img">
                <img v-if="post.User.photo" :src="post.User.photo" alt="Photo de profil de l'utilisateur"/>
                <fa v-else="post.User.photo === null" class="default_userIcon" icon="circle-user"></fa>
              </div>
            </div>
          <!--user_profil_info_end-->

          <!--post_media-->
          <div class="post-card_media-upload">
            <img
              class="post_media"
              :src="post.imageUrl"
              alt="image postée par l'utilisateur"
              @dblclick="like()"
            />
          </div>
          <!--post_media_end-->
          <!--post_text-->
          <div class="post-card_infos">
            <div class="post-card_under-media-bar">
              <div class="post-card_datetime">
                <p><strong>Publié le {{ moment(post.createdAt).format('DD-MM-YYYY à HH:mm')}}</strong></p>
              </div>
              <div class="post-card_btn">
                  <fa v-if="
                  $store.state.user.id === post.User.id ||
                  $store.state.user.admin === true"
                  class="post-card_delete-btn"
                  icon="trash"
                  @click.prevent="deletePost(post.id)"/>
              </div>
            </div>
            <div class="post-card_text">
              <h2>
                {{ post.title }}
              </h2>
              <p>
                {{ post.message }}
              </p>
            </div>
            <div class="comment"></div>
          </div>
          <!--post_text_end-->
      </div>
      <!--post_card_END-->
    </div>
   </div> 
<!--if_there_is_post_end-->
<!--if_there_is_no_post-->
    <div v-else>
      <h2>Bienvenue sur le Social Network de Groupomania<br>
      commencer à partager du contenu</h2>
    </div>
<!--if_there_is_no_post_end-->

  </main> 
<!--post_end-->
  
  <RouterView />
</template>


<script>
import headerPage from '../components/headerPage.vue'
import moment from 'moment'

export default {
  name: 'home',
  data: function (){
        return{
            mode:'home',
        }
  },
  components: {
        headerPage
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
  },
  beforeMount() {
    this.$store.dispatch("getPosts");
  },
  methods: {
    moment: function (date) {
      return moment(date);
    },
    deletePost(id) {
      this.$store.dispatch("deletePost", id)
      .then(location.reload())
    }
  },
}
</script>
