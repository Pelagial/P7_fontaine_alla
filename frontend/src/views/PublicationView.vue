<template>
  <!--Publication_header-->
  <header class="publication-header">
    <RouterLink to="/home">
      <fa class="publication-home" icon="arrow-left" />
    </RouterLink>
    <div class="publication-header_user-profile">
              <h1 class="publication-header_user-name">{{ user.username }}</h1>
              <div class="publication-header_user-img">
                <img v-if="user.picture" class="user_img" :src="user.picture" alt="Photo de profil de l'utilisateur" />
                <fa v-else="user.picture === null" class="default_userIcon" icon="circle-user"></fa>
              </div>
            </div>
  </header>
  <!--Publication_header_end-->

  <!--Publication_formular-->
  <div class="publication_formular">
    <form class="publication" enctype="multipart/form-data">
      <div class="publication_content">
        <div class="publication_content-media-upload">
          <label for="attachement">
            <strong>Choisi un media à partager</strong>
          </label>
          <img class="media_upload_preview" src="" />
          <input
            @change.prevent="uploadImage()"
            class="publication_content-media"
            type="file"
            accept="image/png, image/jpeg,
            image/bmp, image/gif"
            ref="attachement"
            name="attachement"
          />
        </div>
        <div class="publication_content-text-content">
          <label for="title">
            <strong>Titre</strong>
          </label>
          <input v-model="title" type="text" placeholder="Entrer votre titre" name="title">
          <label for="message">
            <strong>Commentaire</strong>
          </label>
          <textarea
            v-model="message"
            class="publication_content-text"
            type="text"
            rows="3"
            placeholder="Entrer votre commentaire"
            name="message"
          />
        </div>
        <span v-if="status == 'error_posting'">
                    Titre ou message trop cours<br>
                    (Le titre doit avoir minimum 3 caractères<br>
                    et le message doit en contenir minimum 5.)
        </span>
      </div>
      <button @click.prevent="createPost()" type="submit" :class="{ 'button--disabled' : !validatedFields }" :disabled="!validatedFields">partager</button>
    </form>
  </div>
  <!--Publication_formular_end-->
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'publication',
  data: function (){
        return{
            mode:'publication',
            attachement:'',
            title:'',
            message:''
        }
  },
  mounted: function () {
    if (this.$store.state.user.userId == -1) {
      this.$router.push('/');
      return;
    };
    this.$store.dispatch('getUserInfos');
  },
  computed: {
    validatedFields(){
            if (this.mode =='publication') {
                if(this.title != "" && this.message != "") {
                    return true;
                } else {
                    return false;
                }
            }
    },
    ...mapState({
      status: 'status',
      user: 'userInfos'
    })
  },
  methods: {
    uploadImage() {
            const preview = document.querySelector('.media_upload_preview');
            const reader = new FileReader();
            const attachementUrl = reader.readAsDataURL(this.$refs.attachement.files[0]);
            reader.addEventListener("load", function () {
                // on convertit l'image en une chaîne de caractères base64
                preview.src = reader.result;
            }, false);
    },
    createPost(){
            const attachement = this.$refs.attachement.files[0];
            this.$store.dispatch('createPost', {
              message: this.message,
              title: this.title,
              attachement: attachement
            }),
            this.$router.push('home');
    },
  }
}
</script>

          