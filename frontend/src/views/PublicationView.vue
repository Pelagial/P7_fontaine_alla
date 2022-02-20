<template>
  <!--Publication_header-->
  <header class="publication-header">
    <RouterLink to="/home">
      <fa class="publication-home" icon="arrow-left" />
    </RouterLink>
    <div class="publication-header_user-profile">
              <h1 class="publication-header_user-name">Tom Ramalho</h1>
              <div class="publication-header_user-img">
                <img
                  src="../assets/images/profile_picture/default/tom-ramalho-NZaFD7tKhC8-unsplash.jpg"
                  alt="Photo de profil de tom-ramalho"
                />
              </div>
            </div>
  </header>
  <!--Publication_header_end-->

  <!--Publication_formular-->
  <div class="publication_formular">
    <form class="publication">
      <div class="publication_content">
        <div class="publication_content-media-upload">
          <label for="uploadmedia">
            <strong>Choisi un media à partager</strong>
          </label>
          <input
            @change="onFileChange"
            class="publication_content-media"
            type="file"
            name="uploadmedia"
            accept="image/*"
            capture
          />
        </div>
        <div class="publication_content-text-content">
          <label for="textContent">
            <strong>Commentaire</strong>
          </label>
          <textarea
            v-model="textContent"
            class="publication_content-text"
            type="text"
            rows="3"
            placeholder="Enter votre commentaire"
            name="textContent"
          />
        </div>
      </div>
      <button @click.prevent="createPost()" type="submit">partager</button>
    </form>
  </div>
  <!--Publication_formular_end-->
</template>


<script>
import axios from 'axios'

export default {
    name: 'publication',
    data: function (){
        return{
            mode:'publication',
            uploadmedia: null,
            textContent:''
        }
    },
    methods:{
        onFileChange(event) {
           let file = event.target.files[0];
           this.uploadmedia = file;
        },

        createPost(){
          const uploadmediaData = new FormData();
          uploadmediaData.append('uploadmedia', this.file)
          
          const publicationData = {
            uploadmedia: uploadmediaData,
            textContent: this.textContent
          }
          axios.post('http://localhost:5000/api/publication/post', publicationData)
            .then(res =>{
              console.log(res);
          })

        }
    }
}
</script>

   const publicationData = {
            uploadmedia: '',
            textContent: this.textContent
          };

          