<template>
  <!--Post_header-->
  <header class="post-header">
    <RouterLink to="/home">
      <fa class="post-home" icon="arrow-left" />
    </RouterLink>
    <div class="post-header_user-profile">
              <h1 class="post-header_user-name">{{ user.pseudo }}</h1>
              <div class="post-header_user-img">
                <img v-if="user.photo" class="user_img" :src="user.photo" alt="Photo de profil de l'utilisateur" />
                <fa v-else="user.photo === null" class="default_userIcon" icon="circle-user"></fa>
              </div>
            </div>
  </header>
  <!--Post_header_end-->

  <!--Post_formular-->
  <div class="post_formular">
    <form class="post">
      <div class="post_content">
        <div class="post_content-media-upload">
          <label for="imageUrl">
            <strong>Choisi un media à partager</strong>
          </label>
          <img class="media_upload_preview" src="" />
          <input
            @change.prevent="uploadImage"
            class="post_content-media"
            type="file"
            accept="image/png, image/jpeg,
            image/bmp, image/gif"
            ref="file"
            name="file"
          />
        </div>
        <div class="post_content-text-content">
          <label for="title">
            <strong>Titre</strong>
          </label>
          <input v-model="title" type="text" placeholder="Entrer votre titre" name="title">
          <label for="message">
            <strong>Commentaire</strong>
          </label>
          <textarea
            v-model="message"
            class="post_content-text"
            type="text"
            rows="3"
            placeholder="Entrer votre commentaire"
            name="message"
          />
        </div>
        <div class="danger-alert" v-html="errorMessage" />
        <div class="danger-alert" v-html="messageRetour" />
      </div>
      <button @click="onSubmit" type="submit" :class="{ 'button--disabled' : !validatedFields }" :disabled="!validatedFields">partager</button>
    </form>
  </div>
  <!--Post_formular_end-->
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'post',
  data: function (){
        return{
            mode:'post',
            file: '',
            title:'',
            message:''
        }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    validatedFields(){
      if(this.title != '' && this.file != '' && this.message != '' ) {
          return true;
      } else {
          return false;
      }
    },
    messageRetour() {
      return this.$store.getters.message;
    },
    errorMessage() {
      return this.$store.getters.error;
    },
  },
  beforeMount() {
    this.$store.dispatch("getUserById");
  },
  methods: {
    uploadImage() {
        const preview = document.querySelector('.media_upload_preview');
        const reader = new FileReader();
        const file = this.$refs.file.files[0];
        reader.readAsDataURL(file);
        reader.addEventListener('load', function () {
        // we convert image in string base64
          preview.src = reader.result;
        }, false);
        this.file = file;
        console.log(this.file);
    },
    onSubmit() {
      const formData = new FormData();
      formData.append('message', this.message);
      if (this.title !== null) {
        formData.append('title', this.title);
      }
      if (this.file !== null) {
        formData.append('image', this.file);
      }
      this.$store.dispatch("createPost", formData);
      this.$router.push('/home');
    },
  }
}
</script>

          