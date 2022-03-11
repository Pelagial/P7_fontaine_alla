<template>
<div class="publications_wrapper">
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
              alt="media partager par l'utilisateur {{ user.pseudo }}"
              @dblclick="like()"
            />
          </div>
          <!--publication_media_end-->
          <!--publication_text-->
          <div class="publication-card_infos">
            <div class="publication-card_under-media-bar">
              <div class="publication-card_datetime">
                <p><strong>Publié le {{ moment(post.createdAt).format('DD-MM-YYYY à HH:mm')}}</strong></p>
                <p v-if="post.likes > 2">likes</p>
                <p v-else >O like</p> 
              </div>
              <div class="publication-card_btn">
                <fa v-if="mode === 'publicationLike'" class="publication-card_like-btn" icon="heart" @click.prevent="unLike" />
                <fa v-else="mode === 'publicationNotLike'" class="liked publication-card_like-btn" :icon="['far', 'heart']" @click.self="like()"/>
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
</template>

<script>
import moment from 'moment'
import PostService from "../services/PostService";

export default {
  name: "postsCards",
  props: {
    post: {
      type: Object,
    },
  },
  data: function() {
    return {
      user: false,
      messageRetour: null,
      errorMessage: null,
    };
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
    deletePost() {
      this.$emit("deletePost", this.post.id);
    },
    getOnePost(id) {
      this.$router.push(`posts/${id}`);
    }
  },
};
</script>
